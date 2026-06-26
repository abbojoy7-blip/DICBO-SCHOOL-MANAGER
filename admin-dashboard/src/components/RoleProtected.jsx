import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../pages/AccessDenied';

export default function RoleProtected({ children, roles = [] }){
  const { user } = useAuth();
  if(!user) return <Navigate to="/login" replace />;
  if(roles.length > 0 && !roles.includes(user.role)){
    return <AccessDenied />;
  }
  return children;
}
