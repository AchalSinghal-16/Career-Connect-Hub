import React, { useState } from 'react';

const ProfilePage = ({ user, onUpdateProfile, onNavigate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user.profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // A helper for nested objects if needed in the future
    const handleNestedChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            }
        }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
        setIsEditing(false);
    };

    const renderField = (label, name, value, type = "text") => (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            ) : (
                <p className="mt-1 text-md text-gray-900 bg-gray-50 p-2 rounded-md">{value || 'Not specified'}</p>
            )}
        </div>
    );
     const renderSelect = (label, name, value, options) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {isEditing ? (
                <select
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                 <p className="mt-1 text-md text-gray-900 bg-gray-50 p-2 rounded-md">{value || 'Not specified'}</p>
            )}
        </div>
    );


    return (
        <div className="bg-gray-100 min-h-screen">
             <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-indigo-600">My Profile</h1>
                <div>
                     <button
                        onClick={() => onNavigate('dashboard')}
                        className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Back to Dashboard
                    </button>
                    {isEditing ? (
                        <button onClick={handleSave} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                            Save Changes
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                            Edit Profile
                        </button>
                    )}
                </div>
            </header>
            
            <main className="p-8 max-w-4xl mx-auto">
                <div className="space-y-8">
                    {/* Section 1: Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">👤 Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderField("Full Name", "fullName", formData.fullName)}
                            {renderSelect("Gender", "gender", formData.gender, ["Not specified", "Male", "Female", "Other"])}
                            {renderField("Date of Birth", "dob", formData.dob, "date")}
                            {renderField("Email ID", "email", user.email)}
                            {renderField("Location (City, State)", "location", formData.location)}
                            {/* Profile picture upload can be added here */}
                        </div>
                    </div>

                    {/* Section 2: Education Details */}
                    <div className="bg-white p-6 rounded-lg shadow">
                         <h2 className="text-xl font-bold mb-4 border-b pb-2">🎓 Education Details</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderSelect("Current Status", "educationStatus", formData.educationStatus, ["Not specified", "School Student", "Undergraduate", "Postgraduate", "Working Professional"])}
                            {renderField("College/University Name", "universityName", formData.universityName)}
                            {renderField("Degree/Program", "degree", formData.degree)}
                            {renderField("Branch/Specialization", "specialization", formData.specialization)}
                            {renderField("Year of Study", "studyYear", formData.studyYear)}
                            {renderField("Graduation Year", "graduationYear", formData.graduationYear)}
                            {renderField("CGPA / Percentage", "performance", formData.performance)}
                         </div>
                    </div>

                    {/* Section 3: Skills & Competencies */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">🛠 Skills & Competencies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {renderField("Technical Skills (comma-separated)", "technicalSkills", formData.technicalSkills)}
                           {renderField("Soft Skills (comma-separated)", "softSkills", formData.softSkills)}
                           {renderField("Tools/Software (comma-separated)", "tools", formData.tools)}
                           {renderField("Languages Known (comma-separated)", "languages", formData.languages)}
                        </div>
                    </div>
                    
                    {/* Section 4: Career Preferences */}
                    <div className="bg-white p-6 rounded-lg shadow">
                         <h2 className="text-xl font-bold mb-4 border-b pb-2">🎯 Career Preferences</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderSelect("Career Path", "careerPath", formData.careerPath, ["Not specified", "Job", "Internship", "Freelance", "Part-time"])}
                            {renderField("Preferred Roles/Fields", "preferredRoles", formData.preferredRoles)}
                            {renderField("Preferred Industry", "preferredIndustry", formData.preferredIndustry)}
                            {renderSelect("Work Mode", "workMode", formData.workMode, ["Not specified", "On-site", "Remote", "Hybrid"])}
                            {renderField("Preferred Location(s)", "preferredLocation", formData.preferredLocation)}
                            {renderField("Expected Salary / Stipend", "expectedSalary", formData.expectedSalary)}
                            {renderField("Joining Availability", "availability", formData.availability)}
                         </div>
                    </div>

                    {/* Section 5: Additional Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">🔗 Additional Information</h2>
                        <div className="space-y-4">
                            {/* Resume Upload can be added here */}
                            {renderField("Portfolio Links (GitHub, etc.)", "portfolio", formData.portfolio)}
                            {renderField("LinkedIn Profile Link", "linkedin", formData.linkedin)}
                            {renderField("Personal Website", "website", formData.website)}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;


//test line