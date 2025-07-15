import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";

const SchoolFeeForm = () => {
  const [schoolFee, setSchoolFee] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/school-fee").then((data) => setSchoolFee(data));
  }, []);

  const handleInputChange = (e) => {
    setSchoolFee({
      ...schoolFee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/school-fee", schoolFee)
      .catch((error) => console.log(error))
      .then(() => navigate("/admin/pro-rodice-a-zaky/skolne"));
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školné</h5>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Titulek"}
          name={"title"}
          value={schoolFee.title}
          onChange={handleInputChange}
        />
        <MyEditor
          subject={schoolFee}
          editorRef={editorRef}
          onChange={() => {
            setSchoolFee({
              ...schoolFee,
              content: editorRef.current.getContent(),
            });
          }}
        />
        <button type="submit" className="btn btn-success mt-3">
          Uložit
        </button>
      </form>
    </div>
  );
};

export default SchoolFeeForm;
