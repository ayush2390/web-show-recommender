import { useState } from "react";
import "./App.css";
import jsonData from "../storage/datasets/default/000000001.json";

function App() {
  const [count, setCount] = useState();
  const handleChange = (event) => {
    setCount(event.target.value);
  };

  return (
    <>
      <h1>Netflix Web Show recommender</h1>
      <div>
        <select onChange={handleChange}>
          <option value="">Select your genre</option>;
          {jsonData.genre.map((genre, key) => {
            return <option value={key}>{genre}</option>;
          })}
        </select>
      </div>
      <div style={{ display: "flex" }} className="lists">
        <div style={{ flex: "50%", paddingRight: "10px", textAlign: "left" }}>
          {count &&
            jsonData.shows[count].slice(0, 20).map((show) => <li>{show}</li>)}
        </div>
        <div style={{ flex: "50%", paddingLeft: "10px", textAlign: "left" }}>
          {count &&
            jsonData.shows[count].slice(20).map((show) => <li>{show}</li>)}
        </div>
      </div>
    </>
  );
}

export default App;
