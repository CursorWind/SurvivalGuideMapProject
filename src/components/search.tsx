import { pointerDisplay } from '../components/modelrendering';
import React from 'react';
import * as THREE from 'three';

const ButtonComponent = () => {
  const handleClick = () => {
    const vector1 = new THREE.Vector3(1, 2, 1);
    const vector2 = new THREE.Vector3(60, -50, 10);
    pointerDisplay(vector1, vector2);
  };

  return (
    <button onClick={handleClick}>Run Pointer Display</button>
  );
};

export default ButtonComponent;