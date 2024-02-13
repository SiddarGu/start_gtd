import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchAndInputComponent from "./editable";

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const { article_id } = useParams(); // Extract article_id from URL

    useEffect(() => {
        axios.get(`http://localhost:5000/articles/${article_id}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the article:", error);
            });
    }, [article_id]); // Dependency array includes article_id to refetch when it changes

    if (!article) return <div>Loading...</div>;

    // remove html tags and replace <br> with new line; also remove extra new lines
    const content = article.display_version.replace(/<html>|<\/html>|<body>|<\/body>/g, "").replace(/<br\s*\/?>/g, "\n").replace(/\n{2,}/g, "\n");

    return (
        <div className="mainContainer">
            <div className="left-column">
            <h1>{article.title}</h1>
            {/* Display other article details here */}
            <div>
                <p>Publication Date: {article.publication_date}</p>
                <p>Source: {article.source}</p>
                <p>Validity Score: {article.source_validity_score}</p>
                <p>Relevance Score: {article.relevance_score}</p>
                <p>Aggregator: {article.aggregator}</p>
                <p>Location: {article.extracted_location}</p>
            </div>
            {/* Separator */}
            <hr />
            {/* Display the article content here */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className="right-column">
            <SearchAndInputComponent articleId={article_id} />
            </div>
        </div>
    );
};

export default ArticlePage;
