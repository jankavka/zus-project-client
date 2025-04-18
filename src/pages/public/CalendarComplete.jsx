import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import DateFormat from "../../components/formatDate";
import LoadingText from "../../components/LoadingText";

const CalendarComplete = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    pageToken: undefined,
    singleEvents: true,
  });
  //
  const [tokens, setTokens] = useState([""])
  const [page, setPage] = useState(0);

  useEffect(() => {
    apiGet("/api/calendar/all-events", filter).then((data) =>
      setEvents(data.items)
    );

    apiGet("/api/calendar/all-events", filter).then((data) =>
      setFilter((prev) => {
        return { ...prev, pageToken: data.nextPageToken };
      })
    );
  }, []);

  const nextPage = () => {
    apiGet("/api/calendar/all-events", filter).then((data) => {
      setEvents(data.items)
      if(page === 0){
        setTokens(["", data.nextPageToken])
        setPage(prev => prev + 1)
      }else {
        setTokens(prev => {return [...prev, data.nextPageToken]})
        setPage(prev => prev + 1)
      }
    }
    );
  }

  //prev page fn => COMPLETE!!!
  const prevPage = () => {
    setFilter(prev => {return {...prev, pageToken: tokens[page-2]}});
    apiGet("/api/calendar/all-events", filter).then((data) => {
      setEvents(data.items)
    });
    setPage(prev => prev -1);

    apiGet("/api/calendar/all-events", filter).then((data) =>
      setFilter((prev) => {
        return { ...prev, pageToken: data.nextPageToken };
      })
    );

  }

    
  

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
        <button className="offset-1 col-5 my-button-next" onClick={() => nextPage()}>
          další strana
        </button>
      </div>
    </div>
  );
};

export default CalendarComplete;
