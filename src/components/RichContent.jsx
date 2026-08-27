import { useMemo, createElement } from "react";
import { openPdfLinksInNewTab } from "../utils/richContent";

// Drop-in replacement for `<div dangerouslySetInnerHTML={{ __html }} />`
// that makes PDF links inside backend-authored content open in a new tab
// instead of downloading.
const RichContent = ({ html, as = "div", ...rest }) => {
  const processedHtml = useMemo(() => openPdfLinksInNewTab(html), [html]);

  return createElement(as, {
    ...rest,
    dangerouslySetInnerHTML: { __html: processedHtml },
  });
};

export default RichContent;
