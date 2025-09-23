import React, { useState } from 'react';

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const ToggleSwitch = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-700">{label}</span>
        <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);

const SettingsPage = ({ onBackToDashboard, showNotification }) => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ newJobs: true, statusUpdates: true });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            showNotification('New passwords do not match.', 'error');
            return;
        }
        // In a real app, you would verify the current password and update it.
        showNotification('Password updated successfully!', 'success');
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const handleNotificationSave = () => {
        // In a real app, you would save these preferences to the user's profile.
        showNotification('Notification preferences saved!', 'success');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <BriefcaseIcon />
                    <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                </div>
                <button onClick={onBackToDashboard} className="font-semibold text-indigo-600 hover:text-indigo-800">
                    &larr; Back to Dashboard
                </button>
            </header>
            <main className="p-8 max-w-4xl mx-auto space-y-8">
                {/* Change Password Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-700">Current Password</label>
                            <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700">New Password</label>
                            <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                            <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notification Preferences Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                        <ToggleSwitch 
                            label="Email me about new job recommendations" 
                            enabled={notifications.newJobs} 
                            setEnabled={(value) => setNotifications(prev => ({ ...prev, newJobs: value }))}
                        />
                        <ToggleSwitch 
                            label="Email me about application status updates" 
                            enabled={notifications.statusUpdates} 
                            setEnabled={(value) => setNotifications(prev => ({ ...prev, statusUpdates: value }))}
                        />
                    </div>
                     <div className="pt-6">
                        <button onClick={handleNotificationSave} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
                            Save Preferences
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;


//test line