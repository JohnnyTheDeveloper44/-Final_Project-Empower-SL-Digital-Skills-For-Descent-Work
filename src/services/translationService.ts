import translationsData from '@/data/krioTranslations.json';
import type { TranslationData } from '@/types/translation.types';

const translations = translationsData as TranslationData;

class TranslationService {
  private dictionary: Map<string, string>;

  constructor() {
    this.dictionary = new Map();
    this.loadDictionary();
  }

  private loadDictionary() {
    // Flatten all translation categories into a single dictionary
    Object.values(translations).forEach((category) => {
      Object.entries(category).forEach(([key, value]) => {
        this.dictionary.set(key.toLowerCase(), value as string);
      });
    });
  }

  /**
   * Translate text from English to Krio
   * Uses dictionary lookup with fuzzy matching fallback
   */
  translateToKrio(text: string): string {
    if (!text) return '';

    const lowerText = text.toLowerCase().trim();

    // Direct dictionary lookup
    if (this.dictionary.has(lowerText)) {
      return this.dictionary.get(lowerText)!;
    }

    // Try to find partial matches for phrases
    const words = lowerText.split(' ');
    if (words.length > 1) {
      const translatedWords = words.map((word) => {
        return this.dictionary.get(word) || word;
      });
      return translatedWords.join(' ');
    }

    // If no translation found, return original with indicator
    return text;
  }

  /**
   * Translate text from Krio to English
   */
  translateToEnglish(text: string): string {
    if (!text) return '';

    const lowerText = text.toLowerCase().trim();

    // Reverse lookup in dictionary
    for (const [key, value] of this.dictionary.entries()) {
      if (value.toLowerCase() === lowerText) {
        return key;
      }
    }

    return text;
  }

  /**
   * Get all translations for a specific category
   */
  getCategoryTranslations(category: keyof TranslationData): Record<string, string> {
    return translations[category] || {};
  }

  /**
   * Search for translations containing a keyword
   */
  searchTranslations(keyword: string): Array<{ english: string; krio: string }> {
    const results: Array<{ english: string; krio: string }> = [];
    const lowerKeyword = keyword.toLowerCase();

    for (const [english, krio] of this.dictionary.entries()) {
      if (english.includes(lowerKeyword) || krio.toLowerCase().includes(lowerKeyword)) {
        results.push({ english, krio });
      }
    }

    return results;
  }

  /**
   * Check if a translation exists for the given text
   */
  hasTranslation(text: string): boolean {
    return this.dictionary.has(text.toLowerCase().trim());
  }

  /**
   * Get translation suggestions based on context
   */
  getSuggestions(context: string): Array<{ english: string; krio: string }> {
    const contextKey = context.toLowerCase();
    const suggestions: Array<{ english: string; krio: string }> = [];

    // Get relevant category based on context
    let category: keyof TranslationData = 'common';
    if (contextKey.includes('tech') || contextKey.includes('code')) {
      category = 'tech';
    } else if (contextKey.includes('ui') || contextKey.includes('button')) {
      category = 'ui';
    } else if (contextKey.includes('salone') || contextKey.includes('sierra leone')) {
      category = 'sierraleone';
    }

    const categoryData = translations[category];
    Object.entries(categoryData).forEach(([english, krio]) => {
      suggestions.push({ english, krio });
    });

    return suggestions.slice(0, 10); // Return top 10 suggestions
  }
}

// Export singleton instance
export const translationService = new TranslationService();

// For future backend integration (currently unused)
export async function translateWithAI(text: string, targetLang: 'en' | 'krio'): Promise<string> {
  // TODO: When ready for backend, implement Lovable AI integration here
  // const response = await fetch(`${SUPABASE_URL}/functions/v1/translate-krio`, {
  //   method: 'POST',
  //   body: JSON.stringify({ text, targetLang })
  // });
  // return response.json();
  
  // For now, use dictionary-based translation
  return targetLang === 'krio' 
    ? translationService.translateToKrio(text)
    : translationService.translateToEnglish(text);
}
