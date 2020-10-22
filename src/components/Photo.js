import React, { useEffect } from "react";
import { useState } from "react";

export default function Photo() {
  const [photo, setPhoto] = useState([]);
  const photoFetch = () => {
    fetch(`https://nba-players.herokuapp.com/players/${query}`)
      .then((response) => setPhoto(response.url))
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    photoFetch();
  }, []);

  return (
    <div>
      <p>
        <img src={photo} />
      </p>
    </div>
  );
}
