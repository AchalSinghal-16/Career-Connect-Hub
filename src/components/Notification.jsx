import React, { useEffect } from 'react';

const Notification = ({ message, type, onDismiss }) => {
    const baseClasses = "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300";
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-blue-500';

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            {message}
        </div>
    );
};
export default Notification;

//test line
