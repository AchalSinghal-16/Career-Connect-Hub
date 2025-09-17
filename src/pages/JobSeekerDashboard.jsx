import React, { useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import Modal from '../components/Modal';
import ProfileDropdown from '../components/ProfileDropdown';
import ProfileCompleteness from '../components/ProfileCompleteness';
import { calculateMatchScore } from '../helpers/aiEngine'; // <-- Import the new AI function

// Briefcase Icon SVG Component
const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const JobSeekerDashboard = ({ user, jobs, onLogout, onNavigate, onApply }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplyForm, setShowApplyForm] = useState(false);
    
    const [filters, setFilters] = useState({
        type: 'all',
        location: '',
        category: 'all',
        timings: 'all',
        experience: 'all',
        datePosted: 'all',
    });

    const uniqueCategories = useMemo(() => {
        const cats = new Set(jobs.map(job => job.category));
        return ['all', ...Array.from(cats)];
    }, [jobs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const scoredAndSortedJobs = useMemo(() => {
        const filtered = jobs.filter(job => {
            const typeMatch = filters.type === 'all' || job.type === filters.type;
            const locationMatch = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
            const categoryMatch = filters.category === 'all' || job.category === filters.category;
            const timingsMatch = filters.timings === 'all' || job.details.timings === filters.timings;
            
            const expLevel = job.details.experienceRequired;
            let experienceMatch = true;
            if (filters.experience !== 'all') {
                if (filters.experience === "0") experienceMatch = expLevel === 0;
                else if (filters.experience === "1") experienceMatch = expLevel >= 1 && expLevel <= 3;
                else if (filters.experience === "4") experienceMatch = expLevel >= 4;
            }

            const datePostedMatch = (() => {
                if (filters.datePosted === 'all') return true;
                const days = parseInt(filters.datePosted, 10);
                const jobDate = new Date(job.datePosted);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - days);
                return jobDate >= cutoffDate;
            })();

            return typeMatch && locationMatch && categoryMatch && timingsMatch && experienceMatch && datePostedMatch;
        });

        // NEW: Score and sort the filtered jobs
        const scored = filtered.map(job => ({
            ...job,
            matchScore: calculateMatchScore(user.profile, job)
        }));

        return scored.sort((a, b) => b.matchScore - a.matchScore);

    }, [jobs, filters, user.profile]);


    const handleViewDetails = (job) => {
        setSelectedJob(job);
    };

    const handleApplyClick = () => {
        setShowApplyForm(true);
    };

    const handleApplySubmit = (applicationData) => {
        onApply(selectedJob.id, applicationData);
        setShowApplyForm(false);
        setSelectedJob(null);
    };

    const Sidebar = () => (
         <aside className="w-1/4 p-6 bg-white border-r border-gray-200 hidden md:block space-y-6">
            <ProfileCompleteness profile={user.profile} onNavigate={onNavigate} />
            
            <div>
                <h3 className="text-xl font-bold mb-4">Filters</h3>
                <div className="space-y-4">
                    {/* Filter options */}
                    <div>
                        <label className="text-sm font-bold text-gray-700">Type</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                             <option value="all">All</option>
                             <option value="job">Jobs</option>
                             <option value="internship">Internships</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-700">Location</label>
                        <input type="text" name="location" value={filters.location} onChange={handleFilterChange} placeholder="e.g., Remote" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-700">Category</label>
                        <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Work Timings</label>
                        <select name="timings" value={filters.timings} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="all">All</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700">Experience Level</label>
                        <select name="experience" value={filters.experience} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                             <option value="all">All Levels</option>
                             <option value="0">Fresher (0 years)</option>
                             <option value="1">1-3 years</option>
                             <option value="4">4+ years</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Date Posted</label>
                        <select name="datePosted" value={filters.datePosted} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="all">Anytime</option>
                            <option value="1">Last 24 hours</option>
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                        </select>
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center">
                    <BriefcaseIcon />
                    <h1 className="text-2xl font-bold text-indigo-600">Career Connect Hub</h1>
                </div>
                <ProfileDropdown user={user} onLogout={onLogout} onNavigate={onNavigate} />
            </header>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scoredAndSortedJobs.map(job => (
                            <JobCard key={job.id} job={job} matchScore={job.matchScore} onViewDetails={() => handleViewDetails(job)} />
                        ))}
                    </div>
                    {scoredAndSortedJobs.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold text-gray-700">No matching opportunities found.</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                        </div>
                    )}
                </main>
            </div>

            {selectedJob && !showApplyForm && (
                 <Modal isOpen={true} onClose={() => setSelectedJob(null)} title={selectedJob.title}>
                    <div className="space-y-4">
                        <p><strong>Company:</strong> {selectedJob.company}</p>
                        <p><strong>Location:</strong> {selectedJob.location}</p>
                        <p className="font-bold border-b mt-4 pb-1">About the Opportunity</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedJob.details.about}</p>
                        <p className="font-bold border-b mt-4 pb-1">Eligibility</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedJob.details.eligibility}</p>
                        <p className="font-bold border-b mt-4 pb-1">Recruitment Process</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedJob.details.process}</p>
                        <p className="font-bold border-b mt-4 pb-1">Important Dates & Deadlines</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedJob.details.deadlines}</p>
                         <div className="text-center pt-4">
                             <button onClick={handleApplyClick} className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Apply Now</button>
                         </div>
                    </div>
                </Modal>
            )}

             {showApplyForm && selectedJob && (
                <Modal isOpen={true} onClose={() => { setShowApplyForm(false); setSelectedJob(null); }} title={`Apply for ${selectedJob.title}`}>
                    <ApplyForm user={user} onSubmit={handleApplySubmit} />
                </Modal>
            )}
        </div>
    );
};

// A simple apply form component for the modal
const ApplyForm = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: user.profile.fullName || `${user.name}`,
        email: user.email,
        resume: null
    });

    const handleChange = (e) => {
         if (e.target.type === 'file') {
            setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
        } else {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, resume: formData.resume?.name || 'No resume attached' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                 <label className="text-sm font-bold text-gray-700">Full Name</label>
                 <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                 <label className="text-sm font-bold text-gray-700">Email Address</label>
                 <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
            </div>
             <div>
                 <label className="text-sm font-bold text-gray-700">Upload Resume</label>
                 <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleChange} className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            <div className="pt-4">
                 <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Submit Application</button>
            </div>
        </form>
    )
}


export default JobSeekerDashboard;

