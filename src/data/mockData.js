// --- MOCK DATABASE ---
// In a real application, this data would come from a backend API.

export let MOCK_USERS = {
  'achal@example.com': {
    password: 'password123',
    type: 'seeker',
    name: 'Achal Singhal',
    email: 'achal@example.com',
    profile: {
      // Profile is now mostly empty for a new user experience
      fullName: 'Achal Singhal',
      gender: '',
      dob: '',
      profilePicture: '',
      email: 'achal@example.com',
      location: '',
      
      educationStatus: '',
      universityName: '',
      degree: '',
      specialization: '',
      studyYear: '',
      graduationYear: '',
      performance: '',

      technicalSkills: '',
      softSkills: '',
      tools: '',
      languages: '',

      careerPath: '',
      preferredRoles: '',
      preferredIndustry: '',
      workMode: '',
      preferredLocation: '',
      expectedSalary: '',
      availability: '',

      resume: '',
      portfolio: '',
      linkedin: '',
      website: '',
    },
    applications: [] // Starts with no applications
  },
  'company@example.com': {
    password: 'password123',
    type: 'company',
    name: 'Tech Innovators Inc.',
    email: 'company@example.com',
    profile: {
      website: 'www.techinnovators.com',
      description: 'A leading company in cutting-edge software solutions.'
    }
  },
};

export let MOCK_JOBS = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "InnovateTech",
        location: "Bengaluru",
        type: "job",
        category: "Software Development",
        datePosted: "2025-09-15T10:00:00Z",
        details: {
            experienceRequired: 2,
            timings: 'Full-time',
            about: "We are looking for a skilled Frontend Developer to join our team...",
            eligibility: "Bachelor's degree in Computer Science or related field. 2+ years of experience with React.",
            process: "1. Online Assessment 2. Technical Interview 3. HR Interview",
            deadlines: "Apply by 2025-10-15",
            contact: "hr@innovatetech.com",
            perks: "Health insurance, flexible work hours."
        },
        applicants: []
    },
    {
        id: 2,
        title: "Marketing Intern",
        company: "MarketGrowth",
        location: "Remote",
        type: "internship",
        category: "Marketing",
        datePosted: "2025-09-10T12:00:00Z",
        details: {
            experienceRequired: 0,
            timings: 'Part-time',
            about: "Join our marketing team as an intern and gain hands-on experience...",
            eligibility: "Currently pursuing a degree in Marketing, Business, or a related field.",
            process: "1. Resume Screening 2. Interview",
            deadlines: "Apply by 2025-09-30",
            contact: "careers@marketgrowth.com",
            perks: "Stipend, Certificate of Completion."
        },
        applicants: []
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataDriven Inc.",
        location: "Hyderabad",
        type: "job",
        category: "Data Science",
        datePosted: "2025-08-25T09:00:00Z",
        details: {
            experienceRequired: 4,
            timings: 'Full-time',
            about: "Seeking an experienced Data Scientist to work on complex machine learning models.",
            eligibility: "Master's degree in a quantitative field. 4+ years of experience with Python, SQL, and ML frameworks.",
            process: "1. Technical Screening 2. Take-home assignment 3. On-site interviews",
            deadlines: "Apply by 2025-10-20",
            contact: "recruitment@datadriven.com",
            perks: "Competitive salary, stock options."
        },
        applicants: []
    }
];

//test line