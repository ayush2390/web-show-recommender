import { useState } from "react";
import "./App.css";
import jsonData from "../storage/key_value_stores/default/results.json";

function App() {
  const [count, setCount] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setCount(value === "" ? null : parseInt(value));
  };

  // Validate count to ensure it is within the bounds of the jsonData.shows array
  const isValidCount =
    count !== null && count >= 0 && count < jsonData[0].shows.length;

  return (
    <div className="app-container">
      <h1 className="header">Netflix Web Show Recommender</h1>
      <div className="genre-selector">
        <select onChange={handleChange} className="select-genre">
          <option value="">Select your genre</option>
<<<<<<< HEAD
          {jsonData[0].genre.map((genre, key) => {
=======
          {jsonData.genre.map((genre, key) => {
>>>>>>> 224d8338624441a43dcf33d43e1eee486a7e4016
            return (
              <option key={key} value={key}>
                {genre}
              </option>
            );
          })}
        </select>
      </div>
      <div className="shows-container">
<<<<<<< HEAD
        {isValidCount && (
          <>
            <div className="shows-list">
              <ul>
                {jsonData[0].shows[count].slice(0, 20).map((show, index) => (
=======
        {count && (
          <>
            <div className="shows-list">
              <ul>
                {jsonData.shows[count].slice(0, 20).map((show, index) => (
>>>>>>> 224d8338624441a43dcf33d43e1eee486a7e4016
                  <li key={index} className="show-item">
                    {show}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shows-list">
              <ul>
<<<<<<< HEAD
                {jsonData[0].shows[count].slice(20).map((show, index) => (
=======
                {jsonData.shows[count].slice(20).map((show, index) => (
>>>>>>> 224d8338624441a43dcf33d43e1eee486a7e4016
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
