import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/api";

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    apiGet("/api/articles/" + id).then((data) => setArticle(data));
  }, []);

  console.log(article);

  return (
    <div className="container-content">
      <h5 className="mb-3 text-uppercase">{article.title}</h5>
      <img
        className="mb-3"
        src={`${API_URL}${article.image?.url}`}
        alt=""
        style={{ maxHeight: "400px", maxWidth: "300px" }}
      />
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

      <Link onClick={handleBack}>Zpět</Link>
    </div>
  );
};

export default ArticleDetail;
