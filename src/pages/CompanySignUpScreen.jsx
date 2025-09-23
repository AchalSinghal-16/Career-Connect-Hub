import React, { useState } from 'react';

const CompanySignUpScreen = ({ onSignUp, onSwitchMode, users }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        website: '',
        description: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (users[formData.email]) {
            setError('An account with this email already exists.');
            return;
        }

        const newUser = {
            password: formData.password,
            type: 'company',
            name: formData.name,
            email: formData.email,
            profile: {
                website: formData.website,
                description: formData.description,
            }
        };
        onSignUp(formData.email, newUser);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">Register Your Company</h1>
                <p className="text-center text-gray-600 mb-8">Start finding top talent with Intelli-Hire.</p>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Company Name</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="name" placeholder="Tech Innovators Inc." onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Company Email</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" name="email" placeholder="hr@techinnovators.com" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Company Website</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="website" placeholder="www.techinnovators.com" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Company Description</label>
                            <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="description" placeholder="A leading company in cloud solutions and AI." onChange={handleChange} required />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-indigo-700"
                            >
                                Register Company
                            </button>
                        </div>
                    </form>
                     <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <button onClick={() => onSwitchMode('login')} className="font-semibold text-indigo-600 hover:underline">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default CompanySignUpScreen;


//test line