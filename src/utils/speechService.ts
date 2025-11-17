import type { SpeechRecognitionResult } from '@/types/translation.types';

// Extend window type for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  // Fallback recording for unsupported browsers
  private mediaRecorder: MediaRecorder | null = null;
  private mediaStream: MediaStream | null = null;
  private recordedChunks: BlobPart[] = [];
  private fallbackOnResult?: (result: SpeechRecognitionResult) => void;
  private fallbackOnError?: (error: string) => void;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initRecognition();
  }

  private initRecognition() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        console.log('Speech recognition initialized successfully');
      } else {
        console.warn('Speech Recognition API not available');
      }
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
    }
  }

  /**
   * Reinitialize recognition if needed
   */
  private ensureRecognitionReady() {
    if (!this.recognition) {
      this.initRecognition();
    }
  }

  /**
   * Check if browser supports speech recognition
   */
  isSpeechRecognitionSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Check if browser supports speech synthesis
   */
  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  /**
   * Start listening for speech input
   */
  startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void
  ): void {
    // Ensure recognition is initialized
    this.ensureRecognitionReady();
    
    if (!this.recognition) {
      // Fallback: record audio and transcribe via server
      this.startFallbackRecording(onResult, onError);
      return;
    }

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      const confidence = event.results[last][0].confidence;
      const isFinal = event.results[last].isFinal;

      onResult({
        transcript,
        confidence,
        isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      const code = event?.error as string;
      let message = 'Speech recognition error';
      switch (code) {
        case 'not-allowed':
          message = 'Microphone access denied. Please allow microphone permissions in your browser.';
          break;
        case 'audio-capture':
          message = 'No microphone detected. Please connect a microphone and try again.';
          break;
        case 'no-speech':
          message = 'No speech detected. Please try speaking again.';
          break;
        case 'aborted':
          message = 'Listening was interrupted. Please try again.';
          break;
        case 'network':
          message = 'Network error during recognition. Check your connection and try again.';
          break;
      }
      onError(message);
    };
    this.recognition.onend = () => {
      // Recognition ended
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('Failed to start speech recognition');
    }
  }

  /**
   * Stop listening for speech input
   */
  stopListening(): void {
    // Stop native recognition if present
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.log('Recognition already stopped');
      }
    }
    // Stop fallback recorder if used
    this.stopFallback();
  }

  /**
   * Ensure recognition is stopped and ready
   */
  async ensureReady(): Promise<void> {
    this.stopListening();
    // Small delay to ensure cleanup
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Fallback recording using MediaRecorder + server transcription
  private async startFallbackRecording(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void
  ) {
    this.fallbackOnResult = onResult;
    this.fallbackOnError = onError;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType =
        MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' :
        (MediaRecorder as any).isTypeSupported?.('audio/ogg') ? 'audio/ogg' : '';

      this.mediaRecorder = new MediaRecorder(this.mediaStream, mimeType ? { mimeType } : undefined);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
      };

      this.mediaRecorder.onstop = async () => {
        try {
          const blob = new Blob(this.recordedChunks, { type: mimeType || 'audio/webm' });
          const text = await this.transcribeBlob(blob);
          this.fallbackOnResult?.({ transcript: text || '', confidence: 1, isFinal: true });
        } catch (err) {
          console.error('Transcription error:', err);
          this.fallbackOnError?.('Transcription failed. Please try again.');
        } finally {
          this.mediaStream?.getTracks().forEach(t => t.stop());
          this.mediaStream = null;
          this.mediaRecorder = null;
          this.recordedChunks = [];
        }
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Fallback recording error:', err);
      onError('Unable to access microphone. Please check permissions.');
    }
  }

  private async transcribeBlob(blob: Blob): Promise<string> {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = (reader.result as string) || '';
        resolve(res.split(',')[1] || '');
      };
      reader.onerror = () => reject(new Error('Failed to read audio blob'));
      reader.readAsDataURL(blob);
    });

    const endpoint = (import.meta as any).env?.VITE_VOICE_TO_TEXT_URL || '/functions/v1/voice-to-text';
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio: base64 }),
    });

    if (!resp.ok) {
      throw new Error(`Transcription request failed: ${await resp.text()}`);
    }

    const json = await resp.json();
    return json.text || json.transcript || '';
  }

  private stopFallback() {
    try {
      if (this.mediaRecorder && (this.mediaRecorder.state as any) !== 'inactive') {
        this.mediaRecorder.stop();
      }
    } catch {}
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
  }

  /**
   * Convert text to speech
   */
  speakText(
    text: string,
    language: 'en' | 'krio' = 'en',
    rate: number = 1.0,
    onEnd?: () => void
  ): void {
    if (!this.isSpeechSynthesisSupported()) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language (Krio uses English voice with adjustments)
    utterance.lang = language === 'krio' ? 'en-GB' : 'en-US';
    
    // Adjust rate for Krio (slightly slower for better pronunciation)
    utterance.rate = language === 'krio' ? rate * 0.85 : rate;
    
    // Set pitch slightly higher for Krio to match natural accent
    utterance.pitch = language === 'krio' ? 1.1 : 1.0;
    
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    this.synthesis.speak(utterance);
  }

  /**
   * Stop any ongoing speech
   */
  stopSpeaking(): void {
    this.synthesis.cancel();
  }

  /**
   * Pause ongoing speech
   */
  pauseSpeaking(): void {
    this.synthesis.pause();
  }

  /**
   * Resume paused speech
   */
  resumeSpeaking(): void {
    this.synthesis.resume();
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  /**
   * Get available voices
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  /**
   * Request microphone permission
   */
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately, we just needed permission
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  }
}

// Export singleton instance
export const speechService = new SpeechService();

// Export convenience functions for direct use
export const startListening = (onTranscript: (transcript: string) => void) => {
  speechService.startListening(
    (result) => {
      if (result.isFinal) {
        onTranscript(result.transcript);
      }
    },
    (error) => console.error('Speech recognition error:', error)
  );
};

export const stopListening = () => speechService.stopListening();
export const speakText = (text: string, language: 'en' | 'krio' = 'en') => 
  speechService.speakText(text, language);
export const stopSpeaking = () => speechService.stopSpeaking();

