import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import LoadingText from "../../components/LoadingText.jsx";

const ArticlesIndex = ({ isEditable }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    apiGet("/api/articles").then((data) => setArticles(data));
  }, []);

  const handleDeleteArticle = (id) => {
    let aprove = confirm("Opravdu chcete vymazat tento článek?");
    if (aprove) {
      apiDelete("/api/articles/delete/" + id);
      navigate("/admin/o-skole/aktuality");
      setArticles(articles.filter((item) => item.id !== id));
    }
    
  };

  if (articles.length === 0) {
    return (
      <div className="container-content">
        <h1 className="mb-5">Aktuality</h1>
        <LoadingText />
      </div>
    );
  }

  //špatné pořadí článků
  return (
    <div className="container-content">
      <h1 className="mb-3">Aktuality</h1>
      {isEditable ? (
        <Link
          className="btn btn-success mb-3"
          to={"/admin/o-skole/aktuality/novy"}
        >
          Vytvořit
        </Link>
      ) : null}
      {articles
        .sort((a, b) => b.id - a.id)
        .map((article) => (
          <div className="mb-5" key={article.id} style={{ maxWidth: "800px" }}>
            <Link to={`/o-skole/aktuality/${article.id}`}>
              <img src="/src/images/vzor.jpg" className="picture-width mb-3" />
            </Link>
            <h3>
              <Link
                to={`/o-skole/aktuality/${article.id}`}
                style={{ color: "black" }}
              >
                {article.title}
              </Link>
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: article.content.substring(0, 250),
              }}
            ></p>

            {isEditable ? (
              <div>
                <Link
                  className="btn btn-warning"
                  to={`/admin/o-skole/aktuality/${article.id}/upravit`}
                >
                  Upravit
                </Link>
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => handleDeleteArticle(article.id)}
                >
                  Vymazat
                </button>
              </div>
            ) : null}
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ArticlesIndex;
