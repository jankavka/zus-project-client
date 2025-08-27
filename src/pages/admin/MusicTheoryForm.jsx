import { useEffect, useState, useRef } from "react";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import formatDate from "../../components/formatDate";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const MusicTheoryForm = () => {
  const [musicTheory, setMusicTheory] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [savingErrorState, setSavingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/music-theory")
      .then((data) => {
        setMusicTheory(data);
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
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
      .then(() =>
        navigate("/admin/pro-rodice-a-zaky/hudebni-nauka", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setSavingErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Hudební Nauka</h5>
      <FlashMessage
        success={false}
        state={savingErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <p>
        Poslední aktualizace: {formatDate(new Date(musicTheory.issuedDate))}
      </p>
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
        <button className="btn btn-success mt-3" type="submit">
          Uložit
        </button>
      </form>
    </div>
  );
};

export default MusicTheoryForm;
