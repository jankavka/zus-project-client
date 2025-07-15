import { useEffect, useState, useTransition } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import MyEditor from "../../components/MyEditor";
import { API_URL } from "../../utils/api";

const ArticleForm = () => {
  const editorRef = useRef(null);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    issuedDate: "",
    image: { id: "" },
  });
  const [albumsNames, setAlbumsNames] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id) {
      apiGet("/api/articles/" + id).then((data) => setArticle(data));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      apiPut(`/api/articles/edit/${id}`, article).then(() =>
        navigate("/admin/o-skole/aktuality")
      );
    } else {
      apiPost("/api/articles/create", article).then(() =>
        navigate("/admin/o-skole/aktuality")
      );
    }
  };

  return (
    <div className="container-content">
      {id ? (
        <h5 className="text-uppercase">Upravit článek</h5>
      ) : (
        <h5 className="text-uppercase">Nový článek</h5>
      )}
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
            className="form-control"
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
                    {console.log(images)}
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
                        value={image.id}
                        checked={article.image?.id == image.id}
                        onChange={(e) =>
                          setArticle((prev) => {
                            return {
                              ...prev,
                              image: { id: e.target.value },
                            };
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
                {console.log(article.image)}
                {console.log(images)}
                {console.log(article)}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {id ? (
            <p>Čas změny: {formatDate(new Date(article.issuedDate))}</p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-info">
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
