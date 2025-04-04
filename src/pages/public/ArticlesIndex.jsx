import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const ArticlesIndex = () => {
    const [articles, setArticles] = useState([]);
    const [link, setLink] = useState('');

    useEffect(() => {
        apiGet("/api/articles?limit=5").then((data) => setArticles(data));

    }, [])
        


    return (
        <div className="container-content">
            <h1 className="mb-5">Aktuality</h1>
            {articles.map((article) => (
                
                <div className="mb-5" key={article.id} style={{maxWidth: "800px"}} >
                    <Link to={`/o-skole/aktuality/${article.id}`}><img src="/src/images/vzor.jpg" className="picture-width mb-3"/></Link>
                    <h3><Link to={`/o-skole/aktuality/${article.id}`} style={{color: "black", }}>{article.title}</Link></h3>
                    <p>{article.content.substring(0, 250)}...</p>
                    <hr/>
                </div>
            ))}
        </div>
    )
}

export default ArticlesIndex;