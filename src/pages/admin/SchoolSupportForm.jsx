import { useEffect, useRef, useState } from "react";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import { apiPut, apiGet } from "../../utils/api";

const SchoolSupportForm = () => {
  const [schoolSupport, setSchoolSupport] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/school-support")
      ?.then((data) => setSchoolSupport(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/school-support", schoolSupport)
      .catch((error) => console.log(error))
      .then(() => navigate("/admin/podpora-skoly"));
  };

  console.log(schoolSupport)

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Podpora školy</h5>
      <div className="mb-3">
        <label>Titulek </label>
        <input
          className="form-control"
          type="text"
          value={schoolSupport?.title || " "}
          onChange={(e) =>
            setSchoolSupport({
              ...schoolSupport,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-3">
        <label>Obsah</label>
        <MyEditor
          editorRef={editorRef}
          subject={schoolSupport}
          onChange={() => {
            setSchoolSupport({
              ...schoolSupport,
              content: editorRef?.current.getContent(),
            });
          }}
        ></MyEditor>
      </div>
      <div>
        <button className="btn btn-success me-3" onClick={(e) => handleSubmit(e)}>
          Uložit
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => navigate(-1)}
        >
          Zpět
        </button>
      </div>
    </div>
  );
};

export default SchoolSupportForm;
