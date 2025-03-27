import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const HistoryAndPresentIndex = () => {

    const [historyAndPresent, setHistoryAndPresent] = useState({});

    useEffect(() =>{
        apiGet("/api/static/history-and-present").then((data) => setHistoryAndPresent(data))
    },[])

    return (
        <div className="container-content">
            <h1>Historie a současnost</h1>
            <p>{historyAndPresent.content}</p>
        </div>
    )
}

export default HistoryAndPresentIndex;