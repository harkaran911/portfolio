"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import CyberButton from "@/components/three/CyberButton";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const ProfileAvatar3D = dynamic(() => import("@/components/three/ProfileAvatar3D"), { ssr: false });

const CLIP = "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <h1
        className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight"
        style={{
          color: "#00f5ff",
          textShadow: glitching
            ? "2px 0 #ff007a, -2px 0 #9400ff, 0 0 20px #00f5ff"
            : "0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.5)",
          transition: "text-shadow 0.1s",
          animation: glitching ? "glitch-skew 0.3s steps(1) forwards" : "none",
        }}
      >
        {text}
      </h1>
      {glitching && (
        <>
          <h1
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight absolute inset-0"
            style={{ color: "#ff007a", clipPath: "inset(30% 0 50% 0)", transform: "translate(-3px, 0)", opacity: 0.7 }}
            aria-hidden
          >{text}</h1>
          <h1
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight absolute inset-0"
            style={{ color: "#9400ff", clipPath: "inset(60% 0 20% 0)", transform: "translate(3px, 0)", opacity: 0.7 }}
            aria-hidden
          >{text}</h1>
        </>
      )}
    </div>
  );
}

function TypewriterText({ phrases }: { phrases: string[] }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, deleting, phraseIdx, phrases]);

  return (
    <span className="font-mono-tech text-[#00ff88]">
      {displayed}
      <span className="animate-pulse text-[#00f5ff]">█</span>
    </span>
  );
}

function Profile3DCard() {
  const [useFallback, setUseFallback] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(springX, [-0.5, 0.5], [15, 85]);
  const glowY = useTransform(springY, [-0.5, 0.5], [15, 85]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,245,255,0.22) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Mouse-following inner glow */}
        <motion.div
          className="absolute inset-0"
          style={{ background: glowBg, clipPath: CLIP }}
        />

        {/* Outer ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: CLIP,
            boxShadow: "0 0 40px rgba(0,245,255,0.15), inset 0 0 30px rgba(0,245,255,0.06)",
          }}
        />

        {/* Frame border */}
        <div
          className="absolute inset-0 border-2 border-[rgba(0,245,255,0.55)]"
          style={{ clipPath: CLIP }}
        />

        {/* Corner brackets */}
        {[
          "top-2 left-2 border-t-2 border-l-2",
          "top-2 right-2 border-t-2 border-r-2",
          "bottom-2 left-2 border-b-2 border-l-2",
          "bottom-2 right-2 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 ${cls} border-[#00f5ff] z-20`}
            style={{ boxShadow: "0 0 10px #00f5ff" }}
          />
        ))}

        {/* Photo or 3D fallback */}
        {useFallback ? (
          <ProfileAvatar3D />
        ) : (
          <img
            src="/profile.jpg"
            alt="Harkaran Singh"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{
              clipPath: CLIP,
              filter: "brightness(0.88) contrast(1.08) saturate(0.92)",
            }}
            onError={() => setUseFallback(true)}
          />
        )}

        {/* CRT scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            clipPath: CLIP,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,10,0.1) 2px, rgba(0,0,10,0.1) 4px)",
          }}
        />

        {/* Bottom name gradient bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none flex items-end justify-center pb-3"
          style={{
            clipPath: CLIP,
            background: "linear-gradient(to top, rgba(0,5,20,0.92) 0%, transparent 100%)",
          }}
        >
          <span
            className="font-mono-tech text-xs text-[#00f5ff] tracking-widest"
            style={{ textShadow: "0 0 10px #00f5ff" }}
          >
            HARKARAN SINGH
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,15,0.8) 100%)",
        }}
      />

      <div
        className="absolute left-0 right-0 h-px z-2 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
          animation: "scan-line 6s linear infinite",
          opacity: 0.4,
        }}
      />

      <div className="section-container relative z-10 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full bg-[#00ff88]"
                style={{ boxShadow: "0 0 8px #00ff88, 0 0 16px #00ff88" }}
              />
              <span className="font-mono-tech text-xs text-[#00ff88] tracking-[0.3em] uppercase">
                SYSTEM ONLINE — THREAT LEVEL: 0
              </span>
            </div>

            <GlitchText text="HARKARAN SINGH" />

            <div className="flex flex-col gap-1">
              <p className="font-orbitron text-lg sm:text-xl text-[#ff007a] tracking-widest"
                style={{ textShadow: "0 0 10px #ff007a" }}>
                CYBERSECURITY ENTHUSIAST
              </p>
              <p className="font-mono-tech text-sm text-[#6b7db3] tracking-wide">
                <TypewriterText
                  phrases={[
                    "Preventing systems from breaking.",
                    "Building home SOC labs.",
                    "Mapping threats to MITRE ATT&CK.",
                    "Breaking crypto to understand it.",
                    "Watching every packet.",
                  ]}
                />
              </p>
            </div>

            <p className="font-exo text-[#a0aec0] max-w-lg leading-relaxed text-sm sm:text-base">
              Security researcher by passion, builder by nature. I architect home labs,
              detect adversarial TTPs, and build tools that demystify the dark art of
              offensive security — all from the defender&apos;s side.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <CyberButton
                variant="cyan"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                VIEW PROJECTS
              </CyberButton>
              <CyberButton
                variant="pink"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                CONTACT ME
              </CyberButton>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <a
                href="https://github.com/harkaran911"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-xs text-[#6b7db3] hover:text-[#00f5ff] transition-colors tracking-widest"
              >
                [GITHUB]
              </a>
              <span className="text-[#6b7db3]">//</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-xs text-[#6b7db3] hover:text-[#ff007a] transition-colors tracking-widest"
              >
                [LINKEDIN]
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <Profile3DCard />

            <div
              className="bg-[rgba(0,5,15,0.8)] border border-[rgba(0,245,255,0.2)] p-4 w-72 sm:w-80"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              {[
                { label: "DESIGNATION", value: "HARKARAN SINGH" },
                { label: "CODENAME", value: "KARAN" },
                { label: "ROLE", value: "CYBER OPS" },
                { label: "STATUS", value: "ACTIVE" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-[rgba(0,245,255,0.1)] last:border-0">
                  <span className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">{label}</span>
                  <span
                    className="font-mono-tech text-[10px] text-[#00f5ff] tracking-widest"
                    style={{ textShadow: "0 0 6px #00f5ff" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono-tech text-[10px] text-[#6b7db3] tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00f5ff] to-transparent" />
      </motion.div>
    </section>
  );
}
