// Copy text to the clipboard with a fallback for non-secure contexts.
//
// `navigator.clipboard` only exists in a secure context (HTTPS or localhost).
// The production admin is currently served over plain HTTP on an IP address,
// where `navigator.clipboard` is `undefined` and calling `.writeText()` throws
// synchronously. This helper uses the async Clipboard API when it's available
// and otherwise falls back to a hidden <textarea> + `document.execCommand("copy")`.
//
// Returns a promise so existing `.then()/.catch()` call sites keep working.
export const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Keep it out of view and out of the layout / scroll position.
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, text.length);

      const ok = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (ok) {
        resolve();
      } else {
        reject(new Error("execCommand('copy') failed"));
      }
    } catch (error) {
      reject(error);
    }
  });
};
