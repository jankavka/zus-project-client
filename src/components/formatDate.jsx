import React from "react";

const formatDate = (item) => {
  return item.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;
