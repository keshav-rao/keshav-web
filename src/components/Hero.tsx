"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-line span", {
            y: 100,
            opacity: 0,
            rotate: 5,
            stagger: 0.1,
            duration: 1.5,
        })
            .from(".hero-sub", {
                opacity: 0,
                y: 20,
                duration: 1,
            }, "-=1")
            .from(".hero-cta", {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
            }, "-=0.5");
    }, { scope: container });

    return (
        <section
            ref={container}
            className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tighter leading-none mb-8">
                    <div className="hero-line overflow-hidden"><span className="inline-block">IK CREEËR WEBSITES</span></div>
                    <div className="hero-line overflow-hidden"><span className="inline-block">DIE JE BIJ ZULLEN</span></div>
                    <div className="hero-line overflow-hidden text-accent italic"><span className="inline-block">BLIJVEN</span></div>
                </h1>

                <div className="max-w-2xl">
                    <p className="hero-sub text-xl md:text-2xl text-foreground/70 mb-10 leading-relaxed font-inter">
                        Ik ben een creatieve freelancer die onvergetelijke ervaringen creëert.
                        Waar design en beleving samenkomen om echt impact te maken.
                    </p>

                    <div className="hero-cta flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-accent text-black font-bold rounded-full hover:scale-105 transition-transform">
                            Mijn Werk
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                            Neem Contact Op
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
