import React, { useState } from 'react';

const ProfilePage = ({ user, jobs, onUpdateProfile, onNavigate, onAnalyzeResume }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user.profile);
    const [selectedJobId, setSelectedJobId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
        setIsEditing(false);
    };

    const handleAnalyze = () => {
        if(selectedJobId) {
            onAnalyzeResume(selectedJobId);
        }
    };

    const renderField = (label, name, type = 'text', options = []) => (
        <div>
            <label className="text-sm font-bold text-gray-600 block">{label}</label>
            {isEditing ? (
                type === 'textarea' ? (
                     <textarea name={name} value={formData[name] || ''} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" rows="3"></textarea>
                ) : type === 'select' ? (
                     <select name={name} value={formData[name] || ''} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : (
                    <input type={type} name={name} value={formData[name] || ''} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                )
            ) : (
                <p className="text-gray-800 bg-gray-50 p-2 rounded-md min-h-[40px]">{formData[name] || 'Not specified'}</p>
            )}
        </div>
    );
    
     const Section = ({ title, children }) => (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-indigo-600 mb-4 border-b pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <div className="flex items-center space-x-4">
                     {isEditing && <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Save Changes</button>}
                    <button onClick={() => setIsEditing(!isEditing)} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button onClick={() => onNavigate('dashboard')} className="text-indigo-600 font-semibold hover:text-indigo-800">&larr; Back to Dashboard</button>
                </div>
            </header>

            <main className="p-8 space-y-8">
                <Section title="👤 Basic Information">
                    {renderField("Full Name", "fullName")}
                    {renderField("Gender", "gender", "select", ["Not specified", "Male", "Female", "Other"])}
                    {renderField("Date of Birth", "dob", "date")}
                    {renderField("Location (City, State)", "location")}
                </Section>

                <Section title="🎓 Education Details">
                     {renderField("Current Status", "educationStatus", "select", ["Not specified", "School Student", "Undergraduate", "Postgraduate", "Working Professional"])}
                     {renderField("College/University Name", "universityName")}
                     {renderField("Degree/Program", "degree")}
                     {renderField("Branch/Specialization", "specialization")}
                     {renderField("Graduation Year", "graduationYear")}
                     {renderField("CGPA / Percentage", "academicPerformance")}
                </Section>
                
                 <Section title="🛠 Skills & Competencies">
                    {renderField("Technical Skills (comma-separated)", "technicalSkills")}
                    {renderField("Soft Skills (comma-separated)", "softSkills")}
                    {renderField("Tools/Software (comma-separated)", "toolsSoftware")}
                    {renderField("Languages Known (comma-separated)", "languages")}
                </Section>
                
                 <Section title="🎯 Career Preferences">
                    {renderField("Career Path", "careerPath", "select", ["Not specified", "Job", "Internship", "Freelance"])}
                    {renderField("Preferred Roles/Fields", "preferredRoles")}
                    {renderField("Preferred Industry", "preferredIndustry")}
                    {renderField("Work Mode", "workMode", "select", ["Not specified", "On-site", "Remote", "Hybrid"])}
                    {renderField("Preferred Location(s)", "preferredLocation")}
                    {renderField("Joining Availability", "joiningAvailability")}
                </Section>

                 <Section title="🔗 Additional Information">
                    {renderField("Resume (Paste Text)", "resumeText", "textarea")}
                    {renderField("Portfolio Links (GitHub, Behance, etc.)", "portfolioLinks")}
                    {renderField("LinkedIn Profile Link", "linkedinProfile")}
                    {renderField("Personal Website", "personalWebsite")}
                </Section>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-bold text-indigo-600 mb-4">🤖 AI Resume Analysis</h3>
                    <p className="text-gray-600 mb-4">Select a job to see how your resume keywords match up. Make sure your resume text is saved above.</p>
                     <div className="flex items-center space-x-4">
                        <select 
                            value={selectedJobId} 
                            onChange={(e) => setSelectedJobId(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">-- Select a Job to Analyze --</option>
                            {jobs.map(job => <option key={job.id} value={job.id}>{job.title} at {job.company}</option>)}
                        </select>
                        <button 
                            onClick={handleAnalyze} 
                            disabled={!selectedJobId || !user.profile.resumeText}
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            Analyze
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ProfilePage;

