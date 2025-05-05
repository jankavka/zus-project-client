import React from "react";

const formatDate = (item) => {

  // return item.toLocaleDateString("cs-CZ", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

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
