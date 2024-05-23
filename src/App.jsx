import { useState } from "react";
import "./App.css";
import jsonData from "../storage/datasets/default/000000001.json";

function App() {
  const [count, setCount] = useState();
  const handleChange = (event) => {
    setCount(event.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="header">Netflix Web Show Recommender</h1>
      <div className="genre-selector">
        <select onChange={handleChange} className="select-genre">
          <option value="">Select your genre</option>
          {jsonData.genre.map((genre, key) => {
            return (
              <option key={key} value={key}>
                {genre}
              </option>
            );
          })}
        </select>
      </div>
      <div className="shows-container">
        {count && (
          <>
            <div className="shows-list">
              <ul>
                {jsonData.shows[count].slice(0, 20).map((show, index) => (
                  <li key={index} className="show-item">
                    {show}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shows-list">
              <ul>
                {jsonData.shows[count].slice(20).map((show, index) => (
                  <li key={index} className="show-item">
                    {show}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
