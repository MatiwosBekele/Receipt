import { useSelector } from 'react-redux';

const DeleteProductModal = ({ isOpen, onClose, productData, onDelete }) => {
  const { loading } = useSelector((state) => state.products);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-xl font-bold mb-4'>Delete Product</h2>
        <p>Are you sure you want to delete the product {productData?.name}?</p>
        <div className='mt-4 flex justify-end'>
          <button
            onClick={onDelete}
            className='bg-red-500 text-white px-4 py-2 rounded-md mr-2'
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={onClose}
            className='bg-gray-300 text-black px-4 py-2 rounded-md'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
