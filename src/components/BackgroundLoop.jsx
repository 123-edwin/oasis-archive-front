import { useEffect, useRef, useState } from 'react';
import back1 from '../assets/back1.jpg';
import back2 from '../assets/back2.jpg';
import back3 from '../assets/back3.jpg';
import back4 from '../assets/back4.jpg';
import back5 from '../assets/back5.jpg';
import back6 from '../assets/back6.jpg';

const images = [back1, back2, back3, back4, back5, back6];

export default function BackgroundLoop() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 bg-black overflow-hidden"
    >
      <img
        src={images[index]}
        alt="background"
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
