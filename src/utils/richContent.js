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
