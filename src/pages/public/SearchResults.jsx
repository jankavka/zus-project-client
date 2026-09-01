import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Google Programmable Search Engine ID (cx). Set VITE_GOOGLE_CSE_ID in .env
// (create the engine at https://programmablesearchengine.google.com).
const CSE_ID = import.meta.env.VITE_GOOGLE_CSE_ID || "";
const GNAME = "site-search";
const RESULTS_DIV_ID = "gcse-results";

// Load the Google PSE script once for the whole app. We use explicit rendering
// so React controls when the results element is created, and rely on the
// official `__gcse.callback` to know when the API is truly ready -- the script's
// `onload` fires before `google.search.cse.element` exists.
let apiReady = false;
let readyResolvers = [];
let scriptRequested = false;

const whenApiReady = () =>
  new Promise((resolve) => {
    if (apiReady) {
      resolve();
      return;
    }
    readyResolvers.push(resolve);
    if (scriptRequested) return;
    scriptRequested = true;

    window.__gcse = {
      parsetags: "explicit",
      callback: () => {
        apiReady = true;
        readyResolvers.forEach((r) => r());
        readyResolvers = [];
      },
    };

    const script = document.createElement("script");
    script.src = `https://cse.google.com/cse.js?cx=${encodeURIComponent(CSE_ID)}`;
    script.async = true;
    document.head.appendChild(script);
  });

// Each mount gets its own gname so render() always targets the fresh results
// node React just created, instead of a stale detached one from a prior visit.
let gnameCounter = 0;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const gnameRef = useRef(null);
  const navigate = useNavigate();

  // Local copy of the query so the user can refine the search from this page
  // without going back to the top nav. Kept in sync when the URL changes
  // (top-nav search, browser back/forward).
  const [term, setTerm] = useState(query);
  useEffect(() => {
    setTerm(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = term.trim();
    if (!trimmed || trimmed === query) return;
    navigate(`/vyhledavani?query=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    if (!CSE_ID) return undefined;
    if (!gnameRef.current) {
      gnameCounter += 1;
      gnameRef.current = `${GNAME}-${gnameCounter}`;
    }
    const gname = gnameRef.current;

    let cancelled = false;
    whenApiReady()
      .then(() => {
        if (cancelled) return;
        const cse = window.google?.search?.cse?.element;
        if (!cse) return;

        if (!cse.getElement(gname)) {
          cse.render({
            div: RESULTS_DIV_ID,
            tag: "searchresults-only",
            gname,
            // Render results inline in our div rather than in a page overlay.
            attributes: { overlayResults: false },
          });
        }

        const el = cse.getElement(gname);
        if (el && query) el.execute(query);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="search-results-page">
      <h1 className="mb-3">Výsledky vyhledávání</h1>

      <form onSubmit={handleSubmit} role="search" className="mb-4">
        <div className="input-group" style={{ maxWidth: 480 }}>
          <input
            type="search"
            className="form-control"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            aria-label="Hledaný výraz"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-secondary">
            Hledat
          </button>
        </div>
      </form>

      {query && (
        <p className="text-muted mb-4">
          Hledaný výraz: <strong>{query}</strong>
        </p>
      )}

      {!CSE_ID && (
        <p className="text-danger">
          Vyhledávání zatím není nakonfigurováno – v <code>.env</code> chybí{" "}
          <code>VITE_GOOGLE_CSE_ID</code>.
        </p>
      )}

      {CSE_ID && !query && (
        <p>Zadejte hledaný výraz přes ikonu lupy v horním menu.</p>
      )}

      <div id={RESULTS_DIV_ID} />
    </div>
  );
};

export default SearchResults;
