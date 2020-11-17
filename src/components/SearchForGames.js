import React from "react";
import { useEffect, useState } from "react";

export default function SearchForGames() {
  const [data, setData] = useState([]);
  const [games, setGames] = useState([]);

  const fetchGamesData = () => {
    fetch(
      "https://www.balldontlie.io/api/v1/stats?seasons[]=2018&games_ids[]=[82,81,80,79,78,77,76,75,74,73,72]&player_ids[]=140&per_page=10"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
        setGames(data.data[0].game);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  return (
    <div>
      <p>This is the games data</p>
      <div>
        {data.map((item, index) => (
          <ul key={index}>
            MINS: {item.min} PTS: {item.pts} REB: {item.reb} OREB: {item.oreb}{" "}
            STL: {item.stl} Ast:{item.ast} Blk:{item.blk} Dreb:{item.dreb} FGM:{" "}
            {item.fgm} FGA: {item.fga} FG3A: {item.fg3a} FG3M: {item.fg3m} FTA{" "}
            {item.fta} FTM: {item.ftm} FT_PCT {item.ft_pct}
            {item.fg3_pct}% FG3A: {item.fg3a} FG3M: {item.fg3a} FG_PCT{" "}
            {item.fg_pct}
          </ul>
        ))}
        <br />
        {/* {Object.entries(data[0]).map((key, i) => (
          <li key={i}>
            <span>{key}</span>
          </li>
        ))} */}
      </div>
    </div>
  );
}
