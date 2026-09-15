import { Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import RichContent from "../../components/RichContent";
import { getArticleCoverImageSrc } from "../../utils/articleImage";

const ArticleCard = ({ article }) => {
  const coverImageSrc = getArticleCoverImageSrc(article, API_URL);
  return (
    <Link to={`/uvod/aktuality/${article.id}`} className="article-card">
      <h5 className="article-card-title text-uppercase">{article.title}</h5>
      {coverImageSrc ? (
        <img
          src={coverImageSrc}
          className="article-card-img mb-3"
          alt={article.title}
        />
      ) : null}
      <RichContent
        as="p"
        className="article-card-text"
        html={article.content.substring(0, 200) + "..."}
      />
    </Link>
  );
};

export default ArticleCard;
