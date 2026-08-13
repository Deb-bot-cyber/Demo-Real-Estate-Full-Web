'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
}

function SingleStat({ value, suffix = '', label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1800; // ms
      const stepTime = Math.abs(Math.floor(duration / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) {
          clearInterval(timer);
          setCount(value);
        }
      }, Math.max(stepTime, 20));

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 flex items-center">
        <span>{count}</span>
        <span className="text-orange-500 font-normal">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-stone-500">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const stats: StatProps[] = [
    { value: 12, suffix: '+', label: 'Years of Experience' },
    { value: 850, suffix: '+', label: 'Properties Sold' },
    { value: 24, suffix: '', label: 'Prime Locations' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-stone-200">
      {stats.map((stat, idx) => (
        <SingleStat key={idx} {...stat} />
      ))}
    </div>
  );
}
