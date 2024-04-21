import { Navigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext'; // Adjust the import path as necessary

function ProtectedRoute({ children }: { children: React.ReactNode }) {
 const { isAuthenticated } = useAuth();

 return isAuthenticated ? children : <Navigate to="/auth/signin" />;
}

export default ProtectedRoute;