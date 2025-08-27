import { useEffect, useRef, useState } from "react";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import formatDate from "../../components/formatDate";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const GroupTrainingScheduleForm = () => {
  const [groupTrainingSchedule, setGroupTrainingSchedule] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [errorDataState, setErrorDataState] = useState(false);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/group-training-schedule")
      .then((data) => setGroupTrainingSchedule(data))
      .catch((error) => {
        setErrorDataState(true);
        console.error(error);
      });
  }, []);

  const handleChangeInput = (e) => {
    setGroupTrainingSchedule({
      ...groupTrainingSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/group-training-schedule", groupTrainingSchedule)
      .then(() =>
        navigate("/admin/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Rozvrh klolektivní výuky</h5>
      <FlashMessage
        success={false}
        state={errorDataState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={false}
        state={errorState}
        text={messages.dataSaveErr}
      />
      <p>
        Poslední aktualiuace:{" "}
        {formatDate(new Date(groupTrainingSchedule.issuedDate))}
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Titulek"
          name="title"
          value={groupTrainingSchedule.title}
          onChange={handleChangeInput}
        />
        <MyEditor
          editorRef={editorRef}
          subject={groupTrainingSchedule}
          onChange={() =>
            setGroupTrainingSchedule({
              ...groupTrainingSchedule,
              content: editorRef.current.getContent(),
            })
          }
        ></MyEditor>
        <button type="submit" className="btn btn-success mt-3">
          Uložit
        </button>
      </form>
    </div>
  );
};

export default GroupTrainingScheduleForm;
