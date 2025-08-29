import { useSession } from "../../contexts/session";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { session } = useSession();

  if (!session.data) {
    return <Navigate to="/admin/login" />;
  }

  if (session.status === "loading") {
    return null;
  }

  if (!session.data.isAdmin) {
    console.warn("not admin"); 
    return <Navigate to={`/admin/no-admin`} state={{ errorAdmin: true }} />;
  }

  return children;
};

export default AdminRoute;
