"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Projects.css';

import Project1 from '@/images/Project 1.png';
import Project2 from '@/images/Project 2.png';
import Project3 from '@/images/Project 3.png';
import Project4 from '@/images/Project 4.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: "StyleAI",
        tags: ["Comming Soon", "Under Development", "AI", "Fashion"],
        image: Project1,
        link: "#"
    },
    {
        title: "BusBites",
        tags: ["Comming Soon", "Under Development", "Food", "App"],
        image: Project2,
        link: "#"
    },
    {
        title: "Iswaran",
        tags: ["Web", "Development", "Divin"],
        image: Project3,
        link: "https://www.iswaran.com/"
    },
    {
        title: "Project Nizhal",
        tags: ["Comming Soon", "Under Development", "Test Software"],
        image: Project4,
        link: "#"
    }
];

export default function Projects() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animation for project cards
        gsap.from(".project-card", {
            y: 30,
            stagger: 0.2,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".project-container",
                start: "top 90%",
            }
        });

        // Animation for Experience heading, View All button and VIEW PROJECT (drift left)
        gsap.from([".heading", ".view-all", ".viewproject"], {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }, { scope: container });

    return (
        <section
            id="projects"
            ref={container}
            className="py-32 px-6 md:px-12 mx-4 md:mx-8 bg-background border-t border-black/5 rounded-[2rem] md:rounded-[4rem]"
        >

            <div className="">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="heading font-bold uppercase">
                        PROJECTS
                    </h2>
                    <button className="view-all lowercase">
                        view all -
                    </button>
                </div>

                <div className="project-container">
                    {projects.map((project, idx) => {
                        const isWide = idx % 4 === 0 || idx % 4 === 3;
                        return (
                            <div key={idx} className={cn("project-card group cursor-none transition-all duration-700", isWide ? "card-wide" : "card-narrow")}>
                                <div className="relative overflow-hidden rounded-3xl mb-0 project-card-inner bg-white p-[15px]">
                                    <a
                                        href={project.link}
                                        target={project.link.startsWith('http') ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="relative w-full h-full block overflow-hidden rounded-2xl cursor-none"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-all duration-700 project-image"
                                        />

                                        <div className="project-overlay">
                                            <div className="flex gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="project-tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="project-tag-label">PROJECT</span>
                                                    <h3 className="project-card-title">
                                                        <span className="font-bold">{project.title.split(' ')[0]}</span>{' '}
                                                        <span className="italic font-light font-serif">{project.title.split(' ').slice(1).join(' ')}</span>
                                                    </h3>
                                                </div>
                                                <div className="project-arrow-btn">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white w-5 h-5 md:w-6 md:h-6">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
