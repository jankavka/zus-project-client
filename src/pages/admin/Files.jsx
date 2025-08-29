import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL, apiDelete, apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const Files = () => {
  const [filesInfo, setFilesInfo] = useState([]);
  const location = useLocation();
  const { successState } = location.state || false;
  const [successCopyState, setSuccessCopyState] = useState(false);
  const [errorCopyState, setErrorCopyState] = useState(false);
  const [deleteSuccessState, setDeleteSuccessState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  console.log(filesInfo);

  useEffect(() => {
    apiGet("/api/files")
      .then((data) => setFilesInfo(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setSuccessCopyState(true))
      .catch(() => setErrorCopyState(true));
  };

  const deleteFile = (id) => {
    const name = filesInfo.find((file) => {
      if (file.id === id) {
        return file;
      }
    }).fileName;

    const aprove = confirm(`Opravdu chcete vymazat soubor ${name}`);

    if (aprove) {
      apiDelete(`/api/files/${id}`)
        .then(() => {
          setDeleteSuccessState(true);
          setFilesInfo((prev) => prev.filter((file) => file.id !== id));
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error("Error: " + error);
        });
    }
  };

  return (
    <div className="container-content">
      <h5>Soubory</h5>
      <FlashMessage
        success={true}
        state={successState}
        text={messages.fileCreateOk}
      />
      <FlashMessage
        success={true}
        state={successCopyState}
        text={"Odkaz zkopírován"}
      />
      <FlashMessage
        success={false}
        state={errorCopyState}
        text={"Odkaz se nepodařilo zkopírovat"}
      />
      <FlashMessage
        success={true}
        state={deleteSuccessState}
        text={messages.fileDeleteOk}
      />
      <FlashMessage
        success={false}
        state={deleteErrorState}
        text={messages.fileDeleteErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />

      <Link className="btn btn-success" to={"/admin/galerie/soubory/novy"}>
        Nový soubor
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr className="text-start">
              <th>Jméno</th>
              <th>Odkaz</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {filesInfo &&
              filesInfo.map((file, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link
                      onClick={() => window.open(API_URL + file.url, "_blank")}
                    >
                      {file.fileName}
                    </Link>
                  </td>
                  <td className="text-start">
                    <button
                      className="btn btn-light"
                      onClick={() => copyText(API_URL + file.url)}
                    >
                      Zkopírovat odkaz
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="btn btn-danger"
                    >
                      Vymazat
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Files;
