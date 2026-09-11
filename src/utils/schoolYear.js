// school_year.schoolYear is free-text (e.g. "2023-2024") with no dedicated
// sort column, and its id only reflects insertion order, not the actual
// school year. Extract the first 4-digit year found and sort by that so
// years display chronologically regardless of DB/insertion order.
const extractYear = (schoolYear) => {
  const match = String(schoolYear ?? "").match(/\d{4}/);
  return match ? Number(match[0]) : -Infinity;
};

// Sorts school year objects ({ id, schoolYear }) chronologically, newest first.
export const sortSchoolYearsDesc = (schoolYears) =>
  [...(schoolYears || [])].sort(
    (a, b) => extractYear(b?.schoolYear) - extractYear(a?.schoolYear)
  );
