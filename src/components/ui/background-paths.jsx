import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PATHS = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  width: 0.5 + index * 0.03,
  duration: 18 + (index % 8) * 1.8,
  delay: (index % 6) * 0.6,
}));

const FEATURE_PILLS = [
  "Performance marketing",
  "Brand systems",
  "Creative campaigns",
];

function getPath(position, index) {
  return `M-${380 - index * 5 * position} -${189 + index * 6}C-${
    380 - index * 5 * position
  } -${189 + index * 6} -${312 - index * 5 * position} ${
    216 - index * 6
  } ${152 - index * 5 * position} ${343 - index * 6}C${
    616 - index * 5 * position
  } ${470 - index * 6} ${684 - index * 5 * position} ${
    875 - index * 6
  } ${684 - index * 5 * position} ${875 - index * 6}`;
}

function FloatingPaths({ position }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none">
        {PATHS.map((path) => (
          <motion.path
            key={`${position}-${path.id}`}
            d={getPath(position, path.id)}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeLinecap="round"
            initial={{ pathLength: 0.2, opacity: 0.15 }}
            animate={{
              pathLength: 1,
              opacity: [0.15, 0.4, 0.15],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Alpenrose Digital Solutions",
}) {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_34%),radial-gradient(circle_at_80%_25%,_rgba(244,114,182,0.18),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#020617_55%,_#030712_100%)]" />
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,_black,_transparent_80%)]">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="absolute inset-0 text-cyan-200/20">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-sm uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl"
        >
          Growth Systems For Modern Brands
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl text-5xl font-semibold leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
        >
          We help ambitious businesses scale with digital marketing, brand
          positioning, and campaigns designed to turn attention into revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group h-auto rounded-full border border-white/10 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:bg-cyan-100"
          >
            <a href="#contact">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>

          <a
            href="#services"
            className="inline-flex items-center rounded-full border border-white/[0.15] bg-white/5 px-6 py-4 text-base font-medium text-white/80 backdrop-blur-xl transition-colors duration-300 hover:bg-white/10 hover:text-white"
          >
            Explore Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl sm:p-6"
        >
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {FEATURE_PILLS.map((pill) => (
              <div
                key={pill}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
              >
                {pill}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/[0.45]"
      >
        Scroll
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-3 w-1 rounded-full bg-white/70" />
        </span>
      </motion.a>
    </div>
  );
}
