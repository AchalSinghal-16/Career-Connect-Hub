import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <div className="text-gray-600 mt-2">{children}</div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4 rounded-b-lg">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                        Confirm Removal
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmationModal;

//test line

