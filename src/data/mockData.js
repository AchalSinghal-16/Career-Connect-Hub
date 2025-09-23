// --- MOCK DATABASE ---
// In a real application, this data would come from a backend API.

export let MOCK_USERS = {
  'achal@example.com': {
    password: 'password123',
    type: 'seeker',
    name: 'Achal Singhal',
    email: 'achal@example.com',
    profile: {
      fullName: "Achal Singhal",
      gender: "Not specified",
      dob: "",
      profilePicture: "",
      location: "",
      educationStatus: "Not specified",
      universityName: "",
      degree: "",
      specialization: "",
      graduationYear: "",
      academicPerformance: "",
      technicalSkills: "",
      softSkills: "",
      toolsSoftware: "",
      languages: "",
      careerPath: "Not specified",
      preferredRoles: "",
      preferredIndustry: "",
      workMode: "Not specified",
      preferredLocation: "",
      expectedSalary: "",
      joiningAvailability: "",
      resumeText: `Achal Singhal - Aspiring Developer

OBJECTIVE
A motivated and enthusiastic individual seeking an entry-level position in the tech industry. Eager to apply my foundational knowledge of software development and problem-solving skills to contribute to a dynamic team.

SKILLS
- Programming Languages: Java, JavaScript
- Web Technologies: HTML, CSS, React (Beginner)
- Tools: Git, VS Code`,
      portfolioLinks: "",
      linkedinProfile: "",
      personalWebsite: "",
    },
    appliedJobs: [],
    savedJobs: [], // For bookmarked jobs
  },
  'company@example.com': {
    password: 'password123',
    type: 'company',
    name: 'Innovate Tech',
    email: 'company@example.com',
    profile: {
      description: 'A leading company in cloud solutions and AI.',
      website: 'innovatetech.com',
    },
  },
  'datasolutions@example.com': {
      password: 'password123',
      type: 'company',
      name: 'Data Solutions',
      email: 'datasolutions@example.com',
      profile: {
          description: 'Pioneering data analytics and business intelligence.',
          website: 'datasolutions.com',
      },
  }
};

export let MOCK_JOBS = [
  {
    id: 'job_1',
    company: 'Innovate Tech',
    title: 'Frontend Developer (React)',
    type: 'job',
    location: 'Bengaluru, India',
    category: 'Software Development',
    timings: 'Full-time',
    datePosted: '2025-09-20T10:00:00Z',
    about: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building the next generation of our user-facing applications using React.',
    eligibility: 'B.Tech/M.Tech in Computer Science or related field. 2+ years of professional experience in frontend development.',
    recruitmentProcess: '1. Online Assessment\n2. Technical Interview (Round 1)\n3. HR Interview',
    deadlines: 'Application Deadline: 30th October 2025',
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    requiredExperience: 2,
    applicants: []
  },
  {
    id: 'job_2',
    company: 'Data Solutions',
    title: 'Data Analyst Intern',
    type: 'internship',
    location: 'Remote',
    category: 'Data Science',
    timings: 'Full-time',
    datePosted: '2025-09-18T12:00:00Z',
    about: 'Join our team for a 6-month paid internship. You will work with our senior analysts on real-world data projects and gain valuable experience in data visualization and statistical analysis.',
    eligibility: 'Currently pursuing a degree in Statistics, Economics, Computer Science or a related field. Strong understanding of SQL and Excel.',
    recruitmentProcess: '1. Resume Screening\n2. Technical Assignment\n3. Final Interview',
    deadlines: 'Apply by 15th October 2025.',
    requiredSkills: ['SQL', 'Excel', 'Tableau', 'Statistics'],
    requiredExperience: 0,
    applicants: []
  },
  {
    id: 'job_3',
    company: 'Innovate Tech',
    title: 'Marketing Intern',
    type: 'internship',
    location: 'Mumbai, India',
    category: 'Marketing',
    timings: 'Part-time',
    datePosted: '2025-08-25T15:00:00Z',
    about: 'A 3-month internship for a creative marketing student to assist with our social media campaigns and content creation.',
    eligibility: 'Pursuing a degree in Marketing, Communications, or Business.',
    recruitmentProcess: '1. Resume Screening\n2. Interview',
    deadlines: 'Apply by 10th October 2025.',
    requiredSkills: ['Social Media Marketing', 'Content Creation', 'Canva'],
    requiredExperience: 0,
    applicants: []
  },
   {
    id: 'job_4',
    company: 'Data Solutions',
    title: 'Python Backend Engineer',
    type: 'job',
    location: 'Remote',
    category: 'Software Development',
    timings: 'Full-time',
    datePosted: '2025-09-22T11:00:00Z',
    about: 'We are seeking a Python Backend Engineer to develop and maintain the server-side logic of our applications. You will work with a team of talented engineers to design and implement scalable web services.',
    eligibility: '3+ years of experience with Python and frameworks like Django or Flask. Experience with REST APIs and databases like PostgreSQL.',
    recruitmentProcess: '1. Technical Screening Call\n2. Coding Challenge\n3. System Design Interview\n4. Final Interview',
    deadlines: 'Open until filled.',
    requiredSkills: ['Python', 'Django', 'Flask', 'SQL', 'REST APIs'],
    requiredExperience: 3,
    applicants: []
  }
];

