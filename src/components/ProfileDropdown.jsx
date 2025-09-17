import React, { useState, useEffect, useRef } from 'react';
import { getInitials } from '../helpers/utils';

const ProfileDropdown = ({ user, onLogout, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavigation = (view) => {
        onNavigate(view);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg"
            >
                {getInitials(user.name)}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button onClick={() => handleNavigation('profile')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</button>
                    <button onClick={() => handleNavigation('applications')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Applications</button>
                    <button onClick={() => handleNavigation('settings')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
export default ProfileDropdown;
