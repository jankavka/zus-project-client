import { useMemo, createElement } from "react";
import { openPdfLinksInNewTab } from "../utils/richContent";

// Drop-in replacement for `<div dangerouslySetInnerHTML={{ __html }} />`
// that makes PDF links inside backend-authored content open in a new tab
// instead of downloading.
const RichContent = ({ html, as = "div", className, ...rest }) => {
  const processedHtml = useMemo(() => openPdfLinksInNewTab(html), [html]);

  return createElement(as, {
    ...rest,
    className: ["rich-content", className].filter(Boolean).join(" "),
    dangerouslySetInnerHTML: { __html: processedHtml },
  });
};

export default RichContent;
