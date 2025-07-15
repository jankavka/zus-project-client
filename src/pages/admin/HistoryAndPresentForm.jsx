import { useEffect, useRef, useState } from "react";
import { apiGet,apiPut } from "../../utils/api";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";

const HistoryAndPresentForm = () => {
  const [historyAndPresent, setHistoryAndPresent] = useState({});
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/history-and-present").then((data) =>
      setHistoryAndPresent(data)
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/history-and-present", historyAndPresent).then(
      () =>
        navigate("/admin/o-skole/historie-a-soucasnost").catch((error) =>
          console.log(error)
        )
    );
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Historie a současnost</h5>
      <div className="mb-3">
        <label>Titulek </label>
        <input
          className="form-control"
          type="text"
          value={historyAndPresent.title}
          onChange={(e) => setHistoryAndPresent({...historyAndPresent, title: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label>Obsah</label>
        <MyEditor
          editorRef={editorRef}
          subject={historyAndPresent}
          onChange={() => {
            setHistoryAndPresent({
              ...historyAndPresent,
              content: editorRef.current.getContent(),
            });
          }}
        ></MyEditor>
      </div>
      <div>
      <button className="btn btn-success me-3" onClick={handleSubmit}>Uložit</button>
      <button className="btn btn-info" type="button" onClick={() => navigate(-1)}>Zpět</button>
      </div>
    </div>
  );
};
export default HistoryAndPresentForm;
