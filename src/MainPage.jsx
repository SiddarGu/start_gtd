import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ExpandableBox from "./components/expandableBox";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://71.255.243.120:5000/getdata")
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    render() {
        return (
            <div className="container">
                <h1>All Articles</h1>
                <ExpandableBox name="Default Cluster">
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
                            {this.state.data.map((article) => (
                                <tr key={article.article_id}>
                                    <td>
                                        <a
                                            href={`/articles/${article.article_id}`}
                                        >
                                            {article.article_id}
                                        </a>
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.publication_date}</td>
                                    <td>{article.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ExpandableBox>
                <ExpandableBox name="Some Other Cluster">
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
                        </tbody>
                    </table>
                </ExpandableBox>

                <div></div>
            </div>
        );
    }
}

export default MainPage;
