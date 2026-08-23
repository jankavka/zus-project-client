import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage.jsx";
import { messages } from "../../components/FlashMessageTexts.js";
import LoadingText from "../../components/LoadingText.jsx";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
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

  return (
    <div className="container-articles">
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      {articles.length === 0 ? <LoadingText /> : null}
      {articles.length === 0 ? null : (
        <div className="row g-4 mb-4">
          {articles.map((article) => (
            <div className="col-md-6" key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
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

export default AllArticles;
