import React, { useState } from 'react';

const SeekerSignUpScreen = ({ onSignUp, onSwitchMode, users }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        referralCode: ''
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
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const newUser = {
            password: formData.password,
            type: 'seeker',
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            profile: {
                fullName: `${formData.firstName} ${formData.lastName}`,
                gender: "Not specified",
                dob: "",
                profilePicture: "",
                location: "",
                educationStatus: "Not specified",
                universityName: "",
                degree: "",
                specialization: "",
                graduationYear: "",
                academicPerformance: "",
                technicalSkills: "",
                softSkills: "",
                toolsSoftware: "",
                languages: "",
                careerPath: "Not specified",
                preferredRoles: "",
                preferredIndustry: "",
                workMode: "Not specified",
                preferredLocation: "",
                expectedSalary: "",
                joiningAvailability: "",
                resumeText: "",
                portfolioLinks: "",
                linkedinProfile: "",
                personalWebsite: "",
            },
            appliedJobs: [],
            savedJobs: []
        };
        onSignUp(formData.email, newUser);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">Create Your Account</h1>
                <p className="text-center text-gray-600 mb-8">Join Career Connect Hub to find your dream job.</p>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-indigo-700"
                            >
                                Create Account
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

export default SeekerSignUpScreen;

