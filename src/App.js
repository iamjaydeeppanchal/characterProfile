import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route
import "./App.css";
import LandingPage from "./page/LandingPage";
import SingleProfile from "./page/SingleProfile";

const App = () => {
  return (
    <Suspense>
      <Routes>
        {/* Define routes for each component */}
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/SingleProfile/:id" element={<SingleProfile />} />
        {/* Assuming you have dynamic routing for profiles */}
      </Routes>
    </Suspense>
  );
};

export default App;
