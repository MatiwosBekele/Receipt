import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditProductModal = ({ isOpen, onClose, productData, onSubmit }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const { loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (productData) {
      setFormData({
        code: productData.code,
        name: productData.name,
        price: productData.price,
        description: productData.description,
        stock: productData.stock,
      });
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: productData._id }); // Submit the updated product data
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-medium mb-4'>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Code</label>
            <input
              type='text'
              name='code'
              value={formData.code}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Price</label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>
              Description
            </label>
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Stock</label>
            <input
              type='number'
              name='stock'
              value={formData.stock}
              onChange={handleInputChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'Editing...' : 'Done'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
