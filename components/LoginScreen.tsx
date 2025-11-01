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
        <div className="login-screen">
            <div className="login-wrapper">
                <header>
                    <h1 className="app-title">
                        Sílaba<span className="app-title--highlight">Link</span>
                    </h1>
                    <p>Introduce tu nombre para empezar.</p>
                </header>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        maxLength={15}
                        className="login-input"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className="btn btn-primary"
                    >
                        ¡A Jugar!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;