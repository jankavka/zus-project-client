import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import formatDate from "./formatDate";
import LoadingText from "./LoadingText";
import NoEvents from "./NoEvents";

const CalendarBasic = ({ limit = 5 }) => {
  const [events, setEvents] = useState([]);
  const filter = {
    limit: limit,
  };
  const [isHiddenEvents, setIsHiddenEvents] = useState(true);
  const [isHiddenLoadingText, setIsHiddenLoadingText] = useState(false);
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    apiGet("/api/calendar/events", filter)
      .then((data) => setEvents(data))
      .catch((error) => {
        setErrorState(true);
        console.error(error);
      });
    const timerNoEvents = setTimeout(() => setIsHiddenEvents(false), 10000);
    const timerLoadingText = setTimeout(
      () => setIsHiddenLoadingText(true),
      10000
    );

    return () => clearTimeout(timerNoEvents, timerLoadingText);
  }, []);

  return (
    <div>
      <div className="container-calendar" style={{ marginBottom: "1rem" }}>
        {errorState ? (
          <div>
            V tuto chvíli nejsou naplánovány žádné akce. Nové termíny zde
            průběžně zveřejňujeme.
          </div>
        ) : (
          <div>
            <h5 className="section-title text-uppercase mb-3">Nejbližší akce</h5>
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
          </div>
        )}
      </div>
      <Link to={"/kalendar"} className="btn btn-light border-dark mb-5">
        Všechny akce
      </Link>
    </div>
  );
};

export default CalendarBasic;
