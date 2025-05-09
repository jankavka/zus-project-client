import { useEffect, useState, useTransition } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import MyEditor from "../../components/MyEditor";

const ArticleForm = () => {
  const editorRef = useRef(null);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      apiGet("/api/articles/" + id).then((data) => setArticle(data));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      apiPut(`/api/articles/edit/${id}`, article).then(() => navigate("/admin/o-skole/aktuality"))
      
    } else {
      apiPost("/api/articles/create", article).then(() => navigate("/admin/o-skole/aktuality"));
      
    }
  };

  return (
    <div className="container-content">
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
        <div>
          {id ? (
            <p>Čas změny: {formatDate(new Date(article.issuedDate))}</p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-info">
          Odeslat
        </button>
        <button className="btn btn-warning ms-2" onClick={handleGoBack}>
          Zpět
        </button>
      </form>
      <p></p>
    </div>
  );
};

export default ArticleForm;
