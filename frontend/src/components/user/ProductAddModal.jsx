import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Close icon for the modal
import { useSelector } from 'react-redux';

const ProductAddModal = ({ isOpen, onClose, onSubmit }) => {
  const [productData, setProductData] = useState({
    code: '',
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const { addProductStatus, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (addProductStatus === 'succeeded') {
      setProductData({
        code: '',
        name: '',
        price: '',
        description: '',
        stock: '',
      });
    }
  }, [addProductStatus]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productData);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-md w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-medium'>Add Product</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Code</label>
            <input
              type='text'
              name='code'
              value={productData.code}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <input
              type='text'
              name='name'
              value={productData.name}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Price</label>
            <input
              type='number'
              name='price'
              value={productData.price}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Description
            </label>
            <textarea
              name='description'
              value={productData.description}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Stock</label>
            <input
              type='number'
              name='stock'
              value={productData.stock}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
