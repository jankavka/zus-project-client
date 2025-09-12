import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import LoadingText from "../../components/LoadingText";
import formatDate from "../../components/formatDate";
import NoEvents from "../../components/NoEvents";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

// works only with all day events. Otherwise event.start.date.value will be undefined
const CalendarComplete = () => {
  const [events, setEvents] = useState([]);
  const [isHiddenEvents, setIsHiddenEvents] = useState(true);
  const [isHiddenLoadingText, setIsHiddenLoadingText] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
    nextPageToken: undefined,
    singleEvents: true,
  });

  const [tokens, setTokens] = useState([""]);
  const [page, setPage] = useState(1);
  const [loadinErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/calendar/all-events", filter)
      .then((data) => {
        setEvents(data.items);
        setFilter((prev) => {
          return { ...prev, nextPageToken: data.nextPageToken };
        });
        setTokens((prev) => {
          return [...prev, data.nextPageToken];
        });
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const timerLoadingText = setTimeout(
      () => setIsHiddenLoadingText(true),
      10000
    );

    return () => clearTimeout(timerLoadingText);
  }, []);

  useEffect(() => {
    const noEvents = !events || events.length === 0;
    if (!noEvents) {
      setIsHiddenEvents(true);
      return;
    }
    const timerNoEvents = setTimeout(() => setIsHiddenEvents(false), 10000);
    return () => clearTimeout(timerNoEvents);
  }, [events]);

  //moves events list to next page
  const nextPage = () => {
    setEvents([]);
    apiGet("/api/calendar/all-events", filter)
      .then((data) => {
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
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  };

  //moves events list to previous page
  const prevPage = () => {
    setEvents([]);
    if (tokens.length < 3) {
      apiGet("/api/calendar/all-events", { limit: 10, nextPageToken: "" })
        .then((data) => {
          setEvents(data.items);
          setTokens(["", data.nextPageToken]);
          setFilter((prev) => {
            return { ...prev, nextPageToken: data.nextPageToken };
          });
          setPage((prev) => prev - 1);
        })
        .catch((error) => {
          setLoadingErrorState(true);
          console.error(error);
        });
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
      <h5 className="mb-3 text-uppercase">Seznam akcí</h5>
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      <div className="calendar-height">
        {events.length === 0 ? (
          <div>
            <LoadingText isHidden={isHiddenLoadingText} />
            <NoEvents isHidden={isHiddenEvents} />
          </div>
        ) : null}
        <ul>
          {events.length === 0
            ? null
            : events &&
              events.map((event, index) => (
                <li className="mb-2" key={index}>
                  {formatDate(new Date(event.start.dateTime.value))} -{" "}
                  {event.summary}
                </li>
              ))}
        </ul>
      </div>
      {isHiddenEvents ? (
        <div className="row">
          <button
            className="col-5 my-button-previous"
            onClick={() => prevPage()}
          >
            předchozí strana
          </button>
          <button
            className="offset-1 col-5 my-button-next"
            onClick={() => nextPage()}
          >
            další strana
          </button>
        </div>
      ) : (
        <div className="row" style={{ height: "35px" }}></div>
      )}
    </div>
  );
};

export default CalendarComplete;
