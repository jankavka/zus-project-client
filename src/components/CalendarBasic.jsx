import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import formatDate from "./formatDate";
import LoadingText from "./LoadingText";
import NoEvents from "./NoEvents";

const CalendarBasic = () => {
  const [events, setEvents] = useState([]);
  const filter = {
    limit: 5,
  };
  const [isHiddenEvents, setIsHiddenEvents] = useState(true);
  const [isHiddenLoadingText, setIsHiddenLoadingText] = useState(false);
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    apiGet("/api/calendar/events", filter)
      .then((data) => setEvents(data))
      .catch((error) => {
        setErrorState(true);
        console.log(error);
      });
    const timerNoEvents = setTimeout(() => setIsHiddenEvents(false), 10000);
    const timerLoadingText = setTimeout(
      () => setIsHiddenLoadingText(true),
      10000
    );

    return () => clearTimeout(timerNoEvents, timerLoadingText);
  }, []);

  return (
    <div className="container-calendar">
      {errorState ? (
        <div>Kalendář se nepodařilo načíst</div>
      ) : (
        <div>
          <h5 className=" text-uppercase mb-3">Nejbližší akce</h5>
          {events.length === 0 ? (
            <div>
              <LoadingText isHidden={isHiddenLoadingText} />
              <NoEvents isHidden={isHiddenEvents} />
            </div>
          ) : null}
          <ul>
            {events.length === 0
              ? null
              : events.map((event, index) => (
                  <li className="mb-2" key={index}>
                    <span>{event.summary}</span>
                    <br />
                    <span>
                      {formatDate(new Date(event.start.dateTime.value))}
                    </span>
                  </li>
                ))}
          </ul>
          <Link to={"/kalendar"}>Všechny události..</Link>
        </div>
      )}
    </div>
  );
};

export default CalendarBasic;
