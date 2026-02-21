"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./InteractiveGrid.css";

const InteractiveGrid: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dots: { x: number; y: number; scale: number; opacity: number }[] = [];

        // Configurable parameters
        const spacing = 45;
        const mouseRadius = 300;
        const dotBaseSize = 1.3;
        const dotMaxScale = 2.5;
        const dotBaseOpacity = 0.18;
        const dotMaxOpacity = 0.8;

        const mouse = { x: -1000, y: -1000 };
        const smoothMouse = { x: -1000, y: -1000 };

        // GSAP quickTo for ultra-smooth cursor tracking
        const xTo = gsap.quickTo(smoothMouse, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(smoothMouse, "y", { duration: 0.6, ease: "power3.out" });

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            initDots();
        };

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        scale: 1,
                        opacity: dotBaseOpacity
                    });
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            xTo(mouse.x);
            yTo(mouse.y);
        };

        const updateAndDraw = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                const dx = smoothMouse.x - dot.x;
                const dy = smoothMouse.y - dot.y;
                const distSq = dx * dx + dy * dy;
                const radiusSq = mouseRadius * mouseRadius;

                let targetScale = 1;
                let targetOpacity = dotBaseOpacity;

                if (distSq < radiusSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (mouseRadius - dist) / mouseRadius;
                    const quadForce = force * force; // Quadratic for a nicer "bulge"

                    targetScale = 1 + quadForce * dotMaxScale;
                    targetOpacity = dotBaseOpacity + quadForce * (dotMaxOpacity - dotBaseOpacity);
                }

                // Lerp for smooth transitions (mimicking GSAP feel with high performance)
                dot.scale += (targetScale - dot.scale) * 0.1;
                dot.opacity += (targetOpacity - dot.opacity) * 0.1;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotBaseSize * dot.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(17, 17, 17, ${dot.opacity})`; // Using --foreground color #111111
                ctx.fill();
            }
        };

        // Use GSAP ticker for the render loop for best performance and sync
        gsap.ticker.add(updateAndDraw);

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);

        resize();

        return () => {
            gsap.ticker.remove(updateAndDraw);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="interactive-grid-container">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default InteractiveGrid;
