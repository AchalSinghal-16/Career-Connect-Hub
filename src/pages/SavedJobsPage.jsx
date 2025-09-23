import React from 'react';
import JobCard from '../components/JobCard';

const SavedJobsPage = ({ user, jobs, onNavigate, onViewDetails, onSaveJob, aiEngine }) => {
    const savedJobsDetails = (user.savedJobs || [])
        .map(jobId => jobs.find(j => j.id === jobId))
        .filter(job => job); // Filter out any saved jobs that might have been deleted

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                >
                    &larr; Back to Dashboard
                </button>
            </header>
            <main className="p-8">
                {savedJobsDetails.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {savedJobsDetails.map(job => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                onViewDetails={onViewDetails} 
                                onSaveJob={onSaveJob}
                                isSaved={(user.savedJobs || []).includes(job.id)}
                                matchScore={aiEngine.calculateMatchScore(user.profile, job)}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700">No Jobs Saved</h3>
                        <p className="text-gray-500 mt-2">Click the bookmark icon on a job to save it for later.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SavedJobsPage;

