import React from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'lg', fullscreen = false }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };

    const modalWrapperClasses = fullscreen ? 'p-0' : 'p-4';
    const modalPanelClasses = fullscreen
        ? 'w-screen h-screen rounded-none flex flex-col'
        : `w-full ${sizeClasses[size]} rounded-lg`;
    const contentClasses = fullscreen
        ? 'flex-grow overflow-y-auto'
        : 'max-h-[70vh] overflow-y-auto';

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${modalWrapperClasses}`}>
            <div className={`bg-white shadow-2xl ${modalPanelClasses}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <div className={`p-6 ${contentClasses}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
