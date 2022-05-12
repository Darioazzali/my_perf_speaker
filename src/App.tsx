import React, { useEffect, useState } from "react";
import "./App.css";
import Tutorial from "./component/card/Tutorial";
import Navbar from "./component/navbar/Navbar";
import db from "./database";
function App() {
  const cerca = (event: React.FormEvent<HTMLInputElement>) => {
    setSearched(event.currentTarget.value);
  };

  useEffect(() => {
     /* try {
      fetch("https://intonationstudio.com/api/tutorials")
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    } */
    const database = db;
  }, []);

  const [searched, setSearched] = useState("");

  return (
    <div className="App">
      <Navbar search={cerca} />
      <div className="container">
        {db
          .filter((tutorial) =>
            tutorial.name.toUpperCase().includes(searched.toUpperCase())
          )
          .map((tutorial) => {
            return (
              <Tutorial
                title={tutorial.name}
                audios={tutorial.audios}
                key={tutorial.id}
                className="container"
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
