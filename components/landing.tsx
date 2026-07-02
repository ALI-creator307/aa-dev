'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, type MotionValue, type Variants } from 'framer-motion'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { useRef, useState, type MouseEvent, type ReactNode, type SVGProps } from 'react'
import {
    ArrowRight,
    ArrowUpRight,
    Boxes,
    CheckCircle2,
    ChevronDown,
    Code2,
    Database,
    ExternalLink,
    Globe,
    Layers,
    Mail,
    PenTool,
    Rocket,
    Smartphone,
    Sparkles,
    Users,
} from 'lucide-react'

// Script-style display font used only for the "Asad Ali" brand wordmark
// (intro loader here, and the navbar logo via the matching snippet
// provided separately) — keeps the signature/logo feel distinct from the
// body's Space Grotesk heading font.
const brandScript = Dancing_Script({ subsets: ['latin'], weight: ['600', '700'] })

/* ------------------------------------------------------------------ */
/* Small inline social / brand icons — lucide dropped brand marks in   */
/* v1, so social + WhatsApp marks are inline SVGs instead.             */
/* ------------------------------------------------------------------ */

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    )
}
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}
function XIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}
function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
    )
}

/* ------------------------------------------------------------------ */
/* Shared primitives                                                    */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <p className="font-mono text-xs font-semibold text-primary tracking-widest uppercase">
            {children}
        </p>
    )
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

// About — stat cards pop in with a springy scale instead of a plain fade.
const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

// Services — cards slide in from alternating sides.
const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const slideInRight: Variants = {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// Tech Stack — icons pop with a small spin, like tiles snapping into place.
// Duration-based (not spring) since up to 15 of these can animate at once.
const popSpin: Variants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -12 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
}

// Deployment — a quick skewed slide, faster and snappier than the rest.
const skewIn: Variants = {
    hidden: { opacity: 0, y: 20, skewY: 3 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

/* Section wrapper that gives every section its own quiet, distinct
   backdrop instead of one flat page-wide color. */
function SectionBg({
    tone = 'plain',
}: {
    tone?: 'plain' | 'tint' | 'dots'
}) {
    if (tone === 'tint') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-secondary/40" />
                <div className="drift-a absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-primary/10 blur-3xl" />
                <div className="drift-b absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
            </div>
        )
    }
    if (tone === 'dots') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="dot-grid-pan absolute inset-0 bg-dot-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
            </div>
        )
    }
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="drift-c absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Intro Loader — Apple-style "signature draw" splash screen           */
/* ------------------------------------------------------------------ */

