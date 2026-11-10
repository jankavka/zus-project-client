import { Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import { htmlToPreviewText } from "../../utils/richContent";
import {
  getArticleCoverImageSrc,
  getArticleCoverImageStyle,
} from "../../utils/articleImage";

const ArticleCard = ({ article }) => {
  const coverImageSrc = getArticleCoverImageSrc(article, API_URL);
  return (
    <Link to={`/uvod/aktuality/${article.id}`} className="article-card">
      <h5 className="article-card-title text-uppercase">{article.title}</h5>
      {coverImageSrc ? (
        <img
          src={coverImageSrc}
          className="article-card-img mb-3"
          style={getArticleCoverImageStyle(article)}
          alt={article.title}
        />
      ) : null}
      <p className="article-card-text">
        {htmlToPreviewText(article.content, 200)}
      </p>
    </Link>
  );
};

export default ArticleCard;
