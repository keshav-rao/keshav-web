"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loader.css";

interface LoaderProps {
    onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const statusListRef = useRef<HTMLUListElement>(null);
    const decodeTextRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onLoadingComplete) {
                    onLoadingComplete();
                }
            }
        });

        // 1. Animate the vertical list sliding up
        if (statusListRef.current) {
            const listItems = statusListRef.current.querySelectorAll("li");
            const totalItems = listItems.length;

            tl.to(statusListRef.current, {
                y: `-${(totalItems - 1) * 24}px`,
                duration: 4,
                ease: "none",
            });
        }

        // 2. Animate the percentage counter
        const proxy = { val: 0 };
        tl.to(proxy, {
            val: 100,
            duration: 4,
            ease: "power1.inOut",
            onUpdate: () => {
                const currentPercent = Math.floor(proxy.val);
                setPercent(currentPercent);
                if (percentRef.current) {
                    percentRef.current.innerText = currentPercent.toString().padStart(2, '0');
                }
            }
        }, 0);

        // 3. Text Scramble Logic
        const words = ["LOADING", "DECRYPTING", "SYNCHRONIZING", "ENTERING"];
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        let wordIndex = 0;

        const scrambleText = (text: string) => {
            let iteration = 0;
            const interval = setInterval(() => {
                if (decodeTextRef.current) {
                    decodeTextRef.current.innerText = text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) return text[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                }

                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
            return interval;
        };

        // Initial scramble
        scrambleText(words[0]);
        wordIndex++;

        const scrambleInterval = setInterval(() => {
            if (wordIndex < words.length) {
                scrambleText(words[wordIndex]);
                wordIndex++;
            } else {
                clearInterval(scrambleInterval);
            }
        }, 1000);

        // 4. Final Exit
        tl.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
                if (loaderRef.current) {
                    loaderRef.current.style.display = "none";
                }
            }
        });

        return () => {
            clearInterval(scrambleInterval);
            tl.kill();
        };
    }, [onLoadingComplete]);

    return (
        <div id="loader" ref={loaderRef}>
            <div className="loader-content">
                <div className="status-list-wrapper">
                    <ul className="status-list" ref={statusListRef}>
                        <li>// Initializing Neural Interface...</li>
                        <li>// Decrypting Data Streams...</li>
                        <li>// Synchronizing Parallel Realities...</li>
                        <li>// Transmitting Quantum Signals...</li>
                        <li>// Unlocking Digital Dimensions...</li>
                    </ul>
                </div>

                <div className="decode-text" ref={decodeTextRef}>
                    INITIALIZING...
                </div>

                <div className="progress-wrap">
                    <span id="percent" ref={percentRef}>00</span>%
                </div>
            </div>
        </div>
    );
};

export default Loader;
