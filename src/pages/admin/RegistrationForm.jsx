import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import FormInput from "../../components/FormInput";
import { apiPost } from "../../utils/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [someError, setSomeError] = useState(false);

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
      if (passwordOne.length < 6) {
        setSizeError(true);
        console.error("Error: Minimální délka hesla je 6 znaků  ");
      } else {
        const body = { email: email, password: passwordTwo };
        apiPost("/api/user", body)
          .then(() => setSuccess(true))
          .catch((error) => {
            setSomeError(true);
            console.error("Unexpected error: " + error);
          });
      }
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container-content" style={{ width: "960px" }}>
        <h5 className="text-uppercase">Registrace</h5>
        <FlashMessage
          success={false}
          state={passwordError}
          text={`${messages.loginErr}. Hesla se neshodují`}
        />
        <FlashMessage
          success={false}
          state={sizeError}
          text={`${messages.loginErr}. Minimální délka hesla je 6 znaků `}
        />
        <FlashMessage
          success={false}
          state={someError}
          text={"Neočekávaná chyba"}
        />
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
