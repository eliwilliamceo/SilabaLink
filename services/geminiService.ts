import { GoogleGenAI } from '@google/genai';

const model = 'gemini-2.5-flash';

/**
 * Crea y devuelve una nueva instancia del cliente de GoogleGenAI.
 * Siempre crea una nueva instancia para asegurar que se usa la clave API más reciente
 * seleccionada en el entorno de ejecución.
 * Asume que process.env.API_KEY está disponible en el entorno.
 */
const getAiClient = (): GoogleGenAI => {
    // The guide recommends creating a new instance right before an API call
    // to ensure it uses the most up-to-date API key provided by the execution environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai;
};


// --- FUNCIONES DE LA API DE GEMINI ---

/**
 * Obtiene una palabra inicial para el juego usando la API de Gemini.
 * @returns Una promesa que resuelve a una palabra común en español de dos sílabas.
 */
export const getStartingWord = async (): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `Dame una palabra común en español de dos sílabas que sea fácil para empezar un juego de palabras. Responde únicamente con la palabra en minúsculas.`;
    
    const response = await aiClient.models.generateContent({ model, contents: prompt });
    const startingWord = (response.text ?? '').trim();
    
    // Validación básica para asegurar que recibimos una sola palabra.
    if (startingWord && !startingWord.includes(' ')) {
        return startingWord;
    }

    throw new Error("La API devolvió una palabra inicial con formato incorrecto.");
};