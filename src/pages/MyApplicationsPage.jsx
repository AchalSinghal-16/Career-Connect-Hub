import React from 'react';

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const MyApplicationsPage = ({ applications, onBackToDashboard, onViewDetails }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <BriefcaseIcon />
                    <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                </div>
                <button onClick={onBackToDashboard} className="font-semibold text-indigo-600 hover:text-indigo-800">
                    &larr; Back to Dashboard
                </button>
            </header>
            <main className="p-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Submitted Applications</h2>
                    {applications.length > 0 ? (
                        <div className="space-y-4">
                            {applications.map(app => (
                                <div key={app.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-700">{app.title}</h3>
                                        <p className="text-gray-600">{app.company}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-500">Status</p>
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                            Applied
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => onViewDetails(app)}
                                        className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
                                    >
                                        View Posting
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-10">You haven't applied to any jobs yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyApplicationsPage;
