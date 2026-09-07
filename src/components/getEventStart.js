// Resolves the start of a Google Calendar event regardless of its type.
//
// Timed events carry `start.dateTime` (`{ value: <epoch ms> }`), while all-day
// events carry `start.date` instead and leave `dateTime` undefined. Reading
// `event.start.dateTime.value` blindly therefore throws on every all-day event.
//
// Returns `{ date: Date, allDay: boolean }`, or `null` when nothing usable is
// present so callers can skip the event instead of crashing the render.
const getEventStart = (event) => {
  const start = event?.start;
  if (!start) return null;

  const timed = start.dateTime?.value ?? start.dateTime;
  const allDay = start.date?.value ?? start.date;

  const raw = timed ?? allDay;
  if (raw === undefined || raw === null) return null;

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;

  return { date, allDay: timed === undefined || timed === null };
};

export default getEventStart;
