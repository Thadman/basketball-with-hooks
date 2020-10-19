import React from "react";
import { useEffect, useState } from "react";

export default function SearchTwo() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [stats, setStats] = useState([]);
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState([]);

  // useEffect(() => {
  //   const playerStats = () => {
  //     fetch(
  //       "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=140"
  //     )
  //       .then((response) => response.json())
  //       .then((statPayload) => {
  //         // console.log(statPayload.data);
  //         // fetch here and then pass { id } `${id}
  //       });
  //   };
  //   playerStats();
  // }, []);

  // can get the id here, want to pass to the other fetch so i can then use the name to search for the season stats
  // can make the search query the players name on line 28

  // This is the
  // useEffect(() => {
  // const fetchData = () => {
  //   fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
  //     .then((response) => response.json())
  //     .then((payload) => {
  //       setId(payload.data[0].id);
  //       const moreIds = payload.data[0].id;
  //       fetch(
  //         `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${moreIds}`
  //       )
  //         .then((response) => response.json())
  //         .then((statPayload) => {
  //           setData(statPayload.data);
  //           fetch(`https://www.balldontlie.io/api/v1/players/${moreIds}`)
  //             .then((response) => response.json())
  //             .then((playerData) => {
  //               setDescription(playerData);
  //             });
  //         });
  //     });
  // };
  // fetchData();
  // }, []);

  const handleReset = () => {
    setQuery("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = () => {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
        .then((response) => response.json())
        .then((payload) => {
          setId(payload.data[0].id);
          const moreIds = payload.data[0].id;
          fetch(
            `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${moreIds}`
          )
            .then((response) => response.json())
            .then((statPayload) => {
              setData(statPayload.data);
              fetch(`https://www.balldontlie.io/api/v1/players/${moreIds}`)
                .then((response) => response.json())
                .then((playerData) => {
                  setDescription(playerData);
                });
            });
        });
    };
    fetchData();
    handleReset();
  };

  // use Object.keys to map over the array object so don't have to type the whole thing, of all the player stats
  // map through to get the team stats of the team, like the abbreviation and shit.

  return (
    <div>
      <div>
        <p>Search for a player</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
      <p>
        {description.first_name} {description.last_name}
        <br />
        {description.position}
      </p>

      {data.map((item, index) => (
        <ul key={index}>
          Assist: {item.ast}
          3FGA: {item.fg3a}
          FGM: {item.fgm},
        </ul>
      ))}
      {Object.keys(stats).map((keyName, i) => (
        <li key={i}>
          <span>
            key: {i} Name: {stats[keyName]}
          </span>
        </li>
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
