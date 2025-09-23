import React, { useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_JOBS } from './data/mockData';

// Pages
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import SeekerSignUpScreen from './pages/SeekerSignUpScreen';
import CompanySignUpScreen from './pages/CompanySignUpScreen';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import SettingsPage from './pages/SettingsPage';

// Main App Component
const App = () => {
    // --- STATE MANAGEMENT ---
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(MOCK_USERS);
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [currentUser, setCurrentUser] = useState(null);
    const [authMode, setAuthMode] = useState('login'); // login, seeker_signup, company_signup
    const [currentView, setCurrentView] = useState('dashboard'); // dashboard, profile, applications, settings

    // --- EFFECTS ---
    // Effect to handle the splash screen
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Show splash for 2 seconds
        return () => clearTimeout(timer);
    }, []);

    // --- HANDLER FUNCTIONS ---
    const handleLogin = (user) => {
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setAuthMode('login');
        setCurrentView('dashboard');
    };
    
    const handleSignUp = (email, newUser) => {
        setUsers(prev => ({ ...prev, [email]: newUser }));
        setAuthMode('login'); // Redirect to login after signup
    };

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

     const handleApplySubmit = (jobId, applicationData) => {
        // Add applicant to the job's applicant list
        setJobs(prevJobs => prevJobs.map(job => 
            job.id === jobId 
                ? { ...job, applicants: [...job.applicants, { email: currentUser.email, ...applicationData }] }
                : job
        ));
        
        // Add job id to user's application list
        setUsers(prevUsers => ({
            ...prevUsers,
            [currentUser.email]: {
                ...currentUser,
                applications: [...(currentUser.applications || []), jobId]
            }
        }));

        // Also update the currentUser state to be consistent
         setCurrentUser(prevUser => ({
            ...prevUser,
            applications: [...(prevUser.applications || []), jobId]
        }));
    };
    
    const handlePostJob = (newJobData) => {
        const newJob = {
            id: Date.now(), // Simple unique ID
            ...newJobData,
            applicants: []
        };
        setJobs(prev => [newJob, ...prev]);
    };
    
    const handleRemoveJob = (jobId) => {
        setJobs(prev => prev.filter(job => job.id !== jobId));
    };

    const handleProfileUpdate = (updatedProfile) => {
        const updatedUser = { ...currentUser, profile: updatedProfile };
        setCurrentUser(updatedUser);
        setUsers(prev => ({ ...prev, [currentUser.email]: updatedUser }));
    };

    // --- RENDER LOGIC ---
    if (isLoading) {
        return <SplashScreen />;
    }

    if (!currentUser) {
        switch (authMode) {
            case 'seeker_signup':
                return <SeekerSignUpScreen onSignUp={handleSignUp} onSwitchMode={setAuthMode} users={users} />;
            case 'company_signup':
                return <CompanySignUpScreen onSignUp={handleSignUp} onSwitchMode={setAuthMode} users={users} />;
            default:
                return <LoginScreen onLogin={handleLogin} onSwitchMode={setAuthMode} users={users} />;
        }
    }

    if (currentUser.type === 'seeker') {
        switch (currentView) {
            case 'profile':
                return <ProfilePage user={currentUser} onUpdateProfile={handleProfileUpdate} onNavigate={handleNavigate} />;
            case 'applications':
                const userApplications = jobs.filter(job => currentUser.applications?.includes(job.id));
                return <MyApplicationsPage applications={userApplications} onNavigate={handleNavigate} />;
            case 'settings':
                return <SettingsPage onNavigate={handleNavigate} />;
            default:
                 return <JobSeekerDashboard user={currentUser} jobs={jobs} onLogout={handleLogout} onNavigate={handleNavigate} onApply={handleApplySubmit} />;
        }
    }
    
    if (currentUser.type === 'company') {
        return <CompanyDashboard 
            user={currentUser} 
            jobs={jobs.filter(job => job.company === currentUser.name)}
            onLogout={handleLogout} 
            onPostJob={handlePostJob}
            onRemoveJob={handleRemoveJob}
        />;
    }

    return null; // Should not be reached
};

export default App;


//test line