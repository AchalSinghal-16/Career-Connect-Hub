import React from 'react';

const JobCard = ({ job, onSaveJob, isSaved, matchScore, onNavigate, onViewDetails }) => {

    const handleCompanyClick = (e) => {
        e.stopPropagation(); // Prevent the card's onViewDetails from firing
        onNavigate('companyProfile', { companyName: job.company });
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        onSaveJob(job.id);
    };

    return (
        <div onClick={() => onViewDetails(job)} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        <p onClick={handleCompanyClick} className="text-indigo-600 font-semibold hover:underline">{job.company}</p>
                        <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <button onClick={handleSaveClick} className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                        <p className="text-sm text-gray-600 mt-2">Your Match</p>
                        <p className="text-2xl font-bold text-green-500">{matchScore}%</p>
                    </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-2 inline-block ${job.type === 'internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {job.type === 'internship' ? 'Internship' : 'Full-time'}
                </span>
            </div>
            <p className="text-gray-700 mt-4 line-clamp-3 flex-grow">{job.about}</p>
            <button
                onClick={() => onViewDetails(job)}
                className="mt-6 w-full bg-indigo-100 text-indigo-700 font-bold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors duration-300"
            >
                View Details
            </button>
        </div>
    );
};

export default JobCard;

