import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white/50 backdrop-blur-3xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-navy text-sm font-bold animate-pulse uppercase tracking-widest">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const adminRoles = ['admin', 'sub-admin', 'judge'];
  if (requireAdmin && !adminRoles.includes(user?.role?.toLowerCase() ?? '')) {
    // Not an admin, redirect to home or access denied
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
