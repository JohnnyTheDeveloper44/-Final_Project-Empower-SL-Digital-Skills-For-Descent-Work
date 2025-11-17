import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, X, Languages, Navigation, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { speechService } from '@/utils/speechService';
import { translationService } from '@/services/translationService';

export function VoiceTranslator() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [englishText, setEnglishText] = useState('');
  const [krioText, setKrioText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [actionSuggestion, setActionSuggestion] = useState<{ label: string; path: string } | null>(null);
  const { t } = useLanguage();

  const getSmartResponse = (text: string): { response: string; action?: { label: string; path: string } } => {
    const lower = text.toLowerCase();
    
    // Navigation queries (English + Krio)
    if (lower.match(/\b(where|wea|wia|find|navigate|go to|go|show me|show|take me|tek mi|carry me)\b/)) {
      if (lower.match(/\b(course|courses|learn|class|training|kos|kosdem)\b/)) {
        setActionSuggestion({ label: 'View Courses', path: '/courses' });
        return {
          response: "Di kɔsdem de na 'Courses' sɛkshɔn! Wi gɛt Web Development, Data Science, Mobile Development, ɛn mɔ. Yu go lan pipul we sabi di wok, ɛn yu go gɛt sɛtifiket.",
          action: { label: 'View Courses', path: '/courses' }
        };
      }
      if (lower.match(/\b(job|jobs|career|work|employment|wok|wok dem)\b/)) {
        setActionSuggestion({ label: 'Browse Jobs', path: '/jobs' });
        return {
          response: "Chɛk di 'Jobs' sɛkshɔn fɔ si tɛk ɔpɔchuniti dɛm na Salone! Wi gɛt pɔzishɔn fɔ web dɛvelopa, data sayɛntist, ɛn mɔ. Salari de frɔm Le 3M to Le 15M pɛ mɔnt!",
          action: { label: 'Browse Jobs', path: '/jobs' }
        };
      }
      if (lower.match(/\b(dashboard|progress|achievement)\b/)) {
        setActionSuggestion({ label: 'Go to Dashboard', path: '/dashboard' });
        return {
          response: "Yu Dashboard de sho yu prɔgrɛs, XP pɔynt dɛm, baj dɛm we yu dɔn wiyn, ɛn yu sɛtifiket dɛm. Na de yu go si ɔl wetin yu dɔn achiv!",
          action: { label: 'Go to Dashboard', path: '/dashboard' }
        };
      }
    }

    // Help and guidance
    if (lower.match(/\b(help|assist|guide|teach me|show me how)\b/)) {
      if (lower.match(/\b(start|begin|beginner|new)\b/)) {
        return {
          response: "Fɔ bigin, a go rɛkɔmɛnd Web Development Fundamentals! Na di bɛst we fɔ ɛnta insay tɛknɔlɔji wok. Yu go lan HTML, CSS, ɛn JavaScript - di tin dɛm we ɔl wɛbsayt nid.",
          action: { label: 'Start Learning', path: '/courses' }
        };
      }
      return {
        response: "A de ya fɔ ɛp yu! Yu fit aks mi bɔt ɛni kɔs, kɛria advays, ɔ tɛknɔlɔji tin we yu want lan. Jɔs tɔk, a go ansa!"
      };
    }

    // Technical questions
    if (lower.match(/\b(what is|explain|how does|tell me about)\b/)) {
      if (lower.match(/\b(html|website|webpage)\b/)) {
        return {
          response: "HTML na di bak bɔn fɔ ɔl wɛbsayt! Na di tin we de kreɛt di strɔkchɔ. E bi layk aw yu de bil os - yu nid fɔ put di fɛm fɔs, bifo yu de pɛnt am. HTML na dat fɛm!"
        };
      }
      if (lower.match(/\b(css|design|style)\b/)) {
        return {
          response: "CSS na di tin we de mek wɛbsayt fayn! E de gi kɔla, layɔt, ɛn di ol fayn fayn tin dɛm. Layk aw yu de dɛkorɛt yu os afta yu dɔn bil am. CSS mek am luk bɔku!"
        };
      }
      if (lower.match(/\b(javascript|programming|coding|kode|kodin)\b/)) {
        return {
          response: "JavaScript na di programming languaj we de mek wɛbsayt de wok! E de mek tin dɛm muv, ansa we pipul klik, ɛn chenj widat yu nɔ rilo di pej. Na pawaful pawaful tin!"
        };
      }
    }

    // Career advice
    if (lower.match(/\b(salary|earn|money|pay|income)\b/)) {
      return {
        response: "Tɛk wok na Salone de pe fayn! Web dɛvelopa de mek Le 5M-12M pɛ mɔnt, Data sayɛntist de mek Le 7M-15M, ɛn UI/UX dizayna de mek Le 4M-10M. Di mɔ sabi yu gɛt, di mɔ mɔni yu go mek!"
      };
    }

    // Greeting
    if (lower.match(/^(hi|hello|hey|kushe|kushɛ|greetings)/)) {
      return {
        response: "Kushɛ! Wɛlkɔm to LearnHub SL! Mi nem na Voice Assistant, ɛn a de ya fɔ ɛp yu. Yu fit aks mi bɔt kɔsdem, wok ɔpɔchuniti, ɔ ɛnitin we yu want lan. Wetin yu want sabi?"
      };
    }

    // Default: Try translation
    const translated = translationService.translateToKrio(text);
    if (translated !== text) {
      return {
        response: translated
      };
    }

    return {
      response: "A yɛri yu, bɔt a nɔ ɔndastand fayn fayn. Yu fit aks mi bɔt kɔsdem, wok dɛm, ɔ aw fɔ lan tɛknɔlɔji. Tray agen wit simpul wɔd dɛm!"
    };
  };

  const handleStartListening = async () => {
    setError(null);
    setEnglishText('');
    setKrioText('');
    setActionSuggestion(null);
    
    try {
      // Request microphone permission explicitly
      const granted = await speechService.requestMicrophonePermission();
      if (!granted) {
        setError('Microphone access denied. Please allow microphone permissions in your browser settings.');
        setIsListening(false);
        return;
      }
      
      // Ensure speech service is ready
      await speechService.ensureReady();
      
      setIsListening(true);
      speechService.startListening(
        (result) => {
          if (result.isFinal) {
            setEnglishText(result.transcript);
            
            // Get smart response
            const { response, action } = getSmartResponse(result.transcript);
            setKrioText(response);
            
            // Auto-navigate if action is provided
            if (action) {
              setTimeout(() => {
                navigate(action.path);
                setIsOpen(false);
              }, 300); // Quick navigation
            }
          }
        },
        (err) => {
          console.error('Speech recognition error:', err);
          setError(typeof err === 'string' ? err : 'Speech recognition error. Please try again.');
          setIsListening(false);
        }
      );
    } catch (err) {
      console.error('Microphone error:', err);
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone permissions in your browser settings.');
      } else if (err instanceof Error && err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else {
        setError('Voice recognition not supported in this browser. Please try Chrome, Edge, or Safari.');
      }
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleSpeak = () => {
    if (krioText) {
      speechService.speakText(krioText, 'krio');
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-30 bg-gradient-to-br from-accent via-accent/90 to-secondary hover:shadow-accent/50"
          size="icon"
        >
          <div className="relative">
            <Languages className="h-7 w-7" />
            <Mic className="h-4 w-4 absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5" />
          </div>
        </Button>
      )}

      {/* Voice Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[360px] md:w-[420px] max-h-[70vh] shadow-2xl z-30 animate-scale-in border-accent/20 bg-background/98 backdrop-blur-xl">
          <CardHeader className="bg-gradient-to-r from-accent via-accent/95 to-secondary text-accent-foreground border-b-2 border-accent/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">Voice Translator</CardTitle>
                  <p className="text-xs text-accent-foreground/80 mt-0.5">English ⇄ Krio + Navigation</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 hover:bg-background/20 rounded-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 flex items-start gap-2">
                <span className="font-medium">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={isListening ? handleStopListening : handleStartListening}
                size="lg"
                className={`rounded-full h-24 w-24 shadow-lg transition-all ${
                  isListening 
                    ? 'animate-pulse bg-destructive hover:bg-destructive/90 shadow-destructive/50 scale-110' 
                    : 'bg-accent hover:bg-accent/90 shadow-accent/30 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-10 w-10" />
                ) : (
                  <Mic className="h-10 w-10" />
                )}
              </Button>

              <div className="text-center">
                <div className={`text-sm font-medium ${isListening ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {isListening ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="h-2 w-2 bg-destructive rounded-full animate-ping" />
                      Listening... Speak now
                    </span>
                  ) : (
                    'Tap the microphone to start'
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ask questions, get translations, find courses
                </div>
              </div>
            </div>

            {englishText && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-muted/80 to-muted/50 p-4 rounded-xl border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      You said
                    </div>
                  </div>
                  <div className="text-sm font-medium leading-relaxed">{englishText}</div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-accent/20 rounded-full p-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-xl border border-accent/30 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                      <div className="text-xs font-semibold text-accent uppercase tracking-wide">
                        {actionSuggestion ? 'Smart Response' : 'Krio Translation'}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSpeak}
                      className="h-7 w-7 p-0 hover:bg-accent/20"
                      title="Listen"
                    >
                      <Volume2 className="h-4 w-4 text-accent" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium leading-relaxed mb-3">{krioText}</div>
                  
                  {actionSuggestion && (
                    <div className="flex items-center gap-2 text-xs text-accent font-medium">
                      <Navigation className="h-3 w-3 animate-pulse" />
                      Navigating to {actionSuggestion.label}...
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-muted/30 p-3 rounded-lg border border-border/30">
              <div className="text-xs text-muted-foreground text-center leading-relaxed">
                <strong className="text-foreground">Try asking:</strong><br />
                "Where can I find courses?" • "Show me tech jobs" • "How do I start learning?"
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
