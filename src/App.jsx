import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_USERS, MOCK_JOBS } from './data/mockData';
import * as aiEngine from './helpers/aiEngine';

// Pages & Components
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import SeekerSignUpScreen from './pages/SeekerSignUpScreen';
import CompanySignUpScreen from './pages/CompanySignUpScreen';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import Modal from './components/Modal';
import Notification from './components/Notification';

// Main App Component
const App = () => {
    // --- STATE MANAGEMENT ---
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(MOCK_USERS);
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [currentUser, setCurrentUser] = useState(null);
    const [authMode, setAuthMode] = useState('login');
    const [currentView, setCurrentView] = useState('dashboard');
    const [viewPayload, setViewPayload] = useState(null);
    const [notification, setNotification] = useState(null);
    
    // State for AI feature modals
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [feedbackData, setFeedbackData] = useState(null);
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [interviewData, setInterviewData] = useState(null);
    const [viewingApplicant, setViewingApplicant] = useState(null);

    // --- EFFECTS ---
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // --- HANDLER FUNCTIONS (WRAPPED IN useCallback for performance and stability) ---
    
    const showNotification = useCallback((message) => {
        setNotification({ message, id: Date.now() });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    const handleLogin = useCallback((user) => {
        setCurrentUser(user);
    }, []);

    const handleLogout = useCallback(() => {
        setCurrentUser(null);
        setAuthMode('login');
        setCurrentView('dashboard');
    }, []);
    
    const handleSignUp = useCallback((email, newUser) => {
        setUsers(prev => ({ ...prev, [email]: newUser }));
        setAuthMode('login');
        showNotification("Account created successfully! Please log in.");
    }, [showNotification]);

    const handleNavigate = useCallback((view, payload = null) => {
        setCurrentView(view);
        setViewPayload(payload);
    }, []);

    const handleUpdateProfile = useCallback((updatedProfile) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, profile: updatedProfile };
        setCurrentUser(updatedUser);
        setUsers(prev => ({ ...prev, [currentUser.email]: updatedUser }));
        setCurrentView('dashboard');
        showNotification("Profile updated successfully!");
    }, [currentUser, showNotification]);
    
    const handleApplySubmit = useCallback((jobId, applicationData) => {
        if (!currentUser) return;
        const jobToUpdate = jobs.find(job => job.id === jobId);
        if (!jobToUpdate) return;
        
        const seekerProfile = users[applicationData.email]?.profile;
        const score = seekerProfile ? aiEngine.calculateMatchScore(seekerProfile, jobToUpdate) : 0;

        const newApplicantForJob = {
            name: applicationData.name,
            email: applicationData.email,
            resumeFile: applicationData.resumeFile,
            score: score
        };

        const newApplicationForUser = {
            jobId: jobId,
            status: 'Applied',
            appliedDate: new Date().toISOString()
        };

        const updatedUser = {
            ...currentUser,
            appliedJobs: [...(currentUser.appliedJobs || []), newApplicationForUser]
        };
        
        const updatedUsers = {
            ...users,
            [currentUser.email]: updatedUser
        };
        
        const updatedJobs = jobs.map(job => 
            job.id === jobId 
                ? { ...job, applicants: [...(job.applicants || []), newApplicantForJob] }
                : job
        );
        
        setJobs(updatedJobs);
        setCurrentUser(updatedUser);
        setUsers(updatedUsers);
        showNotification("Successfully applied!");
    }, [currentUser, jobs, users, showNotification]);

    const handleWithdrawApplication = useCallback((jobId) => {
        if (!currentUser) return;
        const updatedUser = {
            ...currentUser,
            appliedJobs: currentUser.appliedJobs.filter(app => app.jobId !== jobId)
        };
        setCurrentUser(updatedUser);
        setUsers(prev => ({...prev, [currentUser.email]: updatedUser}));
        showNotification("Application withdrawn.");
    }, [currentUser, showNotification]);
    
    const handleSaveJob = useCallback((jobId) => {
        if (!currentUser) return;
        const savedJobs = currentUser.savedJobs || [];
        let newSavedJobs;
        let message = '';

        if (savedJobs.includes(jobId)) {
            newSavedJobs = savedJobs.filter(id => id !== jobId);
            message = "Job removed from saved list.";
        } else {
            newSavedJobs = [...savedJobs, jobId];
            message = "Job saved successfully!";
        }

        const updatedUser = { ...currentUser, savedJobs: newSavedJobs };
        
        const updatedUsers = {
            ...users,
            [currentUser.email]: updatedUser
        };
        
        setCurrentUser(updatedUser);
        setUsers(updatedUsers);
        showNotification(message);
    }, [currentUser, users, showNotification]);

    // --- COMPANY DASHBOARD HANDLERS ---
    const handlePostJob = useCallback((newJobData) => {
         const newJob = {
            ...newJobData,
            id: `job_${Date.now()}`,
            datePosted: new Date().toISOString(),
            applicants: []
        };
        setJobs(prev => [newJob, ...prev]);
        showNotification("New opportunity posted successfully!");
    }, [showNotification]);

    const handleRemoveJob = useCallback((jobId) => {
        setJobs(prev => prev.filter(job => job.id !== jobId));
        showNotification("Job posting removed.");
    }, [showNotification]);

    const handleViewApplicant = useCallback((applicant, job) => {
        setViewingApplicant({ applicant, job });
    }, []);


    // --- AI Feature Handlers ---
    const handleAnalyzeResume = useCallback((jobId) => {
        if (!currentUser) return;
        const job = jobs.find(j => j.id === jobId);
        if (currentUser.profile.resumeText && job) {
            const analysis = aiEngine.analyzeResume(currentUser.profile.resumeText, job);
            setFeedbackData(analysis);
            setIsFeedbackModalOpen(true);
        } else {
             showNotification("Please upload your resume text in your profile first.");
        }
    }, [currentUser, jobs, showNotification]);

    const handlePrepareForInterview = useCallback((jobId) => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            const questions = aiEngine.generateInterviewQuestions(job);
            setInterviewData({ jobTitle: job.title, questions });
            setIsInterviewModalOpen(true);
        }
    }, [jobs]);
    
    // --- RENDER LOGIC ---

    const renderSeekerContent = () => {
        switch (currentView) {
            case 'profile':
                return <ProfilePage user={currentUser} jobs={jobs} onUpdateProfile={handleUpdateProfile} onNavigate={handleNavigate} onAnalyzeResume={handleAnalyzeResume} />;
            case 'applications':
                return <MyApplicationsPage user={currentUser} jobs={jobs} onNavigate={handleNavigate} onWithdraw={handleWithdrawApplication} onPrepare={handlePrepareForInterview} />;
            case 'savedJobs':
                return <SavedJobsPage user={currentUser} jobs={jobs} onNavigate={handleNavigate} onSaveJob={handleSaveJob} aiEngine={aiEngine} onViewDetails={(job) => {
                    const dashboard = document.createElement('div');
                    const dashboardComp = <JobSeekerDashboard user={currentUser} jobs={jobs} onLogout={handleLogout} onNavigate={handleNavigate} onApply={handleApplySubmit} onSaveJob={handleSaveJob} />;
                    // This is a hacky way to get the onViewDetails functionality in saved jobs page
                    // In a real app with routing, this would be much cleaner
                    dashboardComp.props.onViewDetails(job);
                }} />;
            case 'companyProfile':
                const company = Object.values(users).find(u => u.type === 'company' && u.name === viewPayload.companyName);
                return <CompanyProfilePage company={company} jobs={jobs} user={currentUser} onNavigate={handleNavigate} onSaveJob={handleSaveJob} aiEngine={aiEngine} onViewDetails={(job) => {
                    // Another hacky way
                    const dashboard = document.createElement('div');
                    const dashboardComp = <JobSeekerDashboard user={currentUser} jobs={jobs} onLogout={handleLogout} onNavigate={handleNavigate} onApply={handleApplySubmit} onSaveJob={handleSaveJob} />;
                    dashboardComp.props.onViewDetails(job);
                }} />;
            case 'dashboard':
            default:
                return <JobSeekerDashboard user={currentUser} jobs={jobs} onLogout={handleLogout} onNavigate={handleNavigate} onApply={handleApplySubmit} onSaveJob={handleSaveJob} />;
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return <SplashScreen />;
        }
        if (currentUser) {
            return currentUser.type === 'seeker' 
                ? renderSeekerContent() 
                : <CompanyDashboard 
                    user={currentUser} 
                    jobs={jobs} 
                    onLogout={handleLogout}
                    onPostJob={handlePostJob}
                    onRemoveJob={handleRemoveJob}
                    onViewApplicant={handleViewApplicant}
                  />;
        }
        switch (authMode) {
            case 'seeker_signup':
                return <SeekerSignUpScreen onSignUp={handleSignUp} onSwitchMode={setAuthMode} users={users} />;
            case 'company_signup':
                return <CompanySignUpScreen onSignUp={handleSignUp} onSwitchMode={setAuthMode} users={users} />;
            case 'login':
            default:
                return <LoginScreen onLogin={handleLogin} onSwitchMode={setAuthMode} users={users} />;
        }
    };

    return (
        <>
            <Notification notification={notification} />

            {isFeedbackModalOpen && feedbackData && (
                <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="AI Resume Analysis">
                    <div className="space-y-4">
                        <p className="text-gray-700">Your resume has an estimated <span className="font-bold text-green-600">{feedbackData.overallScore}%</span> keyword match for this role.</p>
                        <div>
                            <h4 className="font-bold text-gray-800">Keywords Found:</h4>
                            <p className="text-sm text-green-700">{feedbackData.keywordsFound.join(', ') || 'None'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Missing Keywords to Consider:</h4>
                            <p className="text-sm text-yellow-700">{feedbackData.missingKeywords.join(', ') || 'None'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">AI Feedback:</h4>
                            <p className="text-gray-600">{feedbackData.feedback}</p>
                        </div>
                    </div>
                </Modal>
            )}

            {isInterviewModalOpen && interviewData && (
                <Modal isOpen={isInterviewModalOpen} onClose={() => setIsInterviewModalOpen(false)} title={`Interview Prep for ${interviewData.jobTitle}`}>
                     <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-gray-800">Common Behavioral Questions:</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                {interviewData.questions.behavioral.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Potential Technical Questions:</h4>
                             <ul className="list-disc list-inside text-gray-600">
                                {interviewData.questions.technical.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div>
                    </div>
                </Modal>
            )}

            {viewingApplicant && (
                 <Modal isOpen={!!viewingApplicant} onClose={() => setViewingApplicant(null)} title={`Application: ${viewingApplicant.applicant.name}`}>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-gray-800">Applicant Details</h4>
                            <p><strong>Name:</strong> {viewingApplicant.applicant.name}</p>
                            <p><strong>Email:</strong> {viewingApplicant.applicant.email}</p>
                            <p><strong>Resume File:</strong> {viewingApplicant.applicant.resumeFile}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-gray-800">AI Analysis</h4>
                            <p><strong>Applying for:</strong> {viewingApplicant.job.title}</p>
                            <p><strong>AI Match Score:</strong> <span className="font-bold text-2xl text-green-600">{viewingApplicant.applicant.score}%</span></p>
                        </div>
                    </div>
                </Modal>
            )}

            {renderContent()}
        </>
    );
};

export default App;

