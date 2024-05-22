import { pointerDisplay, guides } from '../components/modelrendering';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import path from 'path'; // Path manipulation - not used now that its been outdated.

interface Position {
  title: string;
  pos1: {
    x: number;
    y: number;
    z: number;
  };
  pos2: {
    x: number;
    y: number;
    z: number;
  };
}

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Position[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('positions.json');
      const data = await response.json();
      setPositions(data);
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  console.log(positions)
  const handleClick = () => {
    const filteredResults = positions.filter((position) =>
      position.title.toLowerCase().includes(searchText.toLowerCase())
    );
    guides.splice(0, guides.length); //removes exisitng guides

    for (let i = 0; i < filteredResults.length; i++){
      let result = filteredResults[i];
      const v1 = result.pos1;
      const v2 = result.pos2;
      const vector1 = new THREE.Vector3(v1['x'],v1['y'],v1['z'])
      const vector2 = new THREE.Vector3(v2['x'],v2['y'],v2['z'])
      pointerDisplay(vector1, vector2);
    }
    const enhancedResults = filteredResults.map((result) => {
      if (result.pos1) { // Check if pos1 exists before accessing it
        return {
          ...result, // Spread existing properties
          pos1Data: result.pos1, // Add pos1 data as a new property
        };
      }
      return result; // Return the original result if pos1 is not present
    });

    setSearchResults(enhancedResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search positions..."
        value={searchText}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.title}>
              {/* Access other attributes here */}
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;