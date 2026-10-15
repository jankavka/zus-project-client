// Pull every <img> src out of a backend-authored rich text body.
export const extractContentImages = (html) => {
  if (!html) {
    return [];
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return [...doc.querySelectorAll("img[src]")].map((img) =>
    img.getAttribute("src"),
  );
};

// The article's cover photo: the explicitly chosen imageUrl, or (when that's
// unset) the first image embedded in the article body. Content image srcs
// are already usable as-is (unlike imageUrl, they aren't API_URL-relative).
export const getArticleCoverImageSrc = (article, apiUrl) => {
  if (article.imageUrl) {
    return `${apiUrl}${article.imageUrl}`;
  }
  return extractContentImages(article.content)[0] || null;
};

// object-position for the cover photo. Only an explicitly chosen imageUrl
// carries an admin-set focal point; the body-image fallback stays centred.
export const getArticleCoverImageStyle = (article) =>
  article.imageUrl && article.imagePosition
    ? { objectPosition: article.imagePosition }
    : undefined;
