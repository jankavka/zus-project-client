import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

const ArticlesIndex = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        apiGet("/api/articles?limit=3").then((data) => setArticles(data));
    }, [])


    return (
        <div className="container-content">
            <h1 className="mb-5">Aktuality</h1>
            {articles.map((article) => (
                <div className="mb-5">
                <h3>{article.title}</h3>
                <p>{article.content.substring(0, 250)}...</p>
                </div>
            ))}

        </div>
    )
}

export default ArticlesIndex