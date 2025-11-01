
import React, { useState, useRef, useEffect } from 'react';

const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const SpinnerIcon = () => <div className="spinner"></div>;

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
            <div className="syllable-prompt">
                <p>
                    Empieza con: <span className="syllable-highlight">{lastSyllable}</span>
                </p>
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    ref={inputRef}
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Escribe tu palabra..."
                    disabled={isLoading}
                    className="word-input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
                <button
                    type="submit"
                    disabled={isLoading || !word.trim()}
                    className="submit-button"
                >
                    {isLoading ? <SpinnerIcon /> : <SendIcon />}
                </button>
            </form>
             {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
        </div>
    );
};

export default WordInput;