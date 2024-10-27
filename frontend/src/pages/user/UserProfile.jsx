import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../state/userSlice';
import { registerUser } from '../../state/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, updateUserStatus, loading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    tinNumber: '',
    shopName: '',
    telephone: '',
    shopAddress: {
      subCity: '',
      woreda: '',
      streetName: '',
      houseNumber: '',
    },
    username: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        tinNumber: user.tinNumber || '',
        shopName: user.shopName || '',
        telephone: user.telephone || '',
        shopAddress: {
          subCity: user.shopAddress?.subCity || '',
          woreda: user.shopAddress?.woreda || '',
          streetName: user.shopAddress?.streetName || '',
          houseNumber: user.shopAddress?.houseNumber || '',
        },
        username: user.username || '',
        password: '', // Do not auto-fill password for security reasons
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const [addressField] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        shopAddress: {
          ...prevData.shopAddress,
          [addressField]: value,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className='font-poppins max-w-4xl mx-auto p-6 bg-slate-100 rounded-lg border border-yellow-400 mt-2 shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>User Profile</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label
              htmlFor='firstName'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='middleName'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Middle Name
            </label>
            <input
              type='text'
              id='middleName'
              name='middleName'
              value={formData.middleName}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='lastName'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='tinNumber'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              TIN Number
            </label>
            <input
              type='text'
              id='tinNumber'
              name='tinNumber'
              value={formData.tinNumber}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='shopName'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Shop Name
            </label>
            <input
              type='text'
              id='shopName'
              name='shopName'
              value={formData.shopName}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='shopAddress.subCity'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Sub City
            </label>
            <input
              type='text'
              id='shopAddress.subCity'
              name='subCity'
              value={formData.shopAddress.subCity}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='shopAddress.woreda'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Woreda
            </label>
            <input
              type='text'
              id='shopAddress.woreda'
              name='woreda'
              value={formData.shopAddress.woreda}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='telephone'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Telephone
            </label>
            <input
              type='tel'
              id='telephone'
              name='telephone'
              value={formData.telephone}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='shopAddress.streetName'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Street Name
            </label>
            <input
              type='text'
              id='shopAddress.streetName'
              name='streetName'
              value={formData.shopAddress.streetName}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='shopAddress.houseNumber'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              House Number
            </label>
            <input
              type='text'
              id='shopAddress.houseNumber'
              name='houseNumber'
              value={formData.shopAddress.houseNumber}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='username'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='password'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Password
            </label>
            <input
              placeholder='Enter new password here if needed'
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <button
          type='submit'
          className='mt-4 bg-yellow-400 text-xl text-black font-medium hover:bg-yellow-300 w-full rounded-md px-4 py-2'
          disabled={loading}
        >
          {loading ? 'Submitting....' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
