"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import InteractiveGrid from '../InteractiveGrid/InteractiveGrid';
import './Hero.css';

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { contextSafe } = useGSAP({ scope: container });

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                clipPath: "circle(150% at 95% 5%)",
                duration: 1.2,
                ease: "power4.inOut",
            });
            gsap.fromTo(".menu-link",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power4.out",
                    delay: 0.4
                }
            );
        } else {
            gsap.to(menuRef.current, {
                clipPath: "circle(0% at 95% 5%)",
                duration: 1,
                ease: "power4.inOut",
            });
        }
    }, { dependencies: [isMenuOpen], scope: container });


    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-top-text", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2
        })
            .from(".hero-branding", {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
            }, "-=0.8")
            .from(".hero-scroll", {
                opacity: 0,
                y: 20,
                duration: 1,
            }, "-=1")
            .from(".side-bar", {
                x: 50,
                opacity: 0,
                duration: 1,
            }, "-=1");
    }, { scope: container });

    return (
        <section
            id="home"
            ref={container}
            className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 py-10 overflow-hidden bg-background"
        >
            <InteractiveGrid />
            {/* Top Text Header */}
            <div className="max-w-7xl mx-auto w-full pt-10">
                <h2 className="title hero-top-text">
                    <span className="block">I <span className="hero-italic">create</span> websites</span>
                    <span className="block">that will stay with you</span>
                </h2>
            </div>

            {/* Main Branding */}
            <div className="absolute inset-0 pointer-events-none">
                <h1 className="hero-name uppercase select-none">
                    Keshav
                </h1>
            </div>

            {/* Bottom Footer Area */}
            <div className="w-full flex justify-center pb-6">
                <span className="hero-scroll text-sm uppercase tracking-widest font-medium opacity-60">
                    Scroll for more
                </span>
            </div>

            {/* Right Side Bar */}
            <div className="side-bar fixed right-0 top-0 h-full w-16 md:w-20 flex flex-col justify-between items-center py-10 z-[60]">
                <div className="flex flex-col items-center gap-4">
                    {!isMenuOpen && (
                        <button
                            onClick={toggleMenu}
                            className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group"
                            style={{ marginTop: '20px', marginRight: '15px' }}
                        >
                            <span className="text-white font-bold text-xl font-outfit group-hover:rotate-90 transition-transform">=</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Menu Overlay */}
            <div
                ref={menuRef}
                className={`fixed inset-0 z-[100] flex items-start justify-end p-6 md:p-12 pointer-events-none ${isMenuOpen ? 'pointer-events-auto' : ''}`}
                style={{ clipPath: "circle(0% at 95% 5%)" }}
            >
                <div className="menu-container">
                    {/* Fixed Close Button */}
                    <div className="absolute top-8 right-8 pointer-events-auto">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMenu();
                            }}
                            className="close-button"
                        >
                            <span className="text-2xl leading-none">×</span>
                        </button>
                    </div>

                    <span className="menu-label">Menu</span>
                    <nav className="flex flex-col gap-2">
                        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="menu-link">Home</a>
                        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="menu-link">Projects</a>
                        <a href="#story" onClick={(e) => handleNavClick(e, 'story')} className="menu-link">Story</a>
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="menu-link">Contact</a>
                    </nav>


                </div>
            </div>
        </section>

    );
}
