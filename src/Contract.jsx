import { useState, useEffect } from 'react'
import { motion } from "framer-motion";

const Contract = () => {
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = "PjnAt1xajfcg8bQoU8XpdpR3RANuKyy7NhUZTyxugnd";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        // Optionally, reset the copied status after a short delay
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Copy failed", error);
      });
  };

  // State to track screen width
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Check screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Set to false if width is less than 1024px
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={'contract-wrapper'} onClick={handleCopy}
      initial={{ scale: 0.8 }} // Start at 0.8
      animate={isLargeScreen ? { scale: [0.8, 1.2] } : {}} // Apply animation only if screen is large
      transition={{
        scale: {
          repeat: Infinity, // Repeat infinitely
          repeatType: "loop", // Loop the scale animation
          duration: 0.5, // Duration for one cycle of scaling
          // ease: "linear",
        },
      }}
      whileHover={{
        scale: 1, // While hovered, stop the scaling at 1
        transition: { duration: 0.5 }, // Quick transition when hovering
      }}
    >
      <p>
        CA: PjnAt1xajfcg8bQoU8XpdpR3RANuKyy7NhUZTyxugnd
      </p>
      {isCopied ? <div className='copied-text'>Copied!</div> : null}
    </motion.div>
  )
}

export default Contract
