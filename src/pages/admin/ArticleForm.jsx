import { useEffect, useState, useTransition } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import MyEditor from "../../components/MyEditor";
import { API_URL } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import { Spinner } from "react-bootstrap";

const ArticleForm = () => {
  const editorRef = useRef(null);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    issuedDate: "",
    imageUrl: "",
  });
  const [albumsNames, setAlbumsNames] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);
  const [errorState, setErrorState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (id) {
      apiGet("/api/articles/" + id).then((data) => {
        setArticle(data);
      });
    }
    apiGet("/api/photos/all-albums-names").then((data) => setAlbumsNames(data));
  }, []);

  useEffect(() => {
    albumName
      ? apiGet(`/api/photos/get-images/${albumName}`).then((data) =>
          setImages(data)
        )
      : null;
  }, [albumName]);

  useEffect(() => {
    if (timerId === null) return;
    return () => clearTimeout(timerId);
  }, [timerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsLoading(true);
    setIsSubmitted(true);
    const timer = setTimeout(() => isSubmitted(false), 3000);
    setTimerId(timer);
    if (id) {
      apiPut(`/api/articles/edit/${id}`, article)
        .then(() =>
          navigate("/admin/uvod/aktuality", {
            state: { editSuccessState: true },
          })
        )
        .catch((error) => {
          setErrorState(error.message);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
          clearTimeout(timer);
        });
    } else {
      apiPost("/api/articles/create", article)
        .then(() =>
          navigate("/admin/uvod/aktuality", {
            state: { createSuccessState: true },
          })
        )
        .catch((error) => {
          setErrorState(error.message);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
          clearTimeout(timer);
        });
    }
  };

  return (
    <div className="container-content">
      {id ? (
        <h5 className="text-uppercase">Upravit článek</h5>
      ) : (
        <h5 className="text-uppercase">Nový článek</h5>
      )}
      <FlashMessage
        success={false}
        state={errorState}
        text={`${messages.dataCreateErr} Máte vyplněna všechna pole?`}
      />
      {isLoading ? <Spinner animation="border" /> : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titulek</label>
          <input
            className="form-control"
            value={article.title}
            onChange={(e) => {
              setArticle({ ...article, title: e.target.value });
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label>Obsah</label>
          <MyEditor
            editorRef={editorRef}
            subject={article}
            onChange={() =>
              setArticle({
                ...article,
                content: editorRef.current.getContent(),
              })
            }
          ></MyEditor>
        </div>
        <div className="mb-3">
          <label>Přiřaďte album</label>
          <select
            value={albumName}
            name=""
            id=""
            className="form-select"
            onChange={(e) => setAlbumName(e.target.value)}
          >
            <option value={""} disabled>
              Vyberte album
            </option>
            {albumsNames.map((albumName, index) => (
              <option value={albumName} key={index}>
                {albumName}
              </option>
            ))}
          </select>
        </div>
        <div>
          {images.length !== 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Fotka</th>
                  <th>Titulní</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        src={`${API_URL}${image.url}`}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        className="form-check-input"
                        value={image.url}
                        checked={article.imageUrl == image.url}
                        onChange={(e) =>
                          setArticle((prev) => {
                            return {
                              ...prev,
                              imageUrl: e.target.value,
                            };
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {id ? (
            <p>Čas změny: {formatDate(new Date(article.issuedDate))}</p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-info" disabled={isSubmitted}>
          Odeslat
        </button>
        <button
          type="button"
          className="btn btn-warning ms-2"
          onClick={() => navigate(-1)}
        >
          Zpět
        </button>
      </form>
      <p></p>
    </div>
  );
};

export default ArticleForm;
