import React, { useState } from 'react';

const LogoIcon = () => (
    <svg className="w-12 h-12 mx-auto text-indigo-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 75V25L50 12.5L75 25V75L50 87.5L25 75Z" stroke="currentColor" strokeWidth="5"/>
        <path d="M75 25L50 37.5L25 25" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 87.5V37.5" stroke="currentColor" strokeWidth="5"/>
    </svg>
);


const LoginScreen = ({ onLogin, onSwitchMode, users }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('seeker');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users[email];
        if (user && user.password === password && user.type === role) {
            onLogin(user);
        } else {
            setError('Invalid credentials or role mismatch.');
        }
    };
    
    const handleSwitchToSignUp = () => {
        if (role === 'seeker') {
            onSwitchMode('seeker_signup');
        } else {
            onSwitchMode('company_signup');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <LogoIcon />
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-2">Career Connect Hub</h1>
                <p className="text-center text-gray-600 mb-8">Your Gateway to Opportunity</p>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <div className="flex rounded-md shadow-sm mb-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('seeker')}
                                    className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md w-1/2 transition-colors ${role === 'seeker' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Job Seeker
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('company')}
                                    className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md w-1/2 transition-colors ${role === 'company' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Company
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Email Address</label>
                            <input
                                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                            <input
                                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-indigo-700"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                     <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <button onClick={handleSwitchToSignUp} className="font-semibold text-indigo-600 hover:underline">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;

