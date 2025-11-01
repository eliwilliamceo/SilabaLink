class CWordListService {
    private wordList: Set<string> = new Set();
    private isLoaded = false;
    private loadPromise: Promise<void> | null = null;

    /**
     * Carga la lista de palabras desde el archivo JSON.
     * Utiliza un singleton `loadPromise` para evitar múltiples peticiones de red si se llama varias veces.
     */
    public async load(): Promise<void> {
        if (this.isLoaded) {
            return;
        }
        if (this.loadPromise) {
            return this.loadPromise;
        }

        this.loadPromise = (async () => {
            try {
                const response = await fetch('/es_wordlist.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch wordlist: ${response.statusText}`);
                }
                const words: string[] = await response.json();
                this.wordList = new Set(words.map(w => w.toLowerCase()));
                this.isLoaded = true;
                console.log('Word list loaded successfully.');
            } catch (error) {
                console.error("Failed to load or parse word list:", error);
                // Reset promise on failure to allow retries
                this.loadPromise = null;
                // Propagate the error
                throw error;
            }
        })();

        return this.loadPromise;
    }

    /**
     * Comprueba si una palabra es válida comparándola con la lista local.
     * @param word La palabra a validar.
     * @returns `true` si la palabra está en la lista, `false` en caso contrario.
     */
    public isValidWord(word: string): boolean {
        if (!this.isLoaded) {
            console.warn('Word list not loaded yet, validation might fail.');
            return false;
        }
        return this.wordList.has(word.toLowerCase());
    }

    /**
     * Obtiene una palabra aleatoria de la lista para iniciar el juego.
     * @returns Una palabra aleatoria o una palabra por defecto si la lista no está cargada.
     */
    public getRandomWord(): string {
        if (!this.isLoaded || this.wordList.size === 0) {
            console.warn('Word list not loaded, returning default word.');
            return 'palabra';
        }
        const wordsArray = Array.from(this.wordList);
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[randomIndex];
    }
}

// Export a singleton instance of the service
export const WordListService = new CWordListService();
