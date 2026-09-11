import { createContext, useContext, useEffect, useRef, useState } from "react";
import { apiGet } from "../utils/api";
import { onAuthExpired } from "../utils/authEvents";

const SessionContext = createContext({
  session: { data: null, status: "loading" },
  setSession: () => {},
});

//wrapper for useContext(), every component can rean context importing and calling this
export function useSession() {
  return useContext(SessionContext);
}

//provides Session for all children components
export const SessionProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState({
    data: null,
    status: "loading",
  });

  const sessionStateRef = useRef(sessionState);
  useEffect(() => {
    sessionStateRef.current = sessionState;
  }, [sessionState]);

  useEffect(() => {
    apiGet("/api/auth")
      .then((data) => setSessionState({ data, status: "authenticated" }))
      .catch(() => setSessionState({ data: null, status: "unauthenticated" }));
  }, []);

  useEffect(() => {
    // A 401/403 on any admin request while we thought we were logged in
    // means the backend no longer recognizes our session (e.g. a
    // redeploy reset it). Drop the session so AdminRoute redirects to
    // the login page, and flag it there so the user gets a clear
    // explanation instead of a generic "update failed" error.
    return onAuthExpired(() => {
      if (sessionStateRef.current.status === "authenticated") {
        sessionStorage.setItem("adminSessionExpired", "true");
        setSessionState({ data: null, status: "unauthenticated" });
      }
    });
  }, []);

  return (
    //<SessionContext.Provider> is legacy way to provide context
    <SessionContext
      value={{ session: sessionState, setSession: setSessionState }}
    >
      {children}
    </SessionContext>
  );
};
