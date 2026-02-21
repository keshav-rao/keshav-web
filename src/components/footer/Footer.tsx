"use client";

import React, { useRef } from 'react';
import './Footer.css';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const container = useRef<HTMLDivElement>(null);
    const brandingText = "KESHAV";

    useGSAP(() => {
        gsap.from(".branding-char", {
            scrollTrigger: {
                trigger: ".footer-branding",
                start: "top 80%",
                toggleActions: "play none none reset"
            },

            y: 100,
            opacity: 0,
            duration: 1,
            ease: "bounce.out",
            stagger: 0.1
        });
    }, { scope: container });

    return (
        <footer id="contact" className="footer" ref={container}>
            <div className="footer-container">
                <div className="footer-main-content">
                    <div className="footer-top">
                        <div className="cta-section">
                            <h2 className="cta-title">
                                Latest make the <br /> <span className="italic">Difference</span> together
                            </h2>
                            <a href="mailto:keshavrao887@gmail.com" className="email-button">
                                Send a Mail <ArrowRight size={20} className="arrow-icon" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-column">
                            <h3 className="column-label">Menu</h3>

                            <div className="column-links">
                                <a href="#home">Home</a>
                                <a href="#projects">Projects</a>
                                <a href="#story">Story</a>
                            </div>


                        </div>
                        <div className="footer-column">
                            <h3 className="column-label">Socials</h3>
                            <div className="column-links">
                                <a href="https://www.linkedin.com/in/keshav--s/">Linkedin</a>
                                <a href="https://github.com/keshav-rao">Github</a>
                                <a href="https://cssbattle.dev/player/o1ifsDdEJ7cq23H9zME8ro3cXWN2">CSS Battle</a>
                            </div>
                        </div>
                        <div className="footer-column">
                            <h3 className="column-label">Contact</h3>
                            <div className="column-links">
                                <a href="mailto:keshavrao887@gmail.com">keshavrao887@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="footer-branding">
                    <h1 className="branding-text">
                        {brandingText.split("").map((char, index) => (
                            <span key={index} className="branding-char">
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </footer>
    );
};




export default Footer;

