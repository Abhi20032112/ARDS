import React, { useEffect, useState } from 'react';

// Lightweight typewriter that types the provided text then optionally loops through array of phrases
const AnimatedTypewriter = ({ texts = [], speed = 80, pause = 1200, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const typing = setInterval(() => {
      setSubIndex((prev) => prev + 1);
    }, speed);

    if (subIndex === texts[index].length) {
      clearInterval(typing);
      const timeout = setTimeout(() => {
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, pause);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(typing);
  }, [subIndex, index, texts, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span className={className} aria-hidden>
      {texts[index].substring(0, subIndex)}<span className={`inline-block w-0.5 h-6 align-middle ml-1 bg-current ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

export default AnimatedTypewriter;
