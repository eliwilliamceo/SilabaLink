import silabas from 'silaba.js';

/**
 * Splits a word into syllables using a local library.
 * @param word The word to split.
 * @returns An array of strings, where each string is a syllable.
 */
export const getSyllablesLocally = (word: string): string[] => {
    try {
        // The library returns an object with syllable information.
        // We just need the syllable strings.
        const result = silabas(word);
        if (result && result.syllables) {
             return result.syllables.map(s => s.syllable);
        }
        // Fallback for words the library might not handle
        return [word];
    } catch (error) {
        console.error(`Could not process syllables for "${word}":`, error);
        // Return the word as a single syllable on error to prevent crashes.
        return [word];
    }
};