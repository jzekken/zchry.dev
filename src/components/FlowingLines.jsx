import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlowingLines() {
  const svgRef = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);

  useEffect(() => {
    if (!path1Ref.current || !path2Ref.current) return;

    // Get the total length of the paths
    const length1 = path1Ref.current.getTotalLength();
    const length2 = path2Ref.current.getTotalLength();

    // Set initial stroke properties
    gsap.set([path1Ref.current], {
      strokeDasharray: length1,
      strokeDashoffset: length1,
    });
    
    gsap.set([path2Ref.current], {
      strokeDasharray: length2,
      strokeDashoffset: length2,
    });

    // Create the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smooth scrubbing
      }
    });

    tl.to(path1Ref.current, {
      strokeDashoffset: 0,
      ease: 'none',
    }, 0);

    tl.to(path2Ref.current, {
      strokeDashoffset: 0,
      ease: 'none',
    }, 0.1);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div style={{
      position: 'absolute', // Scroll with the page
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0, // Behind most things
      opacity: 0.2
    }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 6000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={path1Ref}
          d="M -100,0 C 300,500 800,1000 200,2000 S 1000,3000 500,4000 S -200,5000 300,6000"
          fill="none"
          stroke="var(--accent-yellow)"
          strokeWidth="4"
          style={{ transition: 'stroke 0.3s ease' }}
        />
        <path
          ref={path2Ref}
          d="M 1200,0 C 900,600 300,1200 1000,2200 S 100,3200 800,4200 S 1400,5200 600,6200"
          fill="none"
          stroke="var(--accent-blue-bright)"
          strokeWidth="4"
          style={{ transition: 'stroke 0.3s ease' }}
        />
      </svg>
    </div>
  );
}
