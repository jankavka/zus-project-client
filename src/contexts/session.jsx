import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const SessionContext = createContext({
  session: { data: null, status: "loading" },
  setSession: (data) => {},
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

  useEffect(() => {
    apiGet("/api/auth")
      .then((data) => setSessionState({ data, status: "authenticated" }))
      .catch(() => setSessionState({ data: null, status: "unauthenticated" }));
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
