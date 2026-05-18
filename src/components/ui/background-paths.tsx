"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-primary"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
    slogan = "",
}: {
    title?: string;
    slogan?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter flex items-center justify-center" dir="ltr">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-primary to-[#553637]"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                    
                    {slogan && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 font-light"
                        >
                            {slogan}
                        </motion.p>
                    )}

                    <div className="inline-block group mt-8">
                        <Button
                            asChild
                            variant="outline"
                            className="relative rounded-2xl px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-white hover:bg-white/90 text-primary transition-all duration-300 
                            group-hover:-translate-y-0.5 shadow-md hover:shadow-lg border border-primary/20"
                        >
                            <a href="#services">
                                <div
                                    className={cn(
                                        "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
                                        "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
                                    )}
                                >
                                    <motion.div
                                        className={cn(
                                            "absolute aspect-square bg-gradient-to-r from-transparent via-primary to-primary"
                                        )}
                                        animate={{
                                            offsetDistance: ["0%", "100%"],
                                        }}
                                        style={{
                                            width: 24,
                                            offsetPath: `rect(0 auto auto 0 round 16px)`,
                                        }}
                                        transition={{
                                            repeat: Number.POSITIVE_INFINITY,
                                            duration: 5,
                                            ease: "linear",
                                        }}
                                    />
                                </div>
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity relative z-10 flex items-center">
                                    اكتشف خدماتنا
                                    <span
                                        className="mr-3 opacity-70 group-hover:opacity-100 group-hover:-translate-x-1.5 
                                        transition-all duration-300 transform rotate-180 relative z-10"
                                    >
                                        →
                                    </span>
                                </span>
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
