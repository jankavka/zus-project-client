import { useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { apiDelete } from "../../utils/api";

const NoAdmin = () => {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await apiDelete("/api/auth");
    setSession({ data: null, status: "unauthorized" });
    navigate("/admin/login");
  };
  
  return (
    <div className="d-flex justify-content-center">
      <div className="container-content" style={{width: "960px"}}>
        <div>
          <strong>Přihlášený uživatel není administrátorem</strong>
        </div>
        <button className="btn btn-light" onClick={handleLogoutClick}>
          Odhlásit
        </button>
      </div>
    </div>
  );
};

export default NoAdmin;
