import React, { useState } from 'react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';

// Status Badge Component for visual styling
const StatusBadge = ({ status }) => {
    const baseClasses = "text-xs font-semibold px-3 py-1 rounded-full inline-block";
    const statusClasses = {
        Applied: "bg-blue-100 text-blue-800",
        'Under Review': "bg-yellow-100 text-yellow-800",
        Shortlisted: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};


const MyApplicationsPage = ({ user, jobs, onNavigate, onWithdraw }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobToWithdraw, setJobToWithdraw] = useState(null);

    const appliedJobDetails = user.appliedJobs.map(app => {
        const jobDetail = jobs.find(j => j.id === app.jobId);
        return { ...jobDetail, ...app };
    }).sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)); // Sort by most recent first

    const handleViewDetails = (job) => {
        setSelectedJob(job);
    };
    
    const handleConfirmWithdraw = () => {
        if (jobToWithdraw) {
            onWithdraw(jobToWithdraw.jobId);
            setJobToWithdraw(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                        <p className="text-gray-600 mt-1">Track the status of all your submitted applications.</p>
                    </div>
                    <button
                        onClick={() => onNavigate('dashboard')} // <-- BUG FIX: This now works correctly
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {/* Application Cards */}
                <div className="space-y-4">
                    {appliedJobDetails.length > 0 ? (
                        appliedJobDetails.map(app => (
                            <div key={app.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between">
                                    {/* Job Info */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
                                        <p className="text-indigo-600 font-semibold">{app.company}</p>
                                        <p className="text-gray-500 text-sm mt-1">{app.location}</p>
                                    </div>
                                    {/* Status & Actions */}
                                    <div className="mt-4 sm:mt-0 sm:text-right flex-shrink-0">
                                        <p className="text-sm font-semibold text-gray-700">Application Status</p>
                                        <StatusBadge status={app.status} />
                                        <div className="mt-3 space-x-2">
                                            <button onClick={() => handleViewDetails(app)} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md">View Job</button>
                                            <button onClick={() => setJobToWithdraw(app)} className="text-sm bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded-md">Withdraw</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <p className="text-sm text-gray-500">
                                        <strong>Applied on:</strong> {new Date(app.appliedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-700">You haven't applied to any jobs yet.</h3>
                            <p className="text-gray-500 mt-2">Your submitted applications will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals for viewing job details and confirming withdrawal */}
            {selectedJob && (
                 <Modal isOpen={true} onClose={() => setSelectedJob(null)} title={selectedJob.title}>
                    <div className="space-y-4">
                        <p><strong>Company:</strong> {selectedJob.company}</p>
                        <p><strong>Location:</strong> {selectedJob.location}</p>
                        <p className="font-bold border-b mt-4 pb-1">About the Opportunity</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedJob.details.about}</p>
                    </div>
                </Modal>
            )}

            {jobToWithdraw && (
                <ConfirmationModal
                    isOpen={true}
                    title="Confirm Withdrawal"
                    onConfirm={handleConfirmWithdraw}
                    onCancel={() => setJobToWithdraw(null)}
                >
                    Are you sure you want to withdraw your application for the position of <strong>{jobToWithdraw.title}</strong> at <strong>{jobToWithdraw.company}</strong>? This action cannot be undone.
                </ConfirmationModal>
            )}
        </div>
    );
};

export default MyApplicationsPage;
