import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RocketWithBouncing = ({ size, initialX, initialY, speed, directionX, directionY }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [rotationSpeed, setRotationSpeed] = useState(5); // Default rotation speed

  useEffect(() => {
    // Dynamically adjust the rotation speed based on movement speed
    setRotationSpeed(5 / speed); // Adjust the rotation speed proportional to movement speed

    const handleBounce = () => {
      const handle = setInterval(() => {
        setPosition((prevPos) => {
          let newX = prevPos.x + directionX * 9; // Move 9 pixels per interval (3x faster than previous 3px)
          let newY = prevPos.y + directionY * 9; // Move 9 pixels per interval (3x faster than previous 3px)

          // Bounce when the rocket reaches the edges of the screen
          if (newX <= 0 || newX + size >= window.innerWidth) {
            directionX = -directionX; // Reverse X direction
          }

          if (newY <= 0 || newY + size >= window.innerHeight) {
            directionY = -directionY; // Reverse Y direction
          }

          return { x: newX, y: newY };
        });
      }, 16); // Update position every 16ms (~60fps)

      return () => clearInterval(handle);
    };

    return handleBounce();
  }, [directionX, directionY, size, speed]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}

      className="rocket"
      animate={{
        rotate: [0, 360], // Keep rotation speed constant
        scale: [0, 1], // Scale from 0 to 1 to make the rocket appear
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse", // Ensures the rocket bounces back and forth
        duration: 5, // Rotation duration stays constant
        ease: "linear",
        scale: { duration: 0.2 }, // 0.2s duration for a faster scaling effect (5x faster)
        rotate: { duration: rotationSpeed }, // Dynamic rotation speed based on movement speed
      }}
    />
  );
};

const RocketAnimation = () => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Limit to 25 rockets at a time
      if (rockets.length >= 25) return;

      const size = Math.random() * (300 - 100) + 100; // Random size between 100px and 300px
      const speed = Math.random() * 2 + 3; // Random speed between 3 and 5
      const initialX = Math.random() * window.innerWidth; // Random starting X position
      const initialY = Math.random() * window.innerHeight; // Random starting Y position
      const directionX = Math.random() > 0.5 ? 1 : -1; // Random direction (left or right)
      const directionY = Math.random() > 0.5 ? 1 : -1; // Random direction (up or down)

      setRockets((prevRockets) => [
        ...prevRockets,
        { size, speed, initialX, initialY, directionX, directionY },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [rockets]);

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: '-2' }}>
      {rockets.map((rocket, index) => (
        <RocketWithBouncing key={index} {...rocket} />
      ))}
    </div>
  );
};

export default RocketAnimation;
