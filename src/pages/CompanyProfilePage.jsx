import React from 'react';
import JobCard from '../components/JobCard';

const CompanyProfilePage = ({ company, jobs, user, onNavigate, onSaveJob, aiEngine, onViewDetails }) => {
    // A loading/error state for when the company data isn't ready
    if (!company) {
         return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">Company Not Found</h1>
                    <button 
                        onClick={() => onNavigate('dashboard')} 
                        className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors mt-4"
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }
    
    // Filter for jobs posted by this specific company
    const companyJobs = jobs.filter(job => job.company === company.name);

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm p-4">
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors mb-4"
                >
                    &larr; Back to Dashboard
                </button>
                <div className="border-t pt-4">
                    <h1 className="text-4xl font-bold text-gray-800">{company.name}</h1>
                    <p className="text-md text-gray-600 mt-2">{company.profile.description}</p>
                    <a href={`//${company.profile.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline mt-1 inline-block">
                        Visit Website
                    </a>
                </div>
            </header>
            <main className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Openings at {company.name}</h2>
                 {companyJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {companyJobs.map(job => (
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
                    <p className="text-gray-600">This company has no active openings at the moment.</p>
                )}
            </main>
        </div>
    );
};

export default CompanyProfilePage;

