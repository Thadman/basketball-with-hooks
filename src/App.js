import React from "react";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";
import SearchForGames from "./components/SearchForGames";

function App() {
  return (
    <div className="App">
      {/* <Home />
      <Search /> */}
      <SearchForGames />
    </div>
  );
}

export default App;
