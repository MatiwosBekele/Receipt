import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className='bg-white dark:bg-gray-900'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#F9BD08]'>
              404
            </h1>
            <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
              Something is missing.
            </p>
            <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
              Sorry, we can not find that page. You will find lots to explore on
              the home page.
            </p>
            <button
              onClick={() => navigate(-1)}
              className='inline-flex text-white focus:ring-4 focus:outline-none bg-[#F9BD08] font-medium rounded-lg text-lg px-5 py-2.5 text-center my-4'
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound404;
