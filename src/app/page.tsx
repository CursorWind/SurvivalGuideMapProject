"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import '../app/globals.css'
const ThreeGlobe = dynamic(() => import('../components/modelrendering'), { ssr: false });


const Home = () => {
  return (
    <><ThreeGlobe/> 
    </>
  );
};

export default Home;
