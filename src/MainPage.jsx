import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ExpandableBox from "./components/expandableBox";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        axios
            .get("http://71.255.243.120:5000/getdata")
            .then((response) => {
                this.setState({ data: response.data, isLoading: false });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { isLoading, data } = this.state;
        if (isLoading) {
            return <div>Loading...</div>; // Show loading message or spinner
        }

        return (
            <div className="container">
                <h1>All Articles</h1>
                <ExpandableBox
                    name="Default Cluster"
                    data={this.state.data}
                ></ExpandableBox>
                <ExpandableBox name="Some Other Cluster"></ExpandableBox>

            </div>
        );
    }
}

export default MainPage;
