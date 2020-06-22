import React from "react";
import logo from "./logo.svg";
import AppBar from "./components/MenuAppBar";
import ReadMeCard from "./components/ReadMeCard";
import "./App.css";

function App() {
  return (
    <div>
      <AppBar />
      <div className="read-me">
        <ReadMeCard />
      </div>
    </div>
  );
}

export default App;
