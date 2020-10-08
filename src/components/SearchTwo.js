import React from "react";
import { useEffect, useState } from "react";

export default function SearchTwo() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const playerStats = () => {
      fetch(
        "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=140"
      )
        .then((response) => response.json())
        .then((statPayload) => {
          setStats(statPayload.data);
        });
    };
    playerStats();
  }, []);

  // can get the id here, want to pass to the other fetch so i can then use the name to search for the season stats
  useEffect(() => {
    const fetchData = () => {
      fetch("https://www.balldontlie.io/api/v1/players?search=durant")
        .then((response) => response.json())
        .then((payload) => {
          setData(payload.data);
        });
    };
    fetchData();
  }, []);

  // want to map over the stats and not have to do it like i am, i want to print the key and th value from the array object? use a fir loop?

  return (
    <div>
      <p>hello</p>
      {data.map((item, index) => (
        <ul key={index}>
          {item.first_name} {item.last_name},{item.position},{" "}
          {item.team.abbreviation}
        </ul>
      ))}
      {stats.map((item, index) => (
        <ul>
          <li key={index}>MINS: {item.min}</li>
          <li>GP: {item.games_played}</li>
          <li>PTS: {item.pts}</li>
          <li>ASTS: {item.ast}</li>
          <li>REBS: {item.reb}</li>
          <li>STLS: {item.stl}</li>
          <li>BLKS: {item.blk}</li>
          <li>DREB: {item.dreb}</li>
          <li>OREB: {item.oreb}</li>
          <li>FGMPCT: {item.fg3_pct}</li>
          <li>FG3A: {item.fg3a}</li>
          <li>FG3M: {item.fg3m}</li>
          <li>FGPCT: {item.fg_pct}</li>
          <li>FGA: {item.fga}</li>
          <li>FGM: {item.fgm}</li>
          <li>FTPCT: {item.ft_pct}</li>
          <li>FTA: {item.fta}</li>
          <li>FTM: {item.ftm}</li>
          <li>FOULS: {item.pf}</li>
          <li>TOVR: {item.turnover}</li>
        </ul>
      ))}
    </div>
  );
}

// for(let [key, value] of stats) {
//   console.log(key + ":" value)
// }
// ast: 5.86
// blk: 1.08
// dreb: 5.95
// fg3_pct: 0.353
// fg3a: 4.97
// fg3m: 1.76
// fg_pct: 0.521
// fga: 17.73
// fgm: 9.24
// ft_pct: 0.885
// fta: 6.49
// ftm: 5.74
// games_played: 78
// min: "34:38"
// oreb: 0.42
// pf: 1.99
// player_id: 140
// pts: 25.99
// reb: 6.37
// season: 2018
// stl: 0.74
// turnover: 2.88
