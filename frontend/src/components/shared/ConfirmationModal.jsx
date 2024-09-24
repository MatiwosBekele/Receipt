import { useEffect, useRef } from 'react';

function ConfirmationModal({ onConfirm, onCancel }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='bg-white p-6 mx-2 rounded-lg shadow-lg md:w-[30%]'
      >
        <h2 className='text-lg font-base mb-4 text-center'>
          Are you sure you want to logout?
        </h2>
        <div className='flex justify-center'>
          <button
            onClick={onCancel}
            className='text-sm mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
