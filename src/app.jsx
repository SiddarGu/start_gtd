import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage.jsx"; // Updated import path
import SecondPage from "./SecondPage.jsx"; // Updated import path
import ArticlePage from "./ArticlePage.jsx";
import TopBar from "./TopBar.jsx";
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onLogout}>Logout</button>

      <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
  } 
}

export default App;
