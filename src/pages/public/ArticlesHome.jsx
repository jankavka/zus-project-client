import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage.jsx";
import { messages } from "../../components/FlashMessageTexts.js";
import LoadingText from "../../components/LoadingText.jsx";
import ArticleCard from "./ArticleCard";

const ArticlesHome = () => {
  const [articles, setArticles] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    apiGet(`/api/articles`, { limit: 4, page: 0 })
      .then((data) => setArticles(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-articles">
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      {articles.length === 0 ? (
        <LoadingText />
      ) : (
        <div className="row g-4 mb-4">
          {articles.map((article) => (
            <div className="col-md-6" key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
      <Link
        to={"/uvod/vsechny-aktuality"}
        className="btn btn-light border-dark"
      >
        Všechny aktuality
      </Link>
    </div>
  );
};

export default ArticlesHome;
