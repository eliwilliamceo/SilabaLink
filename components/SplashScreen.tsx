import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-cyan-400 tracking-wider">
                Sílaba<span className="text-pink-500">Link</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg">Cargando...</p>
        </div>
    );
};

export default SplashScreen;
