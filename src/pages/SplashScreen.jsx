import React, { useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="min-h-screen bg-indigo-600 flex flex-col justify-center items-center text-white animate-fade-in">
            <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 75V25L50 12.5L75 25V75L50 87.5L25 75Z" stroke="currentColor" strokeWidth="5"/>
                    <path d="M75 25L50 37.5L25 25" stroke="currentColor" strokeWidth="5"/>
                    <path d="M50 87.5V37.5" stroke="currentColor" strokeWidth="5"/>
                </svg>
                <h1 className="text-5xl font-bold">Career Connect Hub</h1>
                <p className="text-lg mt-2">Your Gateway to Opportunity</p>
            </div>
        </div>
    );
};

export default SplashScreen;

