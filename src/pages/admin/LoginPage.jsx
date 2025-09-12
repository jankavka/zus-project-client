import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { useSession } from "../../contexts/session";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../../utils/api";
import { Spinner } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, setSession } = useSession({});
  const [errorState, setErrorState] = useState(false);
  const [errorAdmin, setErrorAdmin] = useState(false);
  const navigate = useNavigate();
  const from = localStorage.getItem("lastAdminPath") || "/admin/uvod/aktuality";
  const [isLoading, setisLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (!session) {
      console.warn("No user logged");
    }
    if (session.status === "authenticated" && session.data) {
      navigate(from);
    }
  }, [session.data, session.status]);

  useEffect(() => {
    if (timerId === null) return;

    return () => clearTimeout(timerId);
  }, [timerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    const timer = setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    setTimerId(timer);
    setisLoading(true);

    const body = { email: email, password: password };

    apiPost("/api/auth", body)
      .then((data) => {
        setSession({ data, status: "authenticated" });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setErrorState(true);
      })
      .finally(() => {
        setisLoading(false);
        clearTimeout(timer);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container-content" style={{ width: "960px" }}>
        <h5 className="text-uppercase">Přihlášení</h5>
        {isLoading ? <Spinner animation="border" /> : null}
        {errorState ? (
          <div className="alert alert-danger">
            Přihlášení se nezdařilo. Zkontrolujte jméno a heslo
          </div>
        ) : null}
        {errorAdmin ? (
          <div className="alert alert-danger">Účet není administrátorský</div>
        ) : null}
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            label="Email:"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <FormInput
            label="Heslo:"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            type="password"
          />
          <div className="d-flex justify-content-between align-items-center">
            <button
              disabled={isSubmitted}
              type="submit"
              className="btn btn-primary mt-3"
            >
              Přihlásit
            </button>
            <Link to={"/admin/registrace"}>Registrovat</Link>
          </div>
        </form>
        <div className="mt-5">
          <Link to={"/"}>Zpět na stránky pro veřejnost</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
