
import React, { useState, useRef, useEffect } from 'react';

const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const SpinnerIcon = () => <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>;

interface WordInputProps {
    lastSyllable: string;
    onSubmit: (word: string) => void;
    isLoading: boolean;
    errorMessage: string | null;
}

const WordInput: React.FC<WordInputProps> = ({ lastSyllable, onSubmit, isLoading, errorMessage }) => {
    const [word, setWord] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (word.trim() && !isLoading) {
            onSubmit(word);
            setWord('');
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-2">
                <p className="text-slate-400">
                    Empieza con: <span className="font-bold text-xl text-cyan-300 tracking-wider">{lastSyllable}</span>
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Escribe tu palabra..."
                    disabled={isLoading}
                    className="flex-grow bg-slate-700 text-white placeholder-slate-500 border-2 border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
                <button
                    type="submit"
                    disabled={isLoading || !word.trim()}
                    className="bg-cyan-500 text-slate-900 font-bold p-3 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:scale-100 disabled:cursor-not-allowed"
                >
                    {isLoading ? <SpinnerIcon /> : <SendIcon />}
                </button>
            </form>
             {errorMessage && (
                <p className="text-red-400 text-center mt-2 font-semibold">{errorMessage}</p>
            )}
        </div>
    );
};

export default WordInput;
