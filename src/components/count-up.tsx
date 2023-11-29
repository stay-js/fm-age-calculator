'use client';

import { useEffect, useState } from 'react';

export const CountUp: React.FC<{ end: number }> = ({ end }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => setCount(0), [end]);

  useEffect(() => {
    if (count >= end) return;

    const interval = setInterval(() => setCount((value) => value + 1), 50);

    return () => clearInterval(interval);
  }, [count, end]);

  return <>{count}</>;
};
