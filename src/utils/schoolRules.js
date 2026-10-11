// The school rules ("Školní řád") are a single PDF. Its URL is stored in the
// `content` field of the /api/static/school-rules entry. Older entries hold
// editor HTML with a link to the PDF instead, so fall back to the first
// <a href> found in that HTML.
export const getSchoolRulesPdfUrl = (content) => {
  const value = (content || "").trim();
  if (!value) return "";

  let href = value;
  if (value.startsWith("<")) {
    const doc = new DOMParser().parseFromString(value, "text/html");
    href = doc.querySelector("a[href]")?.getAttribute("href")?.trim() || "";
    if (!href) return "";
  }

  if (/^https?:\/\//i.test(href)) return href;
  // Editor links are relative ("../api/files/x.pdf"); make them root-relative
  // so they work from any page.
  return "/" + href.replace(/^(\.{1,2}\/)+/, "").replace(/^\/+/, "");
};
