import React, { useEffect, useRef, useState } from 'react';

// Enhanced count up with prefix/suffix, decimals, stagger support
const AnimatedNumber = ({
  value,
  duration = 1200,
  formatter,
  prefix = '',
  suffix = '',
  decimals = 0,
  stagger = 0,
  className = ''
}) => {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer;
    const el = ref.current;
    if (!el) return;

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const start = performance.now();
          const from = 0;
          const to = parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;

          const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const currentValue = progress * (to - from) + from;
            setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));
            if (progress < 1) requestAnimationFrame(tick);
          };

          // Apply stagger delay
          setTimeout(() => requestAnimationFrame(tick), stagger);
          observer.disconnect();
        }
      });
    };

    observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    observer.observe(el);

    return () => observer && observer.disconnect();
  }, [value, duration, stagger, isVisible]);

  const displayValue = formatter ? formatter(count) : `${prefix}${count}${suffix}`;

  return <span ref={ref} className={className}>{displayValue}</span>;
};

export default AnimatedNumber;
