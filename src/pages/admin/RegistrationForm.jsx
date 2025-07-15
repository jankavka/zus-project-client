import FormInput from "../../components/FormInput";
import { apiPost } from "../../utils/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [someError, setSomeError] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      navigate("/admin/login", {
        state: { registrationState: "Registrace proběhla úspěšně" },
      });
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordOne === passwordTwo) {
      const body = { email: email, password: passwordTwo };
      apiPost("/api/user", body)
        .then(() => setSuccess(true))
        .catch((error) => {
          setSomeError(true);
          console.log(error);
        });
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container-content" style={{ width: "960px" }}>
        <h5 className="text-uppercase">Registrace</h5>
        {passwordError ? (
          <div className="alert alert-danger">Hesla se neshodují</div>
        ) : null}
        {someError ? (
          <div className="alert alert-danger">
            Minimální délka hesla je 6 znaků
          </div>
        ) : null}
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <FormInput
            label="Heslo"
            name="passwordOne"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
            type="password"
          />
          <FormInput
            label="Potvrďte heslo"
            name="passwordTwo"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            type="password"
          />
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-success">Registrovat</button>
            <Link to="/admin/login">Zpět na přihlášení</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
