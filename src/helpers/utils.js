export const calculateMatchScore = (userProfile, job) => {
  let score = 0;
  const weights = { skills: 0.6, experience: 0.4 };

  if (userProfile && userProfile.skills && job.requiredSkills) {
    const matchedSkills = userProfile.skills.filter(skill =>
      job.requiredSkills.some(reqSkill => reqSkill.toLowerCase().trim() === skill.toLowerCase().trim())
    );
    const skillScore = (matchedSkills.length / job.requiredSkills.length) * 100;
    score += Math.min(skillScore, 100) * weights.skills;
  }

  if (userProfile && userProfile.experience >= 0 && job.requiredExperience >= 0) {
    if (job.requiredExperience === 0) {
        score += 100 * weights.experience;
    } else {
        const experienceScore = (userProfile.experience / job.requiredExperience) * 100;
        score += Math.min(experienceScore, 100) * weights.experience;
    }
  }

  return Math.round(score);
};

export const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
};
