import React from "react";
import { useEffect, useState } from "react";

// const API_URL = `https://www.balldontlie.io/api/v1/players?search=${query}`;

export default function SearchAttempt() {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.data);
        console.log(players);
        setId(data.data[0].id);
        console.log(data);
        console.log(data.data[0].id);
        return players;
      });
  }, [query]);

  useEffect((players) => {
    const response = async () => {
      await fetch(
        `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${players.id}`
      );
      setPlayers(response.data);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search a player"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button>Submit</button>
      <h5>
        {players.map(({ first_name, last_name, team, position, id }, index) => (
          <ul key={index}>
            {id} {first_name} {last_name}, {team.full_name} ({position})
          </ul>
        ))}
        <ul></ul>
      </h5>
    </div>
  );
}
