import { useEffect, useState, useRef } from "react";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import formatDate from "../../components/formatDate";

const MusicTheoryForm = () => {
  const [musicTheory, setMusicTheory] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/music-theory").then((data) => {
      setMusicTheory(data);
    });
  }, []);

  const handleChange = (e) => {
    setMusicTheory({
      ...musicTheory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/music-theory", musicTheory)
      .catch((error) => console.log(error))
      .then(() => navigate("/admin/pro-rodice-a-zaky/hudebni-nauka"));
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Hudební Nauka</h5>
      <p>Poslední aktualizace: {formatDate(new Date(musicTheory.issuedDate))}</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Titulek"
          name="title"
          value={musicTheory.title}
          onChange={handleChange}
        />
        <MyEditor
          subject={musicTheory}
          editorRef={editorRef}
          onChange={() =>
            setMusicTheory({
              ...musicTheory,
              content: editorRef.current.getContent(),
            })
          }
        />
        <button className="btn btn-success mt-3" type="submit">Uložit</button>
      </form>
    </div>
  );
};

export default MusicTheoryForm;
