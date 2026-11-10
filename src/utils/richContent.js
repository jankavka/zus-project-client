// Backend-authored rich text (TinyMCE) can contain links to uploaded PDFs.
// We want those to open in a new tab as a preview instead of forcing a
// download, so we rewrite matching anchors before rendering.
const PDF_HREF_PATTERN = /\.pdf(?:[?#]|$)/i;

export const openPdfLinksInNewTab = (html) => {
  if (!html) {
    return html;
  }

  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("a[href]").forEach((anchor) => {
    if (PDF_HREF_PATTERN.test(anchor.getAttribute("href"))) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      anchor.removeAttribute("download");
    }
  });

  return doc.body.innerHTML;
};

// Plain-text preview of backend-authored HTML, truncated to `maxLength`
// characters. Truncating the raw HTML string would cut through entities
// (TinyMCE stores "í" as "&iacute;") and tags, so we decode to text first.
const BLOCK_END_PATTERN = /<br\s*\/?>|<\/(?:p|div|li|h[1-6]|tr|td|th|blockquote)>/gi;

export const htmlToPreviewText = (html, maxLength) => {
  if (!html) {
    return "";
  }

  const doc = new DOMParser().parseFromString(
    html.replace(BLOCK_END_PATTERN, "$& "),
    "text/html"
  );
  const text = (doc.body.textContent || "").replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) {
    return text;
  }

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
};
