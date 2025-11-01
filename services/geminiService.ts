import { GoogleGenAI, Type } from '@google/genai';

const model = 'gemini-2.5-flash';

/**
 * Obtiene de forma segura la clave API de Gemini desde las variables de entorno.
 * Soporta el método de Vite (`import.meta.env`) para despliegues en Vercel,
 * y el método estándar de AI Studio (`process.env`).
 * @returns La clave API o `undefined` si no se encuentra.
 */
const getApiKey = (): string | undefined => {
    // Entorno Vite (usado en Vercel)
    if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_GEMINI_API_KEY) {
        return import.meta.env.VITE_GEMINI_API_KEY;
    }
    // Entorno AI Studio o similar que define process.env
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
    }
    return undefined;
};


/**
 * Crea y devuelve una nueva instancia del cliente de GoogleGenAI.
 * Siempre crea una nueva instancia para asegurar que se usa la clave API más reciente
 * disponible en el entorno de ejecución.
 */
const getAiClient = (): GoogleGenAI => {
    const apiKey = getApiKey();

    if (!apiKey) {
         throw new Error("La clave API de Gemini no está configurada. Asegúrate de que VITE_GEMINI_API_KEY (para Vercel) o API_KEY (para ejecución local) estén disponibles en las variables de entorno.");
    }

    try {
        // Se crea una nueva instancia en cada llamada para usar la clave más actualizada.
        const ai = new GoogleGenAI({ apiKey: apiKey });
        return ai;
    } catch (error) {
        console.error("Error fatal al inicializar el cliente de GoogleGenAI:", error);
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
