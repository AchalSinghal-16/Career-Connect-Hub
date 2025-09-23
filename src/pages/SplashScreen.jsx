import React from 'react';

const CareerConnectHubLogo = () => (
    <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        {/* Simple 'CCH' initials logo */}
        <text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="40" fill="url(#grad1)" textAnchor="middle" fontWeight="bold">
            CCH
        </text>
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="5" />
    </svg>
);

const SplashScreen = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center animate-pulse">
            <CareerConnectHubLogo />
            <h1 className="text-4xl font-bold text-center text-indigo-600 mt-4">Career Connect Hub</h1>
            <p className="text-center text-gray-600">Your Connection to Opportunity</p>
        </div>
    );
};

export default SplashScreen;


//test line