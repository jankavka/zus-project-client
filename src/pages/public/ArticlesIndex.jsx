import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const ArticlesIndex = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        apiGet("/api/articles?limit=5").then((data) => setArticles(data));
    }, [])


    return (
        <div className="container-content">
            <h1 className="mb-5">Aktuality</h1>
            {articles.map((article) => (
                <div className="mb-5" key={article.id}>
                <h3><Link to={`/aktuality/${article.id}`} style={{color: "black", }}>{article.title}</Link></h3>
                <p>{article.content.substring(0, 250)}...</p>
                </div>
            ))}
        </div>
    )
}

export default ArticlesIndex;