import { Routes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';
import NotFound404 from '../components/shared/NotFound';
import LayoutUser from '../pages/user/LayoutUser';
import DashBoard from '../pages/user/DashBoard';
import ProtectedRoute from './ProtectedRoute';
import CheckOut from '../pages/user/CheckOut';
import UserProfile from '../pages/user/UserProfile';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route
        path='/shop/*'
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <LayoutUser />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<DashBoard />} />
        <Route path='checkout' element={<CheckOut />} />
        <Route path='profile' element={<UserProfile />} />
      </Route>

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
}
