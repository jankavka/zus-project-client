import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { useSession } from "../../contexts/session";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, setSession } = useSession({});
  const [errorState, setErrorState] = useState(false);
  const [errorAdmin, setErrorAdmin] = useState(false);
  const navigate = useNavigate();
  const from = localStorage.getItem("lastAdminPath") || "/admin/uvod/aktuality"

  useEffect(() => {
    console.log("Session changed:", session);
    if (!session) {
      console.warn("No user logged");
    }
    if (session.status === "authenticated" && session.data) {
      navigate(from)
    }
  }, [session.data, session.status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { email: email, password: password };
    console.log(body);

    apiPost("/api/auth", body)
      .then((data) => {
        setSession({ data, status: "authenticated" });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setErrorState(true);
      });
  };

  console.log(session);

  return (
    <div className="d-flex justify-content-center">
      <div className="container-content" style={{ width: "960px" }}>
        <h5 className="text-uppercase">Přihlášení</h5>
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
            <button className="btn btn-primary mt-3">Přihlásit</button>
            <Link to={"/admin/registrace"}>Registrovat</Link>
          </div>
        </form>
        <div className="mt-5">
          <Link  to={"/"}>
            Zpět na stránky pro veřejnost
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
