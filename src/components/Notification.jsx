import React from 'react';

const Notification = ({ notification }) => {
    if (!notification) return null;

    return (
        <div 
            key={notification.id} 
            className="fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white z-[100] bg-green-500 animate-fade-in-out"
        >
            {notification.message}
        </div>
    );
};

export default Notification;

