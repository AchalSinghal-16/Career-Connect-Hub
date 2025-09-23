// This function simulates an AI matching engine.
// It calculates a score based on how well a user's profile matches a job's requirements.

export const calculateMatchScore = (userProfile, job) => {
    let totalScore = 0;
    const weights = {
        skills: 40,
        experience: 30,
        role: 20,
        location: 10,
    };

    // 1. Skills Match (40% weight)
    if (userProfile.technicalSkills && job.details.requiredSkills) {
        const userSkills = userProfile.technicalSkills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        const jobSkills = job.details.requiredSkills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        if (jobSkills.length > 0) {
            const matchedSkills = userSkills.filter(skill => jobSkills.includes(skill));
            totalScore += (matchedSkills.length / jobSkills.length) * weights.skills;
        }
    }

    // 2. Experience Match (30% weight) - Calculated from graduation year
    if (userProfile.graduationYear) {
        const currentYear = new Date().getFullYear();
        const userExperience = Math.max(0, currentYear - parseInt(userProfile.graduationYear, 10));
        const requiredExperience = job.details.experienceRequired;

        if (requiredExperience === 0 && userExperience <= 1) { // Ideal for freshers
            totalScore += weights.experience;
        } else if (requiredExperience > 0) {
            if (userExperience >= requiredExperience) {
                totalScore += weights.experience; // Full points if experience is met or exceeded
            } else {
                // Partial points if experience is less than required
                totalScore += (userExperience / requiredExperience) * weights.experience;
            }
        }
    }

    // 3. Preferred Role Match (20% weight)
    if (userProfile.preferredRoles) {
        const preferred = userProfile.preferredRoles.toLowerCase().split(',').map(r => r.trim()).filter(Boolean);
        const jobTitle = job.title.toLowerCase();
        const jobCategory = job.category.toLowerCase();
        if (preferred.some(role => jobTitle.includes(role) || jobCategory.includes(role))) {
            totalScore += weights.role;
        }
    }

    // 4. Location Match (10% weight)
    if (userProfile.preferredLocation && job.location) {
        const preferred = userProfile.preferredLocation.toLowerCase();
        const jobLoc = job.location.toLowerCase();
        if (preferred.includes(jobLoc) || (preferred.includes('remote') && jobLoc.includes('remote')) || preferred.includes('open to relocation')) {
            totalScore += weights.location;
        }
    }
    
    // Ensure score is between 0 and 100
    return Math.min(100, Math.round(totalScore));
};


//test line