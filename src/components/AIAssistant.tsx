import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Loader2, BookOpen, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { translationService } from '@/services/translationService';
import coursesData from '@/data/courses.json';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: { type: 'navigate'; path: string; label: string };
}

export function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your intelligent learning assistant. I can help you find courses, explore careers, answer tech questions, and translate to Krio. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const getResponse = (msg: string): { content: string; action?: { type: 'navigate'; path: string; label: string }; autoNavigate?: { path: string; delay: number } } => {
    const lower = msg.toLowerCase();
    
    // Navigation queries with auto-navigate
    if (lower.match(/\b(show|find|see|view|where|navigate|go to|take me)\b/)) {
      if (lower.match(/\b(course|courses|learn|class|training)\b/)) {
        return {
          content: 'Great! Let me take you to our courses page where you can explore all available learning opportunities.',
          autoNavigate: { path: '/courses', delay: 300 }
        };
      }
      if (lower.match(/\b(job|jobs|career|work|employment)\b/)) {
        return {
          content: 'Perfect! I\'ll navigate you to our jobs page where you can find exciting tech opportunities in Sierra Leone.',
          autoNavigate: { path: '/jobs', delay: 300 }
        };
      }
      if (lower.match(/\b(dashboard|progress|achievement)\b/)) {
        return {
          content: 'Taking you to your dashboard where you can see your progress and achievements!',
          autoNavigate: { path: '/dashboard', delay: 300 }
        };
      }
      if (lower.match(/\b(about|who|information)\b/)) {
        return {
          content: 'Let me show you more about LearnHub Pro!',
          autoNavigate: { path: '/about', delay: 300 }
        };
      }
      if (lower.match(/\b(contact|reach|email|message)\b/)) {
        return {
          content: 'I\'ll take you to our contact page!',
          autoNavigate: { path: '/contact', delay: 300 }
        };
      }
    }
    
    if (lower.match(/\b(job|career|work|employment)\b/)) {
      return { content: "Tech opportunities in Sierra Leone are growing! Salaries range from Le 3M-15M/month. We have positions in web development, data science, design, and more.", action: { type: 'navigate', path: '/jobs', label: 'Browse Jobs' }};
    }
    if (lower.match(/\b(course|learn|study|training)\b/)) {
      if (lower.match(/\b(beginner|start|new)\b/)) return { content: "For beginners, start with Web Development! You'll learn HTML, CSS, JavaScript, and React. Perfect entry into tech.", action: { type: 'navigate', path: '/courses', label: 'View Courses' }};
      return { content: "We offer 6 courses: Web Development, Data Science, Mobile Dev, UI/UX Design, Business, and Digital Marketing. All include certification!", action: { type: 'navigate', path: '/courses', label: 'Explore Courses' }};
    }
    if (lower.match(/\b(html|css|javascript|react|python)\b/)) {
      if (lower.includes('html')) return { content: "HTML structures websites using tags like <div>, <p>, <h1>. It's the foundation of all web pages!", action: { type: 'navigate', path: '/courses', label: 'Learn HTML' }};
      if (lower.includes('css')) return { content: "CSS styles websites with colors, layouts, and effects. In Krio: CSS na di tin we de mek yu website fine!", action: { type: 'navigate', path: '/courses', label: 'Learn CSS' }};
      if (lower.includes('javascript')) return { content: "JavaScript adds interactivity and dynamic features. Essential for modern development!", action: { type: 'navigate', path: '/courses', label: 'Learn JavaScript' }};
    }
    if (lower.match(/^(hi|hello|hey|kushe|kushɛ)/)) return { content: "Kushɛ! I'm here to guide your learning. Ask about courses, careers, or tech!" };
    
    return { content: "I can help with:\n• Course recommendations\n• Career guidance\n• Technical questions\n• Krio translations\n\nTry asking: 'What course for beginners?' or 'Show me jobs'" };
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages(prev => [...prev, { role: 'assistant', content: response.content, action: response.action }]);
      setIsTyping(false);
      
      // Auto-navigate if specified
      if (response.autoNavigate) {
        setTimeout(() => {
          navigate(response.autoNavigate!.path);
          setIsOpen(false);
        }, response.autoNavigate.delay);
      }
    }, 700);
  };

  return (
    <>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all z-30 bg-gradient-to-br from-primary to-accent" size="icon">
          <div className="relative">
            <MessageCircle className="h-7 w-7" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[360px] h-[520px] md:w-[420px] md:h-[580px] max-h-[80vh] shadow-2xl z-30 flex flex-col bg-background/98 backdrop-blur-xl border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-b-2 border-primary/30">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-background/20 rounded-lg"><Sparkles className="h-5 w-5" /></div>
                <div><CardTitle className="text-lg font-bold">AI Assistant</CardTitle><p className="text-xs opacity-80">LearnHub SL</p></div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-background/20"><X className="h-5 w-5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 ${m.role === 'user' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted/60 border shadow-sm'}`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                    {m.action && <Button onClick={() => { navigate(m.action!.path); setIsOpen(false); }} size="sm" className="mt-3 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">{m.action.label} →</Button>}
                  </div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start"><div className="bg-muted/60 rounded-2xl p-3.5 border flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin text-primary" /><span className="text-sm text-muted-foreground">Thinking...</span></div></div>}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Ask anything about courses, careers, tech..." className="border-primary/20" disabled={isTyping} />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon" className="shadow-md"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
