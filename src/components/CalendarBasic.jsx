import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import formatDate from "./formatDate";
import LoadingText from "./LoadingText";

const CalendarBasic = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    limit: 5
  });

  useEffect(() => {
    apiGet("/api/calendar/events", filter).then((data) => setEvents(data));
  }, []);

  return (
    <div className="container-calendar">
      <h1 className="mb-3">Nejbližší akce</h1>
      <ul>
        {events.length === 0 ? <LoadingText/> :events.map((event, index) => (
          <li className="mb-2"key={index}>
            <span>{event.summary}</span><br/>
            <span>{formatDate(new Date(event.start.dateTime.value))}</span>
          </li>
        ))}
      </ul>
      <Link to={"/kalendar"}>Všechny události..</Link>
    </div>
  );
};

export default CalendarBasic;
