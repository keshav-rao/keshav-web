"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Marquee.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const marqueeItems = [
    "BRANDING",
    "DEVELOPMENT",
    "ANIMATIONS",
    "CREATIVE",
    "STRATEGY",
    "IMMERSE",
];

export default function Marquee() {
    const container = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!slider.current || !container.current) return;

        // Moves 50% of its width (the duplicated portion) linked to scroll
        gsap.to(slider.current, {
            x: "-50%",
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom", // Starts when container enters viewport
                end: "bottom top",    // Ends when container leaves viewport
                scrub: 1,          // Smoothly links motion to scroll speed/direction
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="marquee-section">
            <div className="marquee-wrapper">
                <div ref={slider} className="marquee-slider">
                    {/* Render twice for seamless loop */}
                    {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                        <div key={idx} className="marquee-item">
                            <span className="marquee-dash">—</span>
                            <span className="marquee-text">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
