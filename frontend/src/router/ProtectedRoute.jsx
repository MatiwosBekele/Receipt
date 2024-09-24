import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  let userRole;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }
  // const token = 'test';
  // const userRole = 'user';

  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
