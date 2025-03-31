import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";

const ArticleDetail = () => {
    const [article, setArticle] =  useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        apiGet("/api/articles/" + id)
        .then((data) => setArticle(data))
    }, [])

    return (
        <div className="container-content">
            <h1 className="mb-5">{article.title}</h1>
            <p>{article.content}</p>

            <Link onClick={handleBack}>Zpět</Link>
        </div>

        
    )
}

export default ArticleDetail;