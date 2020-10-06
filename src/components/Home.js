import React, { useState } from "react";

function Home() {
  const [name, setName] = useState("Thad");

  return (
    <div>
      <p>Your name is {name}</p>
      <button onClick={() => setName("Seth")}>Click me</button>
      <button onClick={() => setName("Thad")}>Reset</button>
    </div>
  );
}

export default Home;
