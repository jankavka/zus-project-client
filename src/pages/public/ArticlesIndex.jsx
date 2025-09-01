import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import LoadingText from "../../components/LoadingText.jsx";
import { API_URL } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage.jsx";
import { messages } from "../../components/FlashMessageTexts.js";

const ArticlesIndex = ({ isEditable }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const { editSuccessState } = location.state || false;
  const { createSuccessState } = location.state || false;
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const body = {
      limit: 5,
      page: page,
    };

    apiGet(`/api/articles`, body)
      .then((data) => setArticles(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });

    //tries out if there are articles on the next page
    apiGet(`/api/articles`, { limit: 4, page: page + 1 }).then((data) => {
      if (data.length === 0) {
        setIsDisabled(true);
      } else setIsDisabled(false);
    });
  }, [page]);

  const handleDeleteArticle = (id) => {
    let aprove = confirm("Opravdu chcete vymazat tento článek?");
    if (aprove) {
      apiDelete("/api/articles/delete/" + id);
      setArticles(articles.filter((item) => item.id !== id));
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => {
      if (prev <= 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  };

  if (articles.length === 0) {
    return (
      <div className="container-content">
        <h5 className="mb-5">Aktuality</h5>
        <FlashMessage
          success={false}
          state={loadingErrorState}
          text={messages.dataLoadErr}
        />
        <FlashMessage
          success={true}
          state={editSuccessState}
          text={messages.dataUpdateOk}
        />
        <FlashMessage
          success={true}
          state={createSuccessState}
          text={messages.dataCreateOk}
        />
        <LoadingText />
        <div className="d-flex justify-content-start">
          <button
            onClick={() => handlePrevPage()}
            className="btn btn-light border-dark me-5"
          >
            Předchozí
          </button>
          <button
            onClick={() => handleNextPage()}
            className="btn btn-light border-dark"
          >
            Další
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-content">
      <h5 className="mb-3 text-uppercase">Aktuality</h5>
      <FlashMessage
        success={true}
        state={editSuccessState}
        text={messages.dataUpdateOk}
      />
      <FlashMessage
        success={true}
        state={createSuccessState}
        text={messages.dataCreateOk}
      />
      {isEditable ? (
        <Link
          className="btn btn-success mb-3"
          to={"/admin/o-skole/aktuality/novy"}
        >
          Vytvořit
        </Link>
      ) : null}
      {articles &&
        articles?.map((article) => (
          <div className="mb-5 article-width" key={article.id}>
            {article.imageUrl ? (
              <Link
                to={`${
                  isEditable
                    ? "/admin/uvod/aktuality/" + article.id
                    : "/uvod/aktuality/" + article.id
                } `}
              >
                <img
                  src={`${API_URL}${article.imageUrl}`}
                  className="picture-width mb-3"
                  /* TODO: responsive css */
                  style={{ maxHeight: "400px", maxWidth: "300px" }}
                />
              </Link>
            ) : null}
            <h5>
              <Link
                to={`${
                  isEditable
                    ? "/admin/uvod/aktuality/" + article.id
                    : "/uvod/aktuality/" + article.id
                }`}
                style={{ color: "black" }}
                className="text-uppercase"
              >
                {article.title}
              </Link>
            </h5>
            <p
              dangerouslySetInnerHTML={{
                __html: article.content.substring(0, 250),
              }}
            ></p>

            {isEditable ? (
              <div>
                <Link
                  className="btn btn-warning"
                  to={`/admin/uvod/aktuality/${article.id}/upravit`}
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
      <div className="d-flex justify-content-start">
        <button
          onClick={() => handlePrevPage()}
          className="btn btn-light border-dark me-5"
          disabled={page === 0}
        >
          Předchozí
        </button>
        <button
          onClick={() => handleNextPage()}
          className="btn btn-light border-dark"
          disabled={isDisabled}
        >
          Další
        </button>
      </div>
    </div>
  );
};

export default ArticlesIndex;
