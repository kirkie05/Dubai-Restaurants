"use client";

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function Reveal({
  children,
  className = "reveal-on-scroll",
  activeClass = "active",
  threshold = 0.1,
  triggerOnce = true
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? activeClass : ''}`}
    >
      {children}
    </div>
  );
}
