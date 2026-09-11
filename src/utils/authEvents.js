// Tiny pub/sub so the fetch wrappers in api.jsx (no React context there)
// can notify the session context when the backend suddenly stops
// recognizing the current session (401/403), e.g. after a backend
// redeploy that invalidates in-memory sessions.
const listeners = new Set();

export const onAuthExpired = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const emitAuthExpired = () => {
  listeners.forEach((callback) => callback());
};
