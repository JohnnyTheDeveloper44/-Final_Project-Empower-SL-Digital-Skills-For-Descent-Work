export type Language = 'en' | 'krio';

export interface TranslationData {
  common: Record<string, string>;
  ui: Record<string, string>;
  messages: Record<string, string>;
  tech: Record<string, string>;
  sierraleone: Record<string, string>;
}

export interface Translation {
  id: string;
  englishText: string;
  krioText: string;
  timestamp: Date;
  context?: string;
}

export interface VoiceSettings {
  enabled: boolean;
  autoTranslate: boolean;
  speechRate: number;
  voiceLanguage: Language;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface TranslationState {
  isListening: boolean;
  isTranslating: boolean;
  isSpeaking: boolean;
  englishText: string;
  krioText: string;
  error: string | null;
}
