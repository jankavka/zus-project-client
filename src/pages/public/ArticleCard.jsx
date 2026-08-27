import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import RichContent from "../../components/RichContent";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/uvod/aktuality/${article.id}`} className="article-card">
      <h5 className="article-card-title text-uppercase">{article.title}</h5>
      {article.imageUrl ? (
        <img
          src={`${API_URL}${article.imageUrl}`}
          className="article-card-img mb-3"
          alt={article.title}
        />
      ) : null}
      <RichContent
        as="p"
        className="article-card-text"
        html={article.content.substring(0, 200)}
      />
    </Link>
  );
};

export default ArticleCard;
