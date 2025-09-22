import React from 'react';

const ApplicantCard = ({ applicant, onView }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
            <p className="font-bold text-gray-800">{applicant.name}</p>
            <p className="text-sm text-gray-500">{applicant.email}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-600">AI Match Score</p>
            <p className="text-2xl font-bold text-green-500">{applicant.score}%</p>
        </div>
        <button
            onClick={() => onView(applicant)}
            className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
            View Application
        </button>
    </div>
);
export default ApplicantCard;

// Test line
