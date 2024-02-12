import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const MainPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios
            .get("http://localhost:5000/getdata")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) =>
                console.error("There was an error fetching the data:", error)
            );
    }, []);

    return (
        <div className="mainContainer">
            <h1>All Articles</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Article ID</th>
                        <th>Article Title</th>
                        <th>Publication Date</th>
                        <th>Source</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Generate a vertical column of article_ids */}
                    {data.map((article) => (
                        <tr key={article.article_id}>
                            <td><a href={`/articles/${article.article_id}`}>
                                        {article.article_id}
                                    </a></td>
                            <td>{article.title}</td>
                            <td>{article.publication_date}</td>
                            <td>{article.source}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPage;
