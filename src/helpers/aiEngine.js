// This file simulates an AI engine with multiple capabilities.

// --- 1. MATCH SCORE CALCULATION ---
export const calculateMatchScore = (userProfile, job) => {
    let totalScore = 0;
    const weights = {
        skills: 40,
        experience: 30,
        role: 20,
        location: 10,
    };

    if (!userProfile || !job) return 0;

    // 1. Skills Match (40 points)
    const userSkills = (userProfile.technicalSkills || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const requiredSkills = (job.requiredSkills || []).map(s => s.toLowerCase().trim());
    
    if (requiredSkills.length > 0) {
        const matchedSkills = userSkills.filter(skill => requiredSkills.includes(skill));
        totalScore += (matchedSkills.length / requiredSkills.length) * weights.skills;
    }

    // 2. Experience Match (30 points)
    const currentYear = new Date().getFullYear();
    const userExperience = userProfile.graduationYear ? Math.max(0, currentYear - parseInt(userProfile.graduationYear)) : 0;
    const requiredExperience = job.requiredExperience;

    if (requiredExperience === 0) {
        if (userExperience <= 1) totalScore += weights.experience; // Perfect score for freshers
    } else if (userExperience >= requiredExperience) {
        totalScore += weights.experience;
    } else if (userExperience > 0) {
        // Partial score if close
        totalScore += (userExperience / requiredExperience) * weights.experience;
    }

    // 3. Preferred Role Match (20 points)
    const preferredRoles = (userProfile.preferredRoles || '').toLowerCase();
    const jobTitle = (job.title || '').toLowerCase();
    const jobCategory = (job.category || '').toLowerCase();

    if (preferredRoles && (jobTitle.includes(preferredRoles) || jobCategory.includes(preferredRoles))) {
        totalScore += weights.role;
    }

    // 4. Location Match (10 points)
    const preferredLocation = (userProfile.preferredLocation || '').toLowerCase();
    const jobLocation = (job.location || '').toLowerCase();

    if (preferredLocation && (jobLocation.includes(preferredLocation) || preferredLocation.includes('remote') || preferredLocation.includes('relocation'))) {
        totalScore += weights.location;
    } else if (jobLocation.includes('remote')) {
        totalScore += weights.location; // User is open to remote even if not specified
    }

    return Math.min(100, Math.round(totalScore));
};


// --- 2. RESUME ANALYSIS ---
export const analyzeResume = (resumeText, job) => {
    if (!resumeText || !job) {
        return {
            overallScore: 0,
            keywordsFound: [],
            missingKeywords: job.requiredSkills || [],
            feedback: "Could not analyze resume. Please ensure your profile has resume text and a job is selected."
        };
    }

    const resumeWords = new Set(resumeText.toLowerCase().match(/\b(\w+)\b/g) || []);
    const requiredSkills = (job.requiredSkills || []).map(s => s.toLowerCase().trim());

    const keywordsFound = requiredSkills.filter(skill => {
        // Handle multi-word skills
        if (skill.includes(' ')) {
            return resumeText.toLowerCase().includes(skill);
        }
        return resumeWords.has(skill);
    });

    const missingKeywords = requiredSkills.filter(skill => !keywordsFound.includes(skill));
    const overallScore = requiredSkills.length > 0 ? Math.round((keywordsFound.length / requiredSkills.length) * 100) : 100;

    let feedback = "Your resume shows a strong alignment with this role. ";
    if (missingKeywords.length > 0) {
        feedback = `Your resume is a good starting point. To better align with the '${job.title}' role, consider highlighting your experience with the following skills: ${missingKeywords.join(', ')}. `;
    }
    if (overallScore > 80) {
        feedback += "Excellent keyword alignment!"
    } else {
        feedback += "Adding these keywords could significantly improve your match score."
    }

    return {
        overallScore,
        keywordsFound,
        missingKeywords,
        feedback
    };
};


// --- 3. MOCK INTERVIEW QUESTION GENERATOR ---
export const generateInterviewQuestions = (job) => {
    if (!job) return { behavioral: [], technical: [] };

    const baseQuestions = [
        "Tell me about yourself.",
        "Why are you interested in this role at our company?",
        "What are your biggest strengths and weaknesses?",
        "Describe a challenging situation you faced at work and how you handled it.",
        "Where do you see yourself in 5 years?",
    ];

    const technicalQuestions = [];
    const skills = job.requiredSkills || [];

    skills.forEach(skill => {
        const s = skill.toLowerCase();
        if (s.includes('react')) {
            technicalQuestions.push("Can you explain the difference between state and props in React?");
            technicalQuestions.push("Describe the virtual DOM.");
        }
        if (s.includes('javascript')) {
            technicalQuestions.push("What is a closure in JavaScript?");
        }
        if (s.includes('node.js')) {
            technicalQuestions.push("What is event-driven programming?");
        }
        if (s.includes('python')) {
            technicalQuestions.push("What is the difference between a list and a tuple in Python?");
        }
        if (s.includes('sql')) {
            technicalQuestions.push("What is the difference between an INNER JOIN and a LEFT JOIN?");
        }
        if (s.includes('data')) {
            technicalQuestions.push(`Tell me about a project where you used data to drive a decision.`);
        }
        if (s.includes('marketing')) {
            technicalQuestions.push(`How would you approach developing a marketing campaign for our flagship product?`);
        }
    });

    if (technicalQuestions.length === 0 && skills.length > 0) {
        technicalQuestions.push(`Can you walk me through a technical project from your resume that used skills relevant to this role?`);
    }

    return {
        behavioral: baseQuestions,
        technical: technicalQuestions.slice(0, 3) // Return up to 3 technical questions
    };
};

