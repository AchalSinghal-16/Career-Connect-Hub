import React from 'react';

const JobCard = ({ job, onViewDetails, matchScore }) => {

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        <p className="text-indigo-600 font-semibold">{job.company}</p>
                        <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        {/* Display the score passed as a prop */}
                        <p className="text-sm text-gray-600">Your Match</p>
                        <p className="text-2xl font-bold text-green-500">{matchScore}%</p>
                        
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-2 inline-block ${job.type === 'internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {job.type === 'internship' ? 'Internship' : 'Full-time'}
                        </span>
                    </div>
                </div>
                <p className="text-gray-700 mt-4 text-sm line-clamp-3">{job.details.about}</p>
            </div>
            {onViewDetails && (
                <button
                    onClick={onViewDetails} // Corrected onClick handler
                    className="mt-6 w-full bg-indigo-100 text-indigo-700 font-bold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors duration-300"
                >
                    View Details
                </button>
            )}
        </div>
    );
};

export default JobCard;

//test line