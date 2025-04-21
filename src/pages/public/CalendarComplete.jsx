import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import DateFormat from "../../components/formatDate";
import LoadingText from "../../components/LoadingText";

const CalendarComplete = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    nextPageToken: undefined,
    singleEvents: true,
  });
  //
  const [tokens, setTokens] = useState([""]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    apiGet("/api/calendar/all-events", filter).then((data) =>
      setEvents(data.items)
    );

    apiGet("/api/calendar/all-events", filter).then((data) => {
      console.log(data);
      setFilter((prev) => {
        return { ...prev, nextPageToken: data.nextPageToken };
      });
    });
  }, []);

  useEffect(() => {
    console.log(page, tokens);
  }, [page, tokens]);

  //moves events list to next page
  const nextPage = () => {
    apiGet("/api/calendar/all-events", filter).then((data) => {
      setEvents(data.items);
      if (page === 0) {
        setTokens(["", data.nextPageToken]);
        setPage((prev) => prev + 1);
        setFilter((prev) => {
          return { ...prev, nextPageToken: data.nextPageToken };
        });
      } else {
        if (data.nextPageToken != undefined) {
          setTokens((prev) => {
            return [...prev, data.nextPageToken];
          });
          setPage((prev) => prev + 1);
          setFilter((prev) => {
            return { ...prev, nextPageToken: data.nextPageToken };
          });
        }
      }
    });
  };

  //this dosnt work yet!!!!
  const prevPage = () => {
    apiGet("/api/calendar/all-events", {
      limit: 10,
      nextPageToken: tokens[tokens.length - 2],
    }).then((data) => {
      setEvents(data.items);
    });
    setTokens((prev) => prev.pop());
  };

  return (
    <div className="container-calendar">
      <h1 className="mb-3">Seznam akcí</h1>
      <ul>
        {events.length === 0 ? (
          <LoadingText />
        ) : (
          events.map((event, index) => (
            <li className="mb-2" key={index}>
              {DateFormat(new Date(event.start.date.value))} - {event.summary}
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
