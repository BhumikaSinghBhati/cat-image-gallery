import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import InfiniteScroll from "./InfiniteScrollPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/single-column" element={<InfiniteScroll />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
