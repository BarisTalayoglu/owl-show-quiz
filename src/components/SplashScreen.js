import React from 'react';

const SplashScreen = ({ title, logo, onSplashEnd }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onSplashEnd();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onSplashEnd]);

    return (
        <div className="splash-screen">
            <img src={logo} alt="Logo" />
            <h1>{title}</h1>
        </div>
    );
};

export default SplashScreen;
