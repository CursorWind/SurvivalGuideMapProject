import { scene } from '../components/modelrendering';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

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

  const handleClick = () => {
    const filteredResults = positions.filter((position) =>
      position.title.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const TransparentPointerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4f00,    
      transparent: true,
      opacity: 0.5,
    });

    for (let i = 0; i < filteredResults.length; i++){
      let result = filteredResults[i];
      
      const v1 = result.pos1;
      const v2 = result.pos2;
      
      const midpoint = new THREE.Vector3();
      const distanceX = Math.abs(v1['x'] - v2['x']);
      const distanceY = Math.abs(v1['y'] - v2['y']);
      const distanceZ = Math.abs(v1['z'] - v2['z']);
      midpoint.x = (v1['x'] + v2['x']) / 2;
      midpoint.y = (v1['y'] + v2['y']) / 2;
      midpoint.z = (v1['z'] + v2['z']) / 2;
      
    //Sky pointer
    const geometry = new THREE.ConeGeometry( 10, 20, 4 );    
    const pyramid = new THREE.Mesh( geometry, TransparentPointerMaterial );
    pyramid.rotation.x = Math.PI;
    
    scene.add( pyramid );
    pyramid.position.y = -2000;

      const ng = new THREE.BoxGeometry(distanceX,distanceY,distanceZ)
      const guide = new THREE.Mesh(ng,TransparentPointerMaterial)
      guide.position.set(midpoint.x, midpoint.y, midpoint.z);
      scene.add(guide)
      pyramid.position.set(midpoint.x, 90, midpoint.z)

      
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
    <div className='fixed right-3 bottom-4'>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.title}>
              {result.title}
            </li>
          ))}
        </ul>
      )}<input
        type="text"
        placeholder="Search positions..."
        value={searchText}
        onChange={handleChange}
        className="text-white p-1 placeholder-slate-200 w-48 rounded-md fill-none border-white border-2 bg-transparent"        
      />
      <button className="ml-1" onClick={handleClick}>Search</button>
      
    </div>
  );
};

export default SearchBar;