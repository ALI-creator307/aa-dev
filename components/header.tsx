'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Dancing_Script } from 'next/font/google'
import { useEffect, useState } from 'react'

const brandScript = Dancing_Script({ subsets: ['latin'], weight: ['600', '700'] })

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
]

function Logo() {
    return (
        <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group flex flex-col leading-none select-none shrink-0"
        >
            {/* Script wordmark — animates in once on mount with a soft rise + fade */}
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`${brandScript.className} text-3xl sm:text-[2.15rem] text-foreground`}
            >
                Asad <span className="text-primary">Ali</span>
            </motion.span>
            {/* Animated swash underline — draws itself in on mount, and redraws on hover */}
            <svg viewBox="0 0 140 12" className="w-[5.5rem] sm:w-24 -mt-1">
                <motion.path
                    d="M2 6 Q 35 1, 70 5.5 T 138 5"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary/60"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                    whileHover={{ pathLength: [0, 1], transition: { duration: 0.5 } }}
                />
            </svg>
        </motion.a>
    )
}

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState('Home')

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Scroll-spy: figure out which section's top has passed a reference
    // line just below the fixed header, and highlight that one. This is
    // driven directly by scroll position rather than IntersectionObserver
    // thresholds, which were too narrow a band to reliably fire across
    // sections of very different heights — that's what left the active
    // link stuck instead of updating as you scrolled.
    //
    // The sections themselves don't exist in the DOM yet when this effect
    // first runs — Landing renders the intro loader first and only mounts
    // #home, #about, etc. a couple of seconds later. So this waits (via
    // MutationObserver) for all of them to actually appear before wiring
    // up the scroll listener, instead of giving up immediately.
    useEffect(() => {
        let cleanupListeners: (() => void) | null = null

        function trySetup(): boolean {
            const sections = navItems
                .map((item) => document.querySelector<HTMLElement>(item.href))
                .filter((el): el is HTMLElement => el !== null)

            if (sections.length < navItems.length) return false

            let ticking = false

            function updateActiveSection() {
                const reference = window.scrollY + 140 // clears the fixed header height
                const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

                let current = sections[0]
                for (const section of sections) {
                    if (section.offsetTop <= reference) {
                        current = section
                    }
                }
                if (atBottom) {
                    current = sections[sections.length - 1]
                }

                const match = navItems.find((item) => item.href === `#${current.id}`)
                if (match) setActive(match.name)
                ticking = false
            }

            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(updateActiveSection)
                    ticking = true
                }
            }

            updateActiveSection()
            window.addEventListener('scroll', onScroll, { passive: true })
            window.addEventListener('resize', updateActiveSection)
            cleanupListeners = () => {
                window.removeEventListener('scroll', onScroll)
                window.removeEventListener('resize', updateActiveSection)
            }
            return true
        }

        if (trySetup()) {
            return () => cleanupListeners?.()
        }

        const observer = new MutationObserver(() => {
            if (trySetup()) {
                observer.disconnect()
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            observer.disconnect()
            cleanupListeners?.()
        }
    }, [])

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled || isOpen ? 'glass' : 'bg-background/60 border-b border-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-7">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                    setActive(item.name)
                                    setIsOpen(false)
                                }}
                                className={`link-underline text-sm font-medium whitespace-nowrap transition-colors ${active === item.name
                                    ? 'text-primary link-underline--active'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA (desktop) */}
                    <motion.a
                        href="#contact"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="group relative hidden lg:inline-flex items-center gap-1.5 overflow-hidden px-5 py-2.5 rounded-full border border-primary/40 text-primary text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
                        <span className="relative">Let&apos;s Work Together</span>
                        <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>

                    {/* Mobile toggle */}
                    <motion.button
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsOpen((v) => !v)}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground overflow-hidden"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center justify-center"
                            >
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="md:hidden overflow-hidden border-t border-border glass"
                    >
                        <nav className="flex flex-col px-4 sm:px-6 py-4 gap-1 max-h-[70vh] overflow-y-auto">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                        setActive(item.name)
                                        setIsOpen(false)
                                    }}
                                    className={`px-2 py-3 rounded-lg text-base font-medium transition-colors ${active === item.name ? 'text-primary bg-secondary' : 'text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <motion.a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                className="group relative mt-2 inline-flex items-center justify-center gap-1.5 overflow-hidden px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                            >
                                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
                                <span className="relative">Let&apos;s Work Together</span>
                                <ArrowUpRight size={15} className="relative" />
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}