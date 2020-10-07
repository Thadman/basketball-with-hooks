import React from "react";
import { useEffect, useState } from "react";

export default function SearchTwo() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [stats, setStats] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const initial = fetch(
        "https://www.balldontlie.io/api/v1/players?search=jordan"
      );
      const initialJson = await initial.json();

      console.log(initialJson.data);

      const playerDetails = initialJson.data.map(async (i) => {
        console.log(i.id);
        const preFetchData = await fetch(i);
        return preFetchData;
      });

      await Promise.all(playerDetails);
      // const response = await Promise.all(playerDetails);
      // console.log(response);

      const payload = (await Promise.all(playerDetails)).map((data) => ({
        id: data.id,
      }));
      return payload;
      console.log(payload);
    };

    fetchData();
  });

  return (
    <div>
      <p>hello</p>
      {playerDetails.data.map((item, index) => (
        <ul key={index}>{item.id}</ul>
      ))}
    </div>
  );
}
