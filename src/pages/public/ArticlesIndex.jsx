import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link } from "react-router-dom";
import LoadingText from "../../components/LoadingText.jsx";
import { API_URL } from "../../utils/api";

const ArticlesIndex = ({ isEditable }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    apiGet("/api/articles").then((data) => setArticles(data));
  }, []);

  const handleDeleteArticle = (id) => {
    let aprove = confirm("Opravdu chcete vymazat tento článek?");
    if (aprove) {
      apiDelete("/api/articles/delete/" + id);
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
      <h5 className="mb-3 text-uppercase">Aktuality</h5>
      {isEditable ? (
        <Link
          className="btn btn-success mb-3"
          to={"/admin/o-skole/aktuality/novy"}
        >
          Vytvořit
        </Link>
      ) : null}
      {articles &&
        articles
          .sort((a, b) => b.id - a.id)
          .map((article) => (
            <div className="mb-5 article-width" key={article.id}>
              {article.image ? (
                <Link
                  to={`${
                    isEditable
                      ? "/admin/uvod/aktuality/" + article.id
                      : "/uvod/aktuality/" + article.id
                  } `}
                >
                  <img
                    src={`${API_URL}${article.image?.url}`}
                    className="picture-width mb-3"
                    /* TODO: responsive css */
                    style={{ maxHeight: "400px", maxWidth: "300px" }}
                  />
                </Link>
              ) : null}
              <h3>
                <Link
                  to={`${
                    isEditable
                      ? "/admin/uvod/aktuality/" + article.id
                      : "/uvod/aktuality/" + article.id
                  }`}
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
