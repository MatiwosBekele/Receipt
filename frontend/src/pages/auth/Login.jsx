import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loginUser } from '../../state/authSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, loginError } = useSelector((state) => state.userAuth);
  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { username: email, password };
    dispatch(loginUser(userData));
    console.log('error', { loginError });
  };
  console.log(data);
  useEffect(() => {
    if (data?.message === 'success') {
      navigate('/shop/dashboard');
    }
  }, [data]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-black font-poppins'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <div className='flex justify-center items-center'>
          <img src={logo} alt='Logo' className='w-32 h-auto' />
        </div>
        <form onSubmit={handleLogin} className='mt-6'>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
              placeholder='Your user name'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            disabled={loading}
          >
            {loading ? 'Logging in....' : 'Login'}
          </button>
          {data?.message && (
            <p className='text-red-500 text-sm mt-2 text-center'>
              {data.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
