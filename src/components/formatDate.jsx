import React from "react";

// `dateOnly` omits the time part – used for all-day calendar events, whose
// start value is midnight and would otherwise render a meaningless "0:00".
const formatDate = (item, { dateOnly = false } = {}) => {
  return item.toLocaleString("cs-CZ", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(dateOnly ? {} : { hour: "numeric", minute: "numeric" }),
  });
};

export default formatDate;
