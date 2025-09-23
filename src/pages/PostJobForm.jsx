import React, { useState } from 'react';
import Modal from '../components/Modal';

const PostJobForm = ({ isOpen, onClose, onPostJob, companyName }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'job',
        location: '',
        category: '',
        timings: 'Full-time',
        requiredExperience: '0',
        about: '',
        eligibility: '',
        recruitmentProcess: '',
        deadlines: '',
        requiredSkills: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            company: companyName,
            requiredExperience: parseInt(formData.requiredExperience, 10),
            // Convert comma-separated skills to an array
            requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()).filter(Boolean),
        };
        onPostJob(finalData);
        onClose(); // Close the modal after posting
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Post a New Opportunity" fullscreen={true}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700">Job Title</label>
                        <input type="text" name="title" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Type</label>
                        <select name="type" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="job">Full-time Job</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Location</label>
                        <input type="text" name="location" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Category</label>
                        <input type="text" name="category" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Work Timings</label>
                        <select name="timings" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700">Required Experience (Years)</label>
                        <select name="requiredExperience" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                            <option value="0">Fresher (0)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold text-gray-700">Required Skills (comma-separated)</label>
                    <input type="text" name="requiredSkills" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700">About the Opportunity</label>
                    <textarea name="about" onChange={handleChange} rows="4" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700">Eligibility Criteria</label>
                    <textarea name="eligibility" onChange={handleChange} rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700">Recruitment Process</label>
                    <textarea name="recruitmentProcess" onChange={handleChange} rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700">Important Dates & Deadlines</label>
                    <input type="text" name="deadlines" onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                </div>

                <div className="pt-6 border-t mt-6 flex justify-end space-x-4">
                     <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700">
                        Post Opportunity
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default PostJobForm;
