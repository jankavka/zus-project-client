import React from "react";

const formatDate = (item) => {
  return(
    item.toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute:"numeric"
      
    })
  )
};

export default formatDate;
