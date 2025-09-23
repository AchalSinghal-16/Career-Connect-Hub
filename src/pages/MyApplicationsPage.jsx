import React, { useState } from 'react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';

const StatusBadge = ({ status }) => {
    const baseClasses = "text-xs font-semibold px-3 py-1 rounded-full inline-block";
    const statusClasses = {
        Applied: "bg-blue-100 text-blue-800",
        'Under Review': "bg-yellow-100 text-yellow-800",
        Shortlisted: "bg-green-100 text-green-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const MyApplicationsPage = ({ user, jobs, onNavigate, onWithdraw, onPrepare }) => {
    const [jobToView, setJobToView] = useState(null);
    const [jobToWithdraw, setJobToWithdraw] = useState(null);

    const userApplications = (user.appliedJobs || [])
        .map(app => {
            const jobDetails = jobs.find(j => j.id === app.jobId);
            if (!jobDetails) return null; // Handle case where job is deleted
            return { ...app, jobDetails };
        })
        .filter(Boolean) // Remove nulls
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                    <button 
                        onClick={() => onNavigate('dashboard')} 
                        className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                    >
                        &larr; Back to Dashboard
                    </button>
                </header>
                <main className="p-8">
                    {userApplications.length > 0 ? (
                        <div className="space-y-6">
                            {userApplications.map(app => (
                                <div key={app.jobId} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{app.jobDetails.title}</h2>
                                            <p className="text-md text-gray-600">{app.jobDetails.company} - {app.jobDetails.location}</p>
                                            <p className="text-sm text-gray-500 mt-1">Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-left md:text-right">
                                            <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
                                            <StatusBadge status={app.status} />
                                        </div>
                                    </div>
                                    <div className="border-t my-4"></div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2">Recruitment Process</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{app.jobDetails.recruitmentProcess}</p>
                                    </div>
                                    <div className="mt-4 flex flex-col md:flex-row md:justify-end md:space-x-4 space-y-2 md:space-y-0">
                                        <button onClick={() => setJobToView(app.jobDetails)} className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">View Original Job Posting</button>
                                        <button onClick={() => onPrepare(app.jobId)} className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200">Prepare for Interview</button>
                                        <button onClick={() => setJobToWithdraw(app)} className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200">Withdraw Application</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-700">No Applications Submitted</h3>
                            <p className="text-gray-500 mt-2">Your applied jobs will appear here.</p>
                        </div>
                    )}
                </main>
            </div>

            {jobToView && (
                <Modal isOpen={!!jobToView} onClose={() => setJobToView(null)} title={jobToView.title} fullscreen={true}>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">About the {jobToView.type}</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{jobToView.about}</p>
                        <h3 className="text-xl font-bold text-gray-800">Eligibility</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{jobToView.eligibility}</p>
                        <h3 className="text-xl font-bold text-gray-800">Recruitment Process</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{jobToView.recruitmentProcess}</p>
                    </div>
                </Modal>
            )}

            {jobToWithdraw && (
                <ConfirmationModal 
                    isOpen={!!jobToWithdraw} 
                    onClose={() => setJobToWithdraw(null)}
                    onConfirm={() => {
                        onWithdraw(jobToWithdraw.jobId);
                        setJobToWithdraw(null);
                    }}
                    title={`Withdraw from ${jobToWithdraw.jobDetails.title}?`}
                >
                    Are you sure you want to withdraw your application? This action cannot be undone.
                </ConfirmationModal>
            )}
        </>
    );
};

export default MyApplicationsPage;


