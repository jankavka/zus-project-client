import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const ArticleDetail = ({ isAdmin }) => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const [loadinErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/articles/" + id)
      .then((data) => setArticle(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="mb-3 text-uppercase">{article.title}</h5>
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      <img
        className="mb-3"
        src={`${API_URL}${article.imageUrl}`}
        alt=""
        style={{ maxHeight: "400px", maxWidth: "300px" }}
      />
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

      <Link to={`${isAdmin ? "/admin/uvod/aktuality" : "/uvod/aktuality"}`}>
        Zpět na aktuality
      </Link>
    </div>
  );
};

export default ArticleDetail;
