"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import ButtonComponent from '../components/search'; // Replace with actual path
import '../app/globals.css'
const ThreeGlobe = dynamic(() => import('../components/modelrendering'), { ssr: false });


const Home = () => {
  return (
    <><ThreeGlobe/> 
    <ButtonComponent/>
    </>
  );
};

export default Home;
