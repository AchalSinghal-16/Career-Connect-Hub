import React, { useState } from 'react';
import Modal from '../components/Modal';

const PostJobForm = ({ isOpen, onClose, onPostJob, companyName }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        about: '',
        eligibility: '',
        recruitmentProcess: '',
        deadlines: '',
        contact: '',
        additionalInfo: '',
        requiredSkills: '',
        requiredExperience: '',
        type: 'job',
        category: 'Software Development',
        timings: 'Full-time',
        workDays: 'Mon-Fri'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const skillsArray = formData.requiredSkills.split(',').map(skill => skill.trim());
        const newJob = {
            id: Date.now(),
            company: companyName,
            ...formData,
            datePosted: new Date().toISOString(),
            requiredSkills: skillsArray,
            requiredExperience: parseInt(formData.requiredExperience, 10),
            applicants: []
        };
        onPostJob(newJob);
        onClose();
        setFormData({
            title: '', location: '', about: '', eligibility: '', recruitmentProcess: '', deadlines: '', contact: '', additionalInfo: '', requiredSkills: '', requiredExperience: '', type: 'job', category: 'Software Development', timings: 'Full-time', workDays: 'Mon-Fri'
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Post a New Opportunity" fullscreen={true}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide block mb-2">Opportunity Type</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input type="radio" name="type" value="job" checked={formData.type === 'job'} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <span className="ml-2 text-gray-700">Full-time Job</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="type" value="internship" checked={formData.type === 'internship'} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <span className="ml-2 text-gray-700">Internship</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Title</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Location</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">About the {formData.type === 'job' ? 'Job' : 'Internship'}</label>
                    <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="about" value={formData.about} onChange={handleChange} required />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Eligibility</label>
                    <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="eligibility" value={formData.eligibility} onChange={handleChange} required />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Recruitment Process</label>
                    <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="recruitmentProcess" value={formData.recruitmentProcess} onChange={handleChange} required />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Important Dates & Deadlines</label>
                    <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="deadlines" value={formData.deadlines} onChange={handleChange} required />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Contact the Organisers</label>
                    <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                 <div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Additional Information (Perks, etc.)</label>
                    <textarea className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Required Skills (comma-separated)</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Required Years of Experience</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="number" name="requiredExperience" value={formData.requiredExperience} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Category</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Work Days</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" name="workDays" value={formData.workDays} onChange={handleChange} required />
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-indigo-700"
                    >
                        Post Opportunity
                    </button>
                </div>
            </form>
        </Modal>
    );
};
export default PostJobForm;
