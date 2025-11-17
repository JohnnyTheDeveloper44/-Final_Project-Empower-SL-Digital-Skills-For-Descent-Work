import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { recordKrioUsage } from '@/utils/gamification';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const handleToggle = () => {
    toggleLanguage();
    if (language === 'en') {
      recordKrioUsage();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2"
    >
      <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇸🇱'}</span>
      <span className="text-xs font-medium">
        {language === 'en' ? 'English' : 'Krio'}
      </span>
    </Button>
  );
}
