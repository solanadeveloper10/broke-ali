import { useRef, useEffect } from 'react'
import { motion } from "framer-motion";

import Contract from './Contract'
import RocketAnimation from './RocketAnimation';

import './App.css'

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.controls = false; // Force-disable controls
    }
  }, []);

  return <>
    <div className='static-bg' />
    <div className='arab'>
      <img src="/arab.png" alt="Arabian men." />
    </div>
    <div className='dog'>
      <img src="/dog.png" alt="Dog." />
    </div>

    <RocketAnimation />

    <div className='wrapper'>
      <header className={'header loaded'}>
        <a href="https://x.com/BrokeAliCoin" target='_blank' className='social-link'>
          <img src="/icons/x.png" alt="X icon." className='social-link-image' />
        </a>
        <a href="https://t.me/BrokeAliCoin" target='_blank' className='social-link'>
          <img src="/icons/tg.png" alt="Telegram icon." className='social-link-image' />
        </a>
        <a href="https://www.dextools.io/app/en/solana/u3YZBTjSuChUSnLPnHsuHVGXnEp6mZt2HXXwhRXbrok" target='_blank' className='social-link'>
          <img src="/icons/dextools.png" alt="Dextools icon." className='social-link-image' />
        </a>
        <a href="https://dexscreener.com/solana/u3YZBTjSuChUSnLPnHsuHVGXnEp6mZt2HXXwhRXbrok" target='_blank' className='social-link'>
          <img src="/icons/dexscreener.png" alt="Dexscreener icon." className='social-link-image' />
        </a>
        <a href="https://raydium.io/swap/?inputMint=sol&outputMint=u3YZBTjSuChUSnLPnHsuHVGXnEp6mZt2HXXwhRXbrok" target='_blank' className='social-link'>
          <img src="/icons/raydium.png" alt="Raydium icon." className='social-link-image' />
        </a>
      </header>

      <motion.h1
        className='h1'
        animate={{
          color: ["#000000", "#ffffff", "#000000"], // Animate color between black and white
        }}
        transition={{
          duration: 0.5, // Duration for one full cycle (200ms per color)
          repeat: Infinity, // Repeat infinitely
          repeatType: "loop", // Continuous loop
        }}
        style={{ display: "inline" }} // Ensures the inline display of the heading
      >
        $BROKEALI
      </motion.h1>

      <Contract />
    </div>

  </>
}

export default App
