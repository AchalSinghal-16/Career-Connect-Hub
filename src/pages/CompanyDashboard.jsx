import React, { useState } from 'react';
import ApplicantCard from '../components/ApplicantCard';
import PostJobForm from './PostJobForm';

const BuildingOfficeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CompanyDashboard = ({ user, jobs, onLogout, onViewApplicant, onPostJob, onRemoveJob }) => {
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <BuildingOfficeIcon />
                        <h1 className="text-2xl font-bold text-gray-800">Career Connect Hub</h1>
                    </div>
                    <div>
                        <button 
                            onClick={() => setIsPostJobModalOpen(true)}
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mr-4"
                        >
                            Post an Opportunity
                        </button>
                        <button onClick={onLogout} className="font-semibold text-indigo-600 hover:text-indigo-800">Logout</button>
                    </div>
                </header>
                <main className="p-4 md:p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Active Postings</h2>
                    <div className="space-y-8">
                        {jobs.filter(job => job.company === user.name).map(job => (
                            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative">
                                <button
                                    onClick={() => onRemoveJob(job)}
                                    className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                                    title="Remove Job"
                                >
                                    <TrashIcon />
                                </button>
                                <div className="flex items-center mb-2">
                                    <h3 className="text-2xl font-bold text-gray-800 pr-12">{job.title}</h3>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ml-4 ${job.type === 'internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {job.type === 'internship' ? 'Internship' : 'Full-time'}
                                    </span>
                                </div>
                                <p className="text-gray-500 mb-4">{job.location}</p>
                                <h4 className="font-bold text-lg text-gray-700 mb-2">Applicants ({job.applicants.length})</h4>
                                <div className="space-y-4">
                                    {job.applicants.length > 0 ? (
                                        job.applicants
                                            .sort((a, b) => b.score - a.score)
                                            .map(applicant => (
                                                <ApplicantCard key={applicant.name} applicant={applicant} onView={onViewApplicant} />
                                            ))
                                    ) : (
                                        <p className="text-gray-600">No applicants yet.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <PostJobForm 
                isOpen={isPostJobModalOpen}
                onClose={() => setIsPostJobModalOpen(false)}
                onPostJob={onPostJob}
                companyName={user.name}
            />
        </>
    );
};
export default CompanyDashboard;


//test line