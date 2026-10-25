# SílabaLink

Juego de palabras encadenadas por sílabas, en español. Cada palabra tiene que empezar por la última sílaba de la anterior: *ca**sa*** → ***sa**po* → ***po**llo*… Compites contra el reloj para conseguir la cadena más larga.

## Cómo se juega

1. Introduce tu nombre.
2. El juego te da una palabra de inicio.
3. Escribe una palabra que empiece por su última sílaba antes de que se acabe el tiempo.
4. Cada acierto suma puntos y alarga tu racha. Desbloquea logros y compite en la tabla de récords.

## Dónde entra la IA

- **En el producto:** la palabra de inicio de cada partida la genera **Gemini 2.5 Flash** (Google), para que cada partida empiece distinta.
- **En la construcción:** la app la he desarrollado apoyándome en asistentes de IA (Google AI Studio y Gemini), desde el diseño de la lógica del juego hasta la interfaz.

La validación de palabras y la división en sílabas se hacen en local, con un diccionario en español y la librería `silabas`, para que el juego responda al instante y no dependa de la API en cada jugada.

## Tecnología

| Capa | Herramienta |
|---|---|
| Interfaz | React 18 + TypeScript |
| Build | Vite |
| Estilos | Tailwind CSS |
| IA | Google Gemini (`@google/genai`) |
| Sílabas | `silabas` + diccionario español propio |
| Despliegue | Netlify |
| Extras | PWA (instalable en el móvil), logros y récords guardados en el navegador |

## Probarlo en local

Necesitas Node.js y una clave de API de Gemini (gratuita en Google AI Studio).

```bash
npm install
cp .env.example .env   # y pon tu clave en API_KEY
npm run dev
```

## Estado

Proyecto personal y prototipo funcional. Próximos pasos: mover la llamada a Gemini a una función de servidor para no exponer la clave en el navegador, y añadir modo multijugador.

---

Creado por **William Segovia** · [LinkedIn](https://www.linkedin.com/in/william-segovia)
