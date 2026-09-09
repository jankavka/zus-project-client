// Splits a person's `degree` string into titles that go *before* the name and
// titles that go *after* it. In Czech, "DiS." and "dipl. um." are written after
// the name (comma-separated), everything else (Mgr., MgA., Bc., …) before it.

// Matched case-insensitively and tolerant of missing dots / extra spaces
// ("dipl.um.", "dipl um", "Dis"). Each entry maps any match to its canonical form.
const POST_NOMINAL = [
  { canonical: "dipl. um.", test: /dipl/i, re: /\bdipl\.?\s*um\.?/gi },
  { canonical: "DiS.", test: /dis/i, re: /\bdis\.?/gi },
];

const COMBINED = new RegExp(
  POST_NOMINAL.map((t) => t.re.source).join("|"),
  "gi"
);

// Returns { pre: string, post: string[] } — `post` keeps the order the titles
// appeared in the source string.
export function splitAcademicTitles(degree) {
  const source = String(degree ?? "").trim();
  if (!source) return { pre: "", post: [] };

  const post = [];
  const pre = source
    .replace(COMBINED, (match) => {
      const entry = POST_NOMINAL.find((t) => t.test.test(match));
      post.push(entry ? entry.canonical : match);
      return " ";
    })
    .replace(/\s*,\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[,\s]+$/g, "");

  return { pre, post };
}

// "Mgr. Jan Novák, DiS." — pre-name titles, then the name, then post-name titles.
export function formatPersonName(degree, name) {
  const { pre, post } = splitAcademicTitles(degree);
  const namePart = String(name ?? "").trim();

  if (!namePart) return [pre, ...post].filter(Boolean).join(" ");

  const head = [pre, namePart].filter(Boolean).join(" ");
  return post.length ? `${head}, ${post.join(", ")}` : head;
}
