import React, { useState } from 'react';

const SeekerSignUpScreen = ({ onSignUp, onSwitchMode, users }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '', // Added field
        referralCode: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (users[formData.email]) {
            setError('An account with this email already exists.');
            return;
        }

        const newUser = {
            password: formData.password,
            type: 'seeker',
            name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
            email: formData.email,
            profile: { // Simplified profile
                skills: [],
                experience: 0,
                education: '',
                universityName: '',
                graduationYear: '',
                workingInterest: [],
                resume: ''
            }
        };
        onSignUp(formData.email, newUser);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">Create Your Profile</h1>
                <p className="text-center text-gray-600 mb-8">Join Career Connect Hub to find your next opportunity.</p>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="text-sm font-bold text-gray-700 tracking-wide">First Name</label>
                                <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="firstName" onChange={handleChange} required />
                            </div>
                             <div>
                                <label className="text-sm font-bold text-gray-700 tracking-wide">Last Name</label>
                                <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="lastName" onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Email Address</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" name="email" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Confirm Password</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="confirmPassword" onChange={handleChange} required />
                        </div>
                         <div>
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Referral Code (Optional)</label>
                            <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="referralCode" onChange={handleChange} />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <button type="submit" className="w-full flex justify-center bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300">Create Account</button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button onClick={() => onSwitchMode('login')} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerSignUpScreen;


//test line