function IntroLoader({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.04,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-background overflow-hidden"
        >
            {/* Soft background depth so the screen isn't flat white */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 -z-10 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-primary/[0.07] blur-3xl" />
                <div className="absolute inset-0 bg-dot-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_55%_45%_at_50%_50%,black,transparent)]" />
            </motion.div>

            {/* Script wordmark — reads clearly as a name, not a monogram */}
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`${brandScript.className} text-6xl sm:text-7xl leading-none text-foreground`}
            >
                Asad <span className="text-primary">Ali</span>
            </motion.p>

            {/* Animated swash underline, drawn beneath the wordmark */}
            <svg viewBox="0 0 220 20" className="w-40 sm:w-52 -mt-1">
                <motion.path
                    d="M4 10 Q 60 2, 110 9 T 216 8"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary/60"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                />
            </svg>

            {/* Subtitle fades in once the swash has landed */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-xs sm:text-sm font-semibold text-muted-foreground tracking-[0.3em] uppercase pt-2"
            >
                Full Stack Web Developer
            </motion.p>

            {/* Loading progress line — fills, then the whole screen exits */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 88 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.65, 0, 0.35, 1] }}
                className="h-[3px] rounded-full bg-primary mt-2"
                onAnimationComplete={() => setTimeout(onComplete, 300)}
            />
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

const socialLinks = [
    { icon: GithubIcon, href: '#', label: 'GitHub' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: XIcon, href: '#', label: 'X (Twitter)' },
    { icon: Mail, href: 'mailto:asadali.dev@gmail.com', label: 'Email' },
] as const

/* Satellite tech chips that orbit the portrait — the signature element
   of the hero. Rather than a generic gradient panel behind the figure,
   the stack he actually builds with floats around him: it's a visual
   the concept could not be mistaken for any other developer's hero
   without also being his. Each chip drifts independently (gentle bob +
   micro-rotation) so the cluster reads as alive, not a static sticker
   sheet. Positioned in percentages so it scales cleanly across the
   portrait's responsive aspect box — mobile offsets are kept small so
   the chips stay inside the section's clipped bounds instead of being
   cut off by overflow-hidden, then widen out at sm+. */
const orbitTech = [
    {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        style: 'top-[5%] left-[1%] sm:left-[-13%]',
        float: { y: [0, -9, 0], x: [0, 4, 0], rotate: [0, 3, 0] },
        duration: 6,
        delay: 0,
    },
    {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        style: 'top-[34%] right-[1%] sm:right-[-14%]',
        float: { y: [0, 8, 0], x: [0, -4, 0], rotate: [0, -3, 0] },
        duration: 6.8,
        delay: 0.5,
    },
    {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        style: 'bottom-[32%] left-[-7%] sm:left-[-15%]',
        float: { y: [0, 9, 0], x: [0, 4, 0], rotate: [0, 3, 0] },
        duration: 6.4,
        delay: 1,
    },
    {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        style: 'bottom-[6%] right-[-5%] sm:right-[-12%]',
        float: { y: [0, -8, 0], x: [0, -4, 0], rotate: [0, -3, 0] },
        duration: 5.6,
        delay: 1.5,
    },
] as const

/* Workbench backdrop — the hero image now sits on a "compiled" stage
   instead of a soft pastel aurora: a faint graph-paper grid (the same
   texture an editor's canvas would have), one restrained indigo glow,
   and two hairline orbit rings that pay off the satellite tech chips
   sitting on top of them. Pink/purple rainbow blobs are gone — every
   color here is either --primary or the single --accent signal green,
   so the figure reads as the only bold thing in frame. */
function HeroShapes() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-[6%] rounded-[2.5rem] bg-graph-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_45%,black,transparent)]" />

            <motion.div
                animate={{ opacity: [0.45, 0.7, 0.45] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62%] h-[62%] rounded-full bg-primary/[0.14] blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[10%] right-[6%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-accent/20 blur-2xl"
            />

            <motion.svg
                viewBox="0 0 400 400"
                animate={{ rotate: 360 }}
                transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[6%] w-[88%] h-[88%]"
            >
                <circle cx="200" cy="200" r="188" fill="none" className="stroke-primary/20" strokeWidth="1.5" strokeDasharray="1.5 15" strokeLinecap="round" />
            </motion.svg>
            <motion.svg
                viewBox="0 0 400 400"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[13%] w-[74%] h-[74%]"
            >
                <circle cx="200" cy="200" r="188" fill="none" className="stroke-accent/25" strokeWidth="1" strokeDasharray="1 11" />
            </motion.svg>

            {/* Small plus marks for a touch of texture in the empty corners */}
            <svg viewBox="0 0 24 24" className="absolute bottom-[16%] left-[6%] w-4 h-4 text-primary/40">
                <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 24 24" className="absolute top-[14%] right-[8%] w-3.5 h-3.5 text-accent/60">
                <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

/* Boxless hero portrait: the Aurora Halo drifts behind it, a live
   mouse-tracked 3D tilt makes the figure feel like it's floating in
   space, and a ring of tech chips orbits the frame — his actual stack,
   not decoration borrowed from a template. */
function HeroPortrait({
    parallaxY,
}: {
    parallaxY: MotionValue<number>
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 16 })
    const shiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 18 })
    const shiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 18 })

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const bounds = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - bounds.left) / bounds.width - 0.5)
        mouseY.set((e.clientY - bounds.top) / bounds.height - 0.5)
    }
    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto order-1 lg:order-2 flex w-full max-w-[15rem] sm:max-w-md lg:max-w-none lg:w-auto justify-center"
        >
            {/* Aurora Halo — drifts opposite the mouse for a subtle parallax feel */}
            <motion.div
                style={{ x: useTransform(shiftX, (v) => v * -0.5), y: useTransform(shiftY, (v) => v * -0.5) }}
                className="absolute inset-0"
            >
                <HeroShapes />
            </motion.div>

            {/* The figure itself — a transparent-background PNG with nothing
               around it: no card, no border, no frame. Just a soft blob glow
               sitting behind it, a live mouse-driven 3D tilt, and a shadow
               that follows its own silhouette. */}
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1200 }}
                className="relative mx-auto w-full sm:w-[90%] lg:w-auto"
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                    className="relative aspect-[2/3] w-full lg:w-auto lg:h-[620px] drop-shadow-[0_20px_28px_rgba(13,14,20,0.2)] sm:drop-shadow-[0_35px_45px_rgba(13,14,20,0.22)]"
                >
                    <Image
                        src="/hero7.png"
                        alt="Asad Ali — full stack web developer"
                        fill
                        priority
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 46vw, 420px"
                        className="object-contain"
                    />
                </motion.div>

                {/* Orbiting tech chips — his actual stack, floating around him.
                   Smaller footprint on mobile so they never crowd the figure
                   or spill outside the hero's clipped bounds. */}
                {orbitTech.map((tech) => (
                    <motion.div
                        key={tech.name}
                        animate={tech.float}
                        transition={{ duration: tech.duration, repeat: Infinity, ease: 'easeInOut', delay: tech.delay }}
                        className={`absolute ${tech.style} ${tech.name === 'Node.js' || tech.name === 'TypeScript' ? 'hidden sm:flex' : 'flex'} items-center gap-1 sm:gap-1.5 rounded-full border border-border/70 bg-card/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 shadow-lg shadow-black/5`}
                    >
                        <img src={tech.icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4 object-contain" loading="lazy" />
                        <span className="text-[9px] sm:text-[11px] font-semibold text-foreground/80 whitespace-nowrap">{tech.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    // Parallax: portrait + badges drift slower than the page scroll, dot-grid drifts opposite.
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 70])
    const bgY = useTransform(scrollYProgress, [0, 1], [0, -40])

    return (
        <section ref={heroRef} id="home" className="relative w-full overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-24">
            {/* Color is pushed out to the edges — top-left, top-right, and a
               low bottom-center pool — instead of one big center-screen blob.
               That keeps the copy column and the portrait sitting on clean,
               legible ground instead of a flat pink-purple wash. */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[26rem] h-[26rem] rounded-full bg-primary/[0.13] blur-[110px]" />
                <div className="absolute -top-24 -right-36 w-[30rem] h-[30rem] rounded-full bg-accent/[0.09] blur-[120px]" />
                <div className="absolute bottom-[-18%] left-[22%] w-[22rem] h-[22rem] rounded-full bg-primary/[0.06] blur-[100px]" />
                <div className="absolute inset-0 bg-dot-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_55%_42%_at_50%_4%,black,transparent)]" />
                {/* Fine grain — a printed-paper texture instead of a flat digital gradient */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-multiply">
                    <filter id="heroGrain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#heroGrain)" />
                </svg>
            </motion.div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-10 lg:gap-10 items-center">
                <HeroPortrait parallaxY={parallaxY} />

                {/* Left — copy, first on desktop, second on mobile */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="order-2 lg:order-1 space-y-5 sm:space-y-6 text-center lg:text-left">
                    <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-secondary text-foreground/80 text-[11px] sm:text-xs font-semibold tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                            </span>
                            Available for new projects
                        </span>
                    </motion.div>

                    {/* Lead-in — bolder color, wider tracking, uppercase label */}
                    <motion.p variants={fadeUp} className="text-sm sm:text-base font-bold text-primary tracking-[0.15em] uppercase">
                        Hi, I&apos;m
                    </motion.p>

                    {/* Headline — gradient sweep across the full name, tighter tracking, heavier weight */}
                    <motion.h1
                        variants={fadeUp}
                        className="font-heading text-4xl sm:text-6xl lg:text-[5.25rem] font-black leading-[1.02] tracking-tighter -mt-2 sm:-mt-3"
                    >
                        <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                            Asad Ali
                        </span>
                    </motion.h1>

                    {/* Role — underlined pill instead of plain text, more visual weight */}
                    <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
                        <span className="inline-flex items-center gap-2 text-sm sm:text-lg font-semibold text-foreground/90 border-b-2 border-primary/40 pb-1">
                            Full Stack Web Developer
                            <span className="blink-cursor h-4 sm:h-5 align-middle" />
                        </span>
                    </motion.div>

                    {/* Body copy — a bolded lead phrase carries the punch, a
                       decorative quote glyph replaces the flat border line,
                       and the numbers echo the stats in the About section
                       instead of generic "I help businesses..." copy. */}
                    <motion.div variants={fadeUp} className="relative max-w-[22rem] sm:max-w-md mx-auto lg:mx-0">
                        <span className="hidden lg:block absolute -left-2 -top-3 font-heading text-6xl text-primary/15 select-none" aria-hidden="true">
                            &ldquo;
                        </span>
                        <p className="relative text-sm sm:text-[17px] text-foreground/75 leading-[1.7] sm:leading-[1.75] font-medium">
                            I help businesses and individuals turn their ideas into modern web applications. From intuitive interfaces to reliable backend systems, I focus on building solutions that are fast, secure, and scalable.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                        <motion.a
                            href="#contact"
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ y: -3 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="group relative inline-flex items-center gap-2 overflow-hidden px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/35"
                        >
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
                            <span className="relative">Hire Me</span>
                            <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.a>
                        <motion.a
                            href="#projects"
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ y: -3 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-border px-6 py-3 sm:px-7 sm:py-3.5 font-bold text-sm text-foreground"
                        >
                            <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                            <span className="relative transition-colors duration-300 group-hover:text-primary-foreground">View My Work</span>
                            <ArrowRight size={16} className="relative transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-foreground" />
                        </motion.a>
                    </motion.div>

                    <motion.div variants={fadeUp} className="pt-2 sm:pt-3">
                        <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground/70 tracking-widest uppercase mb-2.5 sm:mb-3">Connect with me</p>
                        <div className="flex justify-center lg:justify-start gap-2.5 sm:gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={social.label}
                                        whileHover={{ y: -4, rotate: -8, scale: 1.08 }}
                                        whileTap={{ scale: 0.9, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground transition-colors hover:text-primary hover:border-primary/40 hover:shadow-md hover:shadow-primary/15"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

const stats = [
    { icon: Rocket, number: '2+', label: 'Years Experience', bg: 'bg-primary/10', fg: 'text-primary' },
    { icon: Boxes, number: '20+', label: 'Projects Built', bg: 'bg-primary/10', fg: 'text-primary' },
    { icon: Smartphone, number: '100%', label: 'Responsive Designs', bg: 'bg-accent/15', fg: 'text-accent' },
    { icon: Sparkles, number: '', label: 'Open For Freelance', bg: 'bg-accent/15', fg: 'text-accent' },
]

const skills = ['Clean & Efficient Code', 'Performance Optimization', 'Responsive & Modern Design', 'Problem Solving']

function About() {
    return (
        <section id="about" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="plain" />
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
                {/* Left */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="space-y-4 sm:space-y-5"
                >
                    <motion.div variants={fadeUp}>
                        <Eyebrow>About Me</Eyebrow>
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        className="font-heading text-2xl sm:text-4xl font-bold text-foreground leading-tight"
                    >
                        Passionate Developer Building Digital Solutions
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        I&apos;m a full-stack web developer with 2+ years of experience building modern,
                        responsive, and user-friendly websites and web applications. I love turning ideas
                        into real-world products.
                    </motion.p>

                    <motion.div variants={fadeUp} className="space-y-3 pt-1">
                        {skills.map((skill) => (
                            <div key={skill} className="flex items-center gap-3">
                                <CheckCircle2 className="text-primary shrink-0" size={18} />
                                <span className="text-sm font-medium text-foreground">{skill}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeUp} className="pt-3">
                        <motion.a
                            href="#contact"
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-border px-5 py-2.5 font-semibold text-sm text-foreground"
                        >
                            <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                            <span className="relative transition-colors duration-300 group-hover:text-primary-foreground">More About Me</span>
                            <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-foreground" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right — stat grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-2 gap-3 sm:gap-5"
                >
                    {stats.map((s) => {
                        const Icon = s.icon
                        return (
                            <motion.div
                                key={s.label}
                                variants={scaleIn}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="soft-card hover-lift p-4 sm:p-6"
                            >
                                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3 sm:mb-4`}>
                                    <Icon className={s.fg} size={18} />
                                </div>
                                {s.number ? (
                                    <>
                                        <p className="font-heading text-xl sm:text-3xl font-bold text-foreground">{s.number}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
                                    </>
                                ) : (
                                    <p className="font-heading text-base sm:text-xl font-bold text-foreground leading-snug">{s.label}</p>
                                )}
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Services                                                             */
/* ------------------------------------------------------------------ */

const services = [
    { title: 'Web Development', description: 'Building fast, responsive and modern websites.', icon: Globe, bg: 'bg-primary/10', fg: 'text-primary' },
    { title: 'Frontend Development', description: 'Creating interactive and user-friendly interfaces.', icon: Code2, bg: 'bg-primary/10', fg: 'text-primary' },
    { title: 'Backend Development', description: 'Building secure and scalable server-side applications.', icon: Database, bg: 'bg-accent/15', fg: 'text-accent' },
    { title: 'UI/UX Design', description: 'Designing intuitive and beautiful user experiences.', icon: PenTool, bg: 'bg-accent/15', fg: 'text-accent' },
]

function Services() {
    return (
        <section id="services" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="tint" />
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-9"
                >
                    <div>
                        <Eyebrow>What I Do</Eyebrow>
                        <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-3">
                            Services I Provide
                        </h2>
                    </div>
                    <motion.a
                        href="#contact"
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="group relative inline-flex items-center gap-2 self-start overflow-hidden rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground sm:self-auto"
                    >
                        <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        <span className="relative transition-colors duration-300 group-hover:text-primary-foreground">Discuss a Project</span>
                        <ArrowRight size={15} className="relative transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-foreground" />
                    </motion.a>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
                >
                    {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={service.title}
                                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                                whileHover={{ y: -6 }}
                                className="group soft-card hover-lift p-5 sm:p-6"
                            >
                                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                                    <Icon className={service.fg} size={20} />
                                </div>
                                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-2">{service.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                                <a href="#contact" className="group/link relative inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
                                    <span className="relative">
                                        Learn More
                                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 ease-out group-hover/link:w-full" />
                                    </span>
                                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
                                </a>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Tech Stack                                                           */
/* ------------------------------------------------------------------ */

const technologies = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
]

function TechStack() {
    return (
        <section id="tech-stack" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="dots" />
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-9"
                >
                    <div>
                        <Eyebrow>Tech Stack</Eyebrow>
                        <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-3">
                            Technologies I Use
                        </h2>
                    </div>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                >
                    {technologies.map((tech) => (
                        <motion.div
                            key={tech.name}
                            variants={popSpin}
                            whileHover={{ y: -6, scale: 1.08, rotate: -3 }}
                            className="hover-lift soft-card flex flex-col items-center justify-center gap-2 sm:gap-3 p-3.5 sm:p-5"
                        >
                            <img src={tech.icon} alt={tech.name} className="w-7 h-7 sm:w-9 sm:h-9 object-contain" loading="lazy" />
                            <p className="text-[11px] sm:text-xs font-medium text-muted-foreground text-center">{tech.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Work Experience                                                      */
/* ------------------------------------------------------------------ */

const experience = [
    {
        period: '2026 — Present',
        role: 'Full Stack Developer',
        org: 'Freelance',
        description: 'Working with clients worldwide to build robust web applications and scalable solutions.',
        current: true,
    },
    {
        period: '2025 — 2026',
        role: 'Frontend Developer',
        org: 'Tech Solutions',
        description: 'Built responsive user interfaces and improved performance across client projects.',
        current: false,
    },
    {
        period: '2024 — 2025',
        role: 'Junior Developer',
        org: 'Webify',
        description: 'Assisted in the development of websites and gained hands-on experience with modern tooling.',
        current: false,
    },
]

function Experience() {
    return (
        <section id="experience" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="plain" />
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
                {/* Left — timeline */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <motion.div variants={fadeUp}>
                        <Eyebrow>Experience</Eyebrow>
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        className="font-heading text-2xl sm:text-4xl font-bold text-foreground leading-tight mt-3 mb-8 sm:mb-10"
                    >
                        Work Experience
                    </motion.h2>

                    <div className="relative pl-7 sm:pl-8">
                        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
                        <div className="space-y-7 sm:space-y-9">
                            {experience.map((item) => (
                                <motion.div key={item.role} variants={fadeUp} className="relative">
                                    <span
                                        className={`absolute -left-7 sm:-left-8 top-1 w-2.5 h-2.5 rounded-full ring-4 ${item.current
                                            ? 'bg-primary ring-primary/15'
                                            : 'bg-card border-2 border-primary/50 ring-background'
                                            }`}
                                    />
                                    <p className="font-mono text-[11px] sm:text-xs font-semibold text-primary tracking-wide mb-1.5">{item.period}</p>
                                    <h3 className="font-heading text-sm sm:text-lg font-bold text-foreground">
                                        {item.role} <span className="text-muted-foreground font-medium">— {item.org}</span>
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right — your own image */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative"
                >
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                        <div className="w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-primary/[0.08] blur-3xl" />
                    </div>
                    <div className="relative aspect-square w-full max-w-[16rem] sm:max-w-md mx-auto">
                        <Image
                            src="/work-experience.png"
                            alt="Asad Ali at work"
                            fill
                            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 480px"
                            className="object-contain"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

interface Project {
    id: number | string
    title: string
    description: string
    technologies: string[]
    liveUrl?: string | null
    githubUrl?: string | null
    accent: string
    icon: typeof Code2
    image?: string
}

// Static demo data — deliberately not fetched from an external action, so
// this section can never crash or render a blank page if a backend call fails.
const projects: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Store',
        description: 'A full-stack eCommerce platform with an admin dashboard and payment gateway.',
        technologies: ['Next.js', 'Tailwind CSS', 'MongoDB'],
        liveUrl: 'https://www.perfumekart.store/',
        githubUrl: 'https://github.com',
        accent: 'from-violet-500 to-indigo-500',
        icon: Globe,
        image: '/project-ecommerce.png',
    },
    {
        id: 2,
        title: 'SaaS Analytics Dashboard',
        description: 'A SaaS dashboard with live analytics, billing, and user management.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        liveUrl: null,
        githubUrl: 'https://github.com',
        accent: 'from-sky-500 to-blue-500',
        icon: Database,
        image: '/project-saas.png',
    },
    {
        id: 3,
        title: 'Portfolio Website',
        description: 'A personal portfolio site built to showcase projects and skills.',
        technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
        liveUrl: null,
        githubUrl: 'https://github.com',
        accent: 'from-emerald-500 to-teal-500',
        icon: PenTool,
        image: '/project-portfolio.png',
    },
    {
        id: 4,
        title: 'Real-time Chat App',
        description: 'WebSocket-based messaging with authentication and presence indicators.',
        technologies: ['Socket.io', 'React', 'MongoDB'],
        liveUrl: null,
        githubUrl: 'https://github.com',
        accent: 'from-rose-500 to-pink-500',
        icon: Users,
        image: '/projects/chat-app.png',
    },
    {
        id: 5,
        title: 'Task Management Tool',
        description: 'Collaborative task boards with live updates across a team.',
        technologies: ['Next.js', 'PostgreSQL', 'GraphQL'],
        liveUrl: null,
        githubUrl: 'https://github.com',
        accent: 'from-amber-500 to-orange-500',
        icon: Layers,
        image: '/projects/task-manager.png',
    },
    {
        id: 6,
        title: 'Headless CMS',
        description: 'An API-first content platform with a clean editor experience.',
        technologies: ['Node.js', 'Express', 'Prisma'],
        liveUrl: null,
        githubUrl: 'https://github.com',
        accent: 'from-fuchsia-500 to-purple-500',
        icon: Boxes,
        image: '/projects/headless-cms.png',
    },
]

function ProjectCard({ project }: { project: Project }) {
    const Icon = project.icon
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 46, rotateX: -18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: -1 }}
            className="group soft-card hover-lift overflow-hidden h-full flex flex-col bg-card border-border"
        >
            {/* Cover — a real screenshot when one's provided, layered over
               the gradient + icon. The fallback stays underneath, so a
               missing image file never leaves a blank or broken card. */}
            <div className={`relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-br ${project.accent} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-20 bg-dot-grid" />
                <Icon className="text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" size={36} strokeWidth={1.5} />
                {project.image && (
                    <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary text-primary">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-4 mt-auto">
                    {project.liveUrl ? (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                        >
                            <span className="relative">
                                Live Demo
                                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 ease-out group-hover/link:w-full" />
                            </span>
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground/60 cursor-not-allowed">
                            Live Demo Coming Soon
                        </span>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Code <ExternalLink size={13} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

function Projects() {
    const [showAll, setShowAll] = useState(false)
    const visible = showAll ? projects : projects.slice(0, 3)

    return (
        <section id="projects" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-card/60 border-y border-border">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-9"
                >
                    <div>
                        <Eyebrow>Projects</Eyebrow>
                        <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-3">
                            My Recent Work
                        </h2>
                    </div>
                    {projects.length > 3 && (
                        <motion.button
                            type="button"
                            onClick={() => setShowAll((v) => !v)}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="group relative inline-flex items-center gap-2 self-start overflow-hidden rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground sm:self-auto"
                        >
                            <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                            <span className="relative transition-colors duration-300 group-hover:text-primary-foreground">
                                {showAll ? 'Show Less' : 'View All Projects'}
                            </span>
                            <ArrowRight
                                size={15}
                                className={`relative transition-transform duration-300 group-hover:text-primary-foreground ${showAll ? '-rotate-90' : 'group-hover:translate-x-1'}`}
                            />
                        </motion.button>
                    )}
                </motion.div>

                <motion.div
                    layout
                    style={{ perspective: 1200 }}
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {visible.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Deployment & Workflow                                                */
/* ------------------------------------------------------------------ */

const deployment = [
    { title: 'Vercel', description: 'Deploy frontend applications seamlessly.', logos: ['vercel'] },
    { title: 'Netlify', description: 'Build and deploy websites with ease.', logos: ['netlify'] },
    { title: 'Git & GitHub', description: 'Version control and collaboration made simple.', logos: ['git', 'github'] },
    { title: 'CI/CD', description: 'Automated testing and deployment workflow.', logos: ['githubactions'] },
    { title: 'ESLint & Prettier', description: 'Maintaining code quality and consistency.', logos: ['eslint', 'prettier'] },
    { title: 'Postman', description: 'API testing and development made easy.', logos: ['postman'] },
]

function Deployment() {
    return (
        <section className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="tint" />
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="max-w-2xl mb-8 sm:mb-9"
                >
                    <Eyebrow>Deployment &amp; Tools</Eyebrow>
                    <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-3">
                        Deployment &amp; Workflow
                    </h2>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
                >
                    {deployment.map((tool) => (
                        <motion.div key={tool.title} variants={skewIn} whileHover={{ y: -5 }} className="soft-card hover-lift p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-3">
                                {tool.logos.map((slug) => (
                                    <img
                                        key={slug}
                                        src={`https://cdn.simpleicons.org/${slug}`}
                                        alt=""
                                        className="w-5 h-5 object-contain"
                                        loading="lazy"
                                    />
                                ))}
                            </div>
                            <h3 className="text-sm font-bold text-foreground mb-1">{tool.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

const faqs = [
    {
        question: 'How long does a project take?',
        answer: 'It depends on scope — a landing page usually takes 1–2 weeks, while a full web app can take 4–8 weeks. After a quick discovery call I share a clear timeline before any work starts, so there are no surprises.',
    },
    {
        question: 'Can you redesign existing websites?',
        answer: 'Yes. I can rework the design and code of an existing site, or just refresh the parts that need it — improving performance, structure, and visuals while keeping the content and SEO you\u2019ve already built.',
    },
    {
        question: 'Do you build responsive websites?',
        answer: 'Always. Every project is built mobile-first and tested across phone, tablet, and desktop sizes, so the experience stays consistent no matter what device someone is using.',
    },
    {
        question: 'Do you provide maintenance?',
        answer: 'Yes — I offer ongoing maintenance plans that cover updates, bug fixes, and small feature requests after launch, plus one-off support if you just need help occasionally.',
    },
    {
        question: 'How do we communicate?',
        answer: 'Mainly over WhatsApp and email for quick updates, with scheduled video calls for planning and reviews. You\u2019ll always know what stage the project is at.',
    },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[number]; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div
            variants={fadeUp}
            className={`soft-card overflow-hidden transition-colors duration-200 hover:border-primary/30 ${isOpen ? 'border-primary/35' : ''}`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="group w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-4 py-3.5 sm:px-6 sm:py-5"
            >
                <span className={`font-heading text-sm sm:text-base font-bold transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {faq.question}
                </span>
                <span
                    className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-secondary text-muted-foreground group-hover:text-primary'}`}
                    style={{ transition: 'transform 0.25s ease, background-color 0.2s ease, color 0.2s ease' }}
                >
                    <ChevronDown size={14} />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
            <SectionBg tone="dots" />
            <div className="max-w-3xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mb-8 sm:mb-10"
                >
                    <Eyebrow>FAQ</Eyebrow>
                    <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-md mx-auto">
                        Answers to the questions clients ask most before starting a project.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="space-y-3 sm:space-y-3.5"
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={faq.question}
                            faq={faq}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Contact CTA band                                                     */
/* ------------------------------------------------------------------ */

const ctaPoints = [
    'Available for freelance projects',
    'Open to full-time opportunities',
    "Let's bring your ideas to life",
]

const WHATSAPP_NUMBER = '923240380147' // 0324 0380147 in international format
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Asad, I'd like to talk about a project.")}`

function Contact() {
    return (
        <section id="contact" className="px-4 sm:px-6 lg:px-8 pb-14 sm:pb-24">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-6xl mx-auto cta-band rounded-2xl sm:rounded-3xl px-5 py-8 sm:px-10 sm:py-12"
            >
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7 sm:gap-8">
                    <div className="max-w-md">
                        <p className="font-mono text-xs font-semibold text-accent tracking-widest uppercase mb-3">
                            Let&apos;s Work Together
                        </p>
                        <h2 className="font-heading text-xl sm:text-3xl font-bold text-white leading-tight mb-2">
                            Have a project in mind?
                        </h2>
                        <p className="text-sm text-white/60">Let&apos;s build something amazing together.</p>
                    </div>

                    <ul className="space-y-3">
                        {ctaPoints.map((point) => (
                            <li key={point} className="flex items-center gap-2.5 text-sm text-white/85">
                                <CheckCircle2 className="text-accent shrink-0" size={17} />
                                {point}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-start lg:items-end gap-3">
                        {/* Get In Touch → hover swaps the label for a WhatsApp icon with a
                           vertical parallax-style slide; the whole button always opens WhatsApp. */}
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Chat on WhatsApp: +${WHATSAPP_NUMBER}`}
                            className="group/cta relative inline-flex h-11 w-full sm:h-12 sm:w-48 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb855] hover:shadow-xl hover:shadow-[#25D366]/30"
                        >
                            <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-y-10 group-hover/cta:opacity-0">
                                Get In Touch <ArrowRight size={16} />
                            </span>
                            <span className="absolute inset-0 flex translate-y-10 items-center justify-center gap-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-y-0 group-hover/cta:opacity-100">
                                <WhatsappIcon className="h-4 w-4" /> Chat on WhatsApp
                            </span>
                        </a>
                        <a
                            href="mailto:asadali.dev@gmail.com"
                            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                        >
                            <Mail size={15} /> asadali.dev@gmail.com
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Export                                                               */
/* ------------------------------------------------------------------ */

export function Landing() {
    const [loading, setLoading] = useState(true)

    return (
        <>
            <AnimatePresence>
                {loading && <IntroLoader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <>
                    <Hero />
                    <About />
                    <Services />
                    <TechStack />
                    <Experience />
                    <Projects />
                    <Deployment />
                    <FAQ />
                    <Contact />
                </>
            )}
        </>
    )
}