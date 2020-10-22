import React from "react";
import { useEffect, useState } from "react";

export default function SearchTwo(props) {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [error, setError] = useState(false);

  const handleReset = () => {
    setQuery("");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = () => {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
        .then((response) => response.json())
        .then((payload) => {
          setId(payload.data[0].id);
          setTeam(payload.data[0].team);
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
                  setLoading(true);
                });
              let myArray = query.split(" ").reverse().join("/");
              fetch(
                `https://nba-players.herokuapp.com/players/${myArray}`
              ).then((response) => setPhoto(response.url));
            });
        })
        .catch(function (error) {
          setError(true);
          console.log(error);
        });
      return fetchData;
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
      {loading && (
        <>
          <div>
            <p>
              {description.first_name} {description.last_name} -{" "}
              {description.height}
              <br />
              {description.position}, {team.abbreviation}
              <br />
              {description.height_feet}ft {description.height_inches}
            </p>
          </div>
          <div>
            {data.map((item, index) => (
              <ul key={index}>
                2018 Season Stats
                <br />
                Assist: {item.ast} , 3FGA: {item.fg3a} , FGM: {item.fgm},
              </ul>
            ))}
            {Object.entries(data[0]).map((key, i, value) => (
              <li key={i}>
                <span>{key}</span>
              </li>
            ))}
            <div>
              <img src={photo} alt="NBAplayer" />
            </div>
          </div>
        </>
      )}
      {error && <p>Please enter a valid NBA player</p>}
    </div>
  );
}

// can get the id here, want to pass to the other fetch so i can then use the name to search for the season stats
// can make the search query the players name on line
