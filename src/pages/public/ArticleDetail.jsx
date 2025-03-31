import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
    const [article, setArticle] =  useState({});
    const {id} = useParams();

    useEffect(() => {
        apiGet("/api/articles/" + id)
        .then((data) => setArticle(data))
    }, [])

    return (
        <div className="container-content">
            <h1 className="mb-5">{article.title}</h1>
            <p>{article.content}</p>
        </div>
    )
}

export default ArticleDetail;