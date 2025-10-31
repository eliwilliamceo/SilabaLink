import { GoogleGenAI, Type } from '@google/genai';

const model = 'gemini-2.5-flash';

/**
 * Crea y devuelve una nueva instancia del cliente de GoogleGenAI.
 * Siempre crea una nueva instancia para asegurar que se usa la clave API más reciente
 * seleccionada en el entorno de ejecución.
 * Asume que process.env.API_KEY está disponible en el entorno.
 */
const getAiClient = (): GoogleGenAI => {
    try {
        // The guide recommends creating a new instance right before an API call
        // to ensure it uses the most up-to-date API key.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return ai;
    } catch (error) {
        console.error("Fatal Error initializing GoogleGenAI client:", error);
        throw new Error("No se pudo inicializar el cliente de IA. Comprueba la configuración de la clave API.");
    }
};


// --- FUNCIONES DE LA API DE GEMINI ---

/**
 * Obtiene las sílabas de una palabra usando la API de Gemini.
 * @param word La palabra a dividir en sílabas.
 * @returns Una promesa que resuelve a un array de strings (sílabas).
 */
export const getSyllables = async (word: string): Promise<string[]> => {
    const aiClient = getAiClient();
    const prompt = `Divide la palabra "${word}" en sílabas. Responde únicamente con un array JSON de las sílabas en orden. Por ejemplo, para "castillo", tu respuesta debe ser exactamente: ["cas", "ti", "llo"]`;
    
    const response = await aiClient.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } } }
    });

    const jsonString = response.text.trim();
    const syllables = JSON.parse(jsonString);

    if (Array.isArray(syllables) && syllables.every(s => typeof s === 'string')) {
        return syllables;
    }

    // Si la respuesta no es como se esperaba, lanza un error.
    throw new Error("La API devolvió un formato de sílabas inesperado.");
};

/**
 * Valida si una palabra existe en español usando la API de Gemini.
 * @param word La palabra a validar.
 * @returns Una promesa que resuelve a un booleano.
 */
export const validateWord = async (word: string): Promise<boolean> => {
    const aiClient = getAiClient();
    const prompt = `La palabra introducida es "${word}". ¿Es una palabra válida en español, ignorando la posible falta de tildes? Responde únicamente con "true" o "false".`;
    
    const response = await aiClient.models.generateContent({ model, contents: prompt });
    const text = response.text.trim().toLowerCase();

    if (text !== 'true' && text !== 'false') {
        throw new Error("Respuesta de validación inesperada de la API.");
    }

    return text === 'true';
};

/**
 * Obtiene una palabra inicial para el juego usando la API de Gemini.
 * @returns Una promesa que resuelve a una palabra común en español de dos sílabas.
 */
export const getStartingWord = async (): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `Dame una palabra común en español de dos sílabas que sea fácil para empezar un juego de palabras. Responde únicamente con la palabra en minúsculas.`;
    
    const response = await aiClient.models.generateContent({ model, contents: prompt });
    const startingWord = response.text.trim();
    
    // Validación básica para asegurar que recibimos una sola palabra.
    if (startingWord && !startingWord.includes(' ')) {
        return startingWord;
    }

    throw new Error("La API devolvió una palabra inicial con formato incorrecto.");
};