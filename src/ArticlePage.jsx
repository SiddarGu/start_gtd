import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    return (
        <div>
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
            <div dangerouslySetInnerHTML={{ __html: article.display_version }}></div>
        </div>
    );
};

export default ArticlePage;
