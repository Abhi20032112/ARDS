import React, { useEffect, useRef, useState } from 'react';

// Simple count up when element is in viewport
const AnimatedNumber = ({ value, duration = 1200, formatter }) => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let observer;
    const el = ref.current;
    if (!el) return;

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const from = 0;
          const to = parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;

          const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            setCount(Math.floor(progress * (to - from) + from));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      });
    };

    observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    observer.observe(el);

    return () => observer && observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{formatter ? formatter(count) : count}</span>;
};

export default AnimatedNumber;
