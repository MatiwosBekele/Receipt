import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from '../../components/user/NavBar';
import Sidebar from '../../components/user/SideBar';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/authSlice';

function LayoutUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logoutHandler = () => {
    setIsModalOpen(false);
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div className='flex flex-col h-screen w-screen overflow-hidden'>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            setIsModalOpen={setIsModalOpen}
          />
          <div className='flex-1 overflow-auto md:ml-60'>{<Outlet />}</div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={logoutHandler}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default LayoutUser;
