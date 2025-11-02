import silabas from 'silabas';

/**
 * Splits a word into syllables using a local library. This is an async operation.
 * @param word The word to split.
 * @returns A promise that resolves to an array of strings, where each string is a syllable.
 */
export const getSyllablesLocally = async (word: string): Promise<string[]> => {
    try {
        // The library is async, so we need to await the result.
        const syllables = await silabas(word);
        
        // The library should return an array of strings. If it's valid, return it.
        if (Array.isArray(syllables)) {
             return syllables;
        }

        // Fallback for unexpected return types from the library.
        console.warn(`Syllable library returned an unexpected structure for "${word}":`, syllables);
        return []; // Return an empty array on failure.

    } catch (error) {
        console.error(`Could not process syllables for "${word}":`, error);
        // Return an empty array on error to prevent crashes.
        return [];
    }
};