import React from 'react';

const ProfileCompleteness = ({ profile, onNavigate }) => {
    const calculateCompleteness = () => {
        const fields = [
            'fullName', 'gender', 'dob', 'location',
            'educationStatus', 'universityName', 'degree', 'specialization',
            'technicalSkills', 'softSkills',
            'careerPath', 'preferredRoles'
        ];
        const totalFields = fields.length;
        let filledFields = 0;

        fields.forEach(field => {
            if (profile[field] && profile[field] !== 'Not specified' && profile[field] !== '') {
                filledFields++;
            }
        });

        return Math.round((filledFields / totalFields) * 100);
    };

    const completeness = calculateCompleteness();

    if (completeness === 100) {
        return null;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h4 className="font-bold text-gray-800">Profile Completeness</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${completeness}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{completeness}% complete. A complete profile gets more attention!</p>
            <button 
                onClick={() => onNavigate('profile')}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                Complete Your Profile
            </button>
        </div>
    );
};

export default ProfileCompleteness;

