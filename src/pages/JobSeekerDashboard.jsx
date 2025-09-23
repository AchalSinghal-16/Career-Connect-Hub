import React, { useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import Modal from '../components/Modal';
import ProfileDropdown from '../components/ProfileDropdown';
import ProfileCompleteness from '../components/ProfileCompleteness';
import { calculateMatchScore } from '../helpers/aiEngine';

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const JobSeekerDashboard = ({ user, jobs, onLogout, onNavigate, onApply, onSaveJob }) => {
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Loading Dashboard...</h1>
                </div>
            </div>
        );
    }

    const [filters, setFilters] = useState({
        type: 'all',
        location: '',
        category: 'all',
        experience: 'all',
        timings: 'all',
        datePosted: 'all',
        searchQuery: '',
    });
    
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicationData, setApplicationData] = useState({ name: user?.name || '', email: user?.email || '', resumeFile: '' });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleViewDetails = (job) => {
        setSelectedJob(job);
    };

    const handleApplyClick = () => {
        setIsApplyModalOpen(true);
    };

    const handleApplicationChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prev => ({...prev, [name]: value}));
    };
    
    const handleFileChange = (e) => {
         if (e.target.files.length > 0) {
            setApplicationData(prev => ({...prev, resumeFile: e.target.files[0].name}));
        }
    };

    const handleApplySubmit = (e) => {
        e.preventDefault();
        onApply(selectedJob.id, applicationData);
        setIsApplyModalOpen(false);
        setSelectedJob(null);
    };

    const filteredAndSortedJobs = useMemo(() => {
        const filtered = jobs.filter(job => {
            if (filters.type !== 'all' && job.type !== filters.type) return false;
            if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
            if (filters.category !== 'all' && job.category !== filters.category) return false;
            if (filters.timings !== 'all' && job.timings !== filters.timings) return false;
            if (filters.experience !== 'all') {
                const exp = parseInt(filters.experience, 10);
                if (exp === 0 && job.requiredExperience > 0) return false;
                if (exp === 1 && (job.requiredExperience < 1 || job.requiredExperience > 3)) return false;
                if (exp === 4 && job.requiredExperience < 4) return false;
            }
            if (filters.datePosted !== 'all') {
                const days = parseInt(filters.datePosted, 10);
                const jobDate = new Date(job.datePosted);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - days);
                if (jobDate < cutoffDate) return false;
            }
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                if (!job.title.toLowerCase().includes(query) && !job.company.toLowerCase().includes(query) && !job.category.toLowerCase().includes(query)) {
                    return false;
                }
            }
            return true;
        });

        return filtered
            .map(job => ({
                ...job,
                matchScore: calculateMatchScore(user.profile, job)
            }))
            .sort((a, b) => b.matchScore - a.matchScore);

    }, [jobs, filters, user.profile]);

    const uniqueCategories = [...new Set(jobs.map(j => j.category))];

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10 h-16">
                    <div className="flex items-center">
                        <BriefcaseIcon />
                        <h1 className="text-2xl font-bold text-gray-800">Career Connect Hub</h1>
                    </div>
                    <ProfileDropdown user={user} onLogout={onLogout} onNavigate={onNavigate} />
                </header>
                <div className="flex">
                    <aside className="w-1/4 p-6 bg-white border-r border-gray-200 hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                        <ProfileCompleteness profile={user.profile} onNavigate={onNavigate} />
                        <div className="mt-6">
                            <h3 className="text-xl font-bold mb-4">Filters</h3>
                            <div className="space-y-4">
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
                                        <option value="all">All Categories</option>
                                        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
                    <main className="w-full md:w-3/4 p-4 md:p-8">
                        <div className="mb-6">
                            <input
                                type="text"
                                name="searchQuery"
                                value={filters.searchQuery}
                                onChange={handleFilterChange}
                                placeholder="Search by title, company, or category..."
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Opportunities For You ({filteredAndSortedJobs.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredAndSortedJobs.length > 0 ? (
                                filteredAndSortedJobs.map(job => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onViewDetails={handleViewDetails}
                                        onSaveJob={onSaveJob}
                                        isSaved={(user.savedJobs || []).includes(job.id)}
                                        matchScore={job.matchScore}
                                        onNavigate={onNavigate}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600 col-span-full text-center py-10">No opportunities match your current filters.</p>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {selectedJob && !isApplyModalOpen && (
                <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} title={selectedJob.title} fullscreen={true}>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">About the {selectedJob.type}</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.about}</p>
                        <h3 className="text-xl font-bold text-gray-800">Eligibility</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.eligibility}</p>
                        <h3 className="text-xl font-bold text-gray-800">Recruitment Process</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.recruitmentProcess}</p>
                        <h3 className="text-xl font-bold text-gray-800">Deadlines</h3>
                        <p className="text-gray-700">{selectedJob.deadlines}</p>
                    </div>
                     <div className="mt-6 pt-6 border-t">
                        <button onClick={handleApplyClick} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
                            Apply Now
                        </button>
                    </div>
                </Modal>
            )}

            {isApplyModalOpen && (
                <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title="Apply Now">
                    <form onSubmit={handleApplySubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700">Full Name</label>
                                <input type="text" name="name" value={applicationData.name} onChange={handleApplicationChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                            </div>
                             <div>
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="email" name="email" value={applicationData.email} onChange={handleApplicationChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                            </div>
                             <div>
                                <label className="text-sm font-bold text-gray-700">Upload Resume (.pdf, .docx)</label>
                                <input type="file" onChange={handleFileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" accept=".pdf,.docx" required />
                            </div>
                        </div>
                         <div className="mt-6 pt-6 border-t">
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default JobSeekerDashboard;

