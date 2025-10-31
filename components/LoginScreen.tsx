import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased animate-fade-in-up">
            <div className="w-full max-w-sm mx-auto text-center">
                <header className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-cyan-400 tracking-wider">
                        Sílaba<span className="text-pink-500">Link</span>
                    </h1>
                    <p className="text-slate-400 mt-2">Introduce tu nombre para empezar.</p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        maxLength={15}
                        className="w-full bg-slate-800 text-white placeholder-slate-500 border-2 border-slate-700 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:scale-100"
                    >
                        ¡A Jugar!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
