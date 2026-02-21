"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

        // Position tracking
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const setPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const xSetter = gsap.quickSetter(cursor, "x", "px");
        const ySetter = gsap.quickSetter(cursor, "y", "px");
        const rotateSetter = gsap.quickSetter(cursor, "rotate", "deg");
        const scaleXSetter = gsap.quickSetter(cursor, "scaleX");
        const scaleYSetter = gsap.quickSetter(cursor, "scaleY");

        const moveCursor = (e: MouseEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
        };

        window.addEventListener('mousemove', moveCursor);

        // Animation Loop
        const tickerFunc = () => {
            const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());

            setPos.x += (pos.x - setPos.x) * dt;
            setPos.y += (pos.y - setPos.y) * dt;

            const dx = pos.x - setPos.x;
            const dy = pos.y - setPos.y;
            const vel = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            xSetter(setPos.x);
            ySetter(setPos.y);
            rotateSetter(angle);

            // Jelly scaling
            const scaleValue = Math.min(vel * 0.015, 0.7);
            scaleXSetter(1 + scaleValue);
            scaleYSetter(1 - scaleValue * 0.5);

            // Ensure visibility after first move
            if (gsap.getProperty(cursor, "scale") === 0) {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
        };

        gsap.ticker.add(tickerFunc);

        // Event delegation for hover effects
        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .cursor-pointer')) {
                gsap.to(cursor, {
                    scale: 3,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    duration: 0.3
                });
            }
        };

        const handleOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .cursor-pointer')) {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'black',
                    duration: 0.3
                });
            }
        };

        window.addEventListener('mouseover', handleOver);
        window.addEventListener('mouseout', handleOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleOver);
            window.removeEventListener('mouseout', handleOut);
            gsap.ticker.remove(tickerFunc);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="cursor"
        />
    );
}
