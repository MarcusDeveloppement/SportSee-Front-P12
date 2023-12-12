import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/user/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
