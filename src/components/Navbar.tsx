"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Werk', href: '#werk' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-background/80 backdrop-blur-md py-3 border-b border-white/5" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-outfit font-bold tracking-tighter hover:text-accent transition-colors">
                    YOURWAVE<span className="text-accent">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-medium hover:text-accent transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-accent transition-colors"
                    >
                        Kennismaken
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden",
                isOpen ? "translate-y-0" : "-translate-y-full"
            )}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-outfit font-bold hover:text-accent transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="px-10 py-4 bg-white text-black font-bold rounded-full text-xl"
                >
                    Kennismaken
                </Link>
            </div>
        </nav>
    );
}
