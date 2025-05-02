import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import LoadingText from "../../components/LoadingText";
import formatDate from "../../components/formatDate";

// works only with all day events. Otherwise event.start.date.value will be undefined
const CalendarComplete = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    nextPageToken: undefined,
    singleEvents: true,
  });

  const [tokens, setTokens] = useState([""]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiGet("/api/calendar/all-events", filter).then((data) =>
      setEvents(data.items)
    );

    apiGet("/api/calendar/all-events", filter).then((data) => {
      console.log(data);
      setFilter((prev) => {
        return { ...prev, nextPageToken: data.nextPageToken };
      });
      setTokens((prev) => {
        return [...prev, data.nextPageToken];
      });
    });
  }, []);

  //moves events list to next page
  const nextPage = () => {
    setEvents([]);
    apiGet("/api/calendar/all-events", filter).then((data) => {
      setEvents(data.items);
      setPage((prev) => prev + 1);
      if (data.nextPageToken) {
        setFilter((prev) => {
          return { ...prev, nextPageToken: data.nextPageToken };
        });
        setTokens((prev) => {
          return [...prev, data.nextPageToken];
        });
      }
    });
  };

  //moves events list to previous page
  const prevPage = () => {
    setEvents([]);
    if (tokens.length < 3) {
      apiGet("/api/calendar/all-events", { limit: 10, nextPageToken: "" }).then(
        (data) => {
          setEvents(data.items);
          setTokens(["", data.nextPageToken]);
          setFilter((prev) => {
            return { ...prev, nextPageToken: data.nextPageToken };
          });
          setPage((prev) => prev - 1);
        }
      );
    } else {
      let api = {};
      if (page === tokens.length) {
        api = apiGet("/api/calendar/all-events", {
          limit: 10,
          nextPageToken: tokens[tokens.length - 2],
        });
      } else {
        api = apiGet("/api/calendar/all-events", {
          limit: 10,
          nextPageToken: tokens[tokens.length - 3],
        });
      }
      api.then((data) => {
        setEvents(data.items);
        setTokens((prev) =>
          prev.filter((t) => tokens.indexOf(t) < tokens.length - 1)
        );
        setFilter((prev) => {
          return { ...prev, nextPageToken: data.nextPageToken };
        });
        setPage((prev) => prev - 1);
      });
    }
  };

  return (
    <div className="container-calendar">
      <h1 className="mb-3">Seznam akcí</h1>
      <ul>
        {events.length === 0 ? (
          <LoadingText />
        ) : (
          events &&
          events.map((event, index) => (
            <li className="mb-2" key={index}>
              {formatDate(new Date(event.start.dateTime))} - {event.summary}
            </li>
          ))
        )}
      </ul>
      <div className=" row">
        <button className="col-5 my-button-previous" onClick={() => prevPage()}>
          předchozí strana
        </button>
        <button
          className="offset-1 col-5 my-button-next"
          onClick={() => nextPage()}
        >
          další strana
        </button>
      </div>
    </div>
  );
};

export default CalendarComplete;
