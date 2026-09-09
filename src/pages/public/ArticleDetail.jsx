import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import RichContent from "../../components/RichContent";

// Pull every <img> src out of the backend-authored rich text so the images
// embedded in an article body can be opened in the lightbox too.
const extractContentImages = (html) => {
  if (!html) {
    return [];
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return [...doc.querySelectorAll("img[src]")].map((img) =>
    img.getAttribute("src")
  );
};

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
  const headerImageSrc = article.imageUrl
    ? `${API_URL}${article.imageUrl}`
    : null;
  const slides = useMemo(
    () =>
      [headerImageSrc, ...contentImages]
        .filter(Boolean)
        .map((src) => ({ src })),
    [headerImageSrc, contentImages]
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
    openAt((headerImageSrc ? 1 : 0) + position);
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
    </div>
  );
};

export default ArticleDetail;
