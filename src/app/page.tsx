"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import SearchComponent from '../components/search'; // Replace with actual path
import '../app/globals.css'
import Branding from '../components/branding';
import spaceGrotesk from '../../public/fonts';
const ThreeGlobe = dynamic(() => import('../components/modelrendering'), { ssr: false });


const Home = () => {
  return (
    <div className={spaceGrotesk.className}>
    <div className='bg-white w-full h-full'><ThreeGlobe/> 
    <SearchComponent/>
    <Branding/>
    </div>
    </div>
  );
};

export default Home;
