import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="splash-screen">
            <h1 className="app-title">
                Sílaba<span className="app-title--highlight">Link</span>
            </h1>
            <p>Cargando...</p>
        </div>
    );
};

export default SplashScreen;