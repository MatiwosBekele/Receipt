import logo from '../../assets/Logo.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className='bg-white border-b px-2'>
      <div className='flex items-center'>
        <div className='md:hidden block cursor-pointer'>
          {isSidebarOpen ? (
            <IoMdCloseCircleOutline
              className='text-[#979797]'
              size={30}
              onClick={toggleSidebar}
            />
          ) : (
            <FaBars
              className='text-[#979797]'
              size={20}
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div className='mx-2 pt-3'>
          <img src={logo} className='w-16 h-auto' alt='logo' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
