import { useState } from 'react';
import './App.css';
import jsonData from '../storage/key_value_stores/default/results.json';

function HeaderAndSelector({ handleChange }) {
  return (
    <>
      <h1 className='header'>Netflix Web Show Recommender</h1>
      <div className='genre-selector'>
        <select onChange={handleChange} className='select-genre'>
          <option value=''>Select your genre</option>
          {jsonData[0].genre.map((genre, key) => {
            return (
              <option key={key} value={key}>
                {genre}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value) setCount(parseInt(value));
  };

  // Validate count to ensure it is within the bounds of the jsonData.shows array
  const isValidCount = count !== null && count <= jsonData[0].shows.length;

  return (
    <div className='app-container'>
      <HeaderAndSelector handleChange={handleChange} />
      <div className='shows-container'>
        {isValidCount && (
          <>
            <div className='shows-list'>
              <ul>
                {jsonData[0].shows[count].slice(0, 20).map((show, index) => (
                  <li key={index} className='show-item'>
                    {show}
                  </li>
                ))}
              </ul>
            </div>
            <div className='shows-list'>
              <ul>
                {jsonData[0].shows[count].slice(20).map((show, index) => (
                  <li key={index} className='show-item'>
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
