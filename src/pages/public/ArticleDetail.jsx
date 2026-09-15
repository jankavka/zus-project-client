import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import RichContent from "../../components/RichContent";
import { extractContentImages } from "../../utils/articleImage";

const ArticleDetail = ({ isAdmin }) => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const [loadinErrorState, setLoadingErrorState] = useState(false);
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    apiGet("/api/articles/" + id)
      .then((data) => setArticle(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  // Ordered list of image srcs: the header image first, then the ones
  // embedded in the article body. `contentImages` keeps the raw srcs so a
  // clicked body image can be matched back to its slide.
  const contentImages = useMemo(
    () => extractContentImages(article.content),
    [article.content]
  );
  // No explicit cover photo set: fall back to the first image embedded in
  // the article body instead.
  const headerImageSrc = article.imageUrl
    ? `${API_URL}${article.imageUrl}`
    : contentImages[0] || null;
  // When the header image is just the first content image reused as the
  // cover, don't list it twice in the lightbox.
  const isHeaderFromContent = !article.imageUrl && Boolean(headerImageSrc);
  const slides = useMemo(
    () =>
      [
        headerImageSrc,
        ...(isHeaderFromContent ? contentImages.slice(1) : contentImages),
      ]
        .filter(Boolean)
        .map((src) => ({ src })),
    [headerImageSrc, contentImages, isHeaderFromContent]
  );

  const openAt = (index) => {
    setSlideIndex(index);
    setOpen(true);
  };

  const handleContentClick = (event) => {
    if (event.target.tagName !== "IMG") {
      return;
    }
    const src = event.target.getAttribute("src");
    const position = contentImages.indexOf(src);
    if (position === -1) {
      return;
    }
    const offset = isHeaderFromContent ? 0 : headerImageSrc ? 1 : 0;
    openAt(offset + position);
  };

  return (
    <div className="container-content">
      <h5 className="mb-3 text-uppercase">{article.title}</h5>
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      {headerImageSrc && (
        <img
          className="mb-3 article-detail-image"
          src={headerImageSrc}
          alt=""
          style={{ maxHeight: "400px", maxWidth: "300px", cursor: "pointer" }}
          onClick={() => openAt(0)}
        />
      )}
      <RichContent
        className="article-detail-content"
        html={article.content}
        onClick={handleContentClick}
      />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={slideIndex}
      />

      <Link
        to={`${isAdmin ? "/admin/uvod/aktuality" : "/uvod/aktuality"}`}
        className="btn btn-light border-dark mt-3"
      >
        Zpět na aktuality
      </Link>
      {isAdmin && (
        <Link
          to={`/admin/uvod/aktuality/${id}/upravit`}
          className="btn btn-warning mt-3 ms-2"
        >
          Upravit článek
        </Link>
      )}
    </div>
  );
};

export default ArticleDetail;
