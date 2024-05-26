"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import SearchComponent from '../components/search'; // Replace with actual path
import '../app/globals.css'
const ThreeGlobe = dynamic(() => import('../components/modelrendering'), { ssr: false });


const Home = () => {
  return (
    <div className='bg-white w-full h-full'><ThreeGlobe/> 
    <SearchComponent/>
    </div>
  );
};

export default Home;
