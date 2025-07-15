import { useSession } from "../../contexts/session";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  if (!session.data) {
    return <Navigate to="/admin/login" />;
  }

  if (session.data.status === "unauthorized") {
    return <Navigate to="/admin/login" />;
  }

  if (!session.data.isAdmin) {
    console.log("not admin");
    return <Navigate to="/admin/no-admin" state={{ errorAdmin: true }} />;
  }

  return children;
};

export default AdminRoute;
