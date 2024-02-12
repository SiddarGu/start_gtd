import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage.jsx"; // Updated import path
import SecondPage from "./SecondPage.jsx"; // Updated import path
import ArticlePage from "./ArticlePage.jsx";
import TopBar from "./TopBar.jsx";

function App() {
  return (
      <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;