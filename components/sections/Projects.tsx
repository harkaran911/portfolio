"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import CyberButton from "@/components/three/CyberButton";

const projects = [
  {
    id: "01",
    title: "Home SOC Lab",
    subtitle: "Wazuh SIEM + Attack Detection",
    description:
      "A fully functional home Security Operations Center (SOC) lab built to simulate real-world attacks, detect them using a SIEM, and map findings to the MITRE ATT&CK framework. Covers attack simulation, log analysis, alert triage, and threat hunting.",
    tags: ["Wazuh", "SIEM", "MITRE ATT&CK", "Threat Detection", "Linux", "Network Security", "SOC"],
    github: "https://github.com/harkaran911/wazuh-siem-lab",
    color: "#00f5ff",
    accent: "#00ff88",
    highlights: [
      "Real-world attack simulation & detection",
      "MITRE ATT&CK framework mapping",
      "Custom Wazuh detection rules",
      "Full SOC workflow implementation",
    ],
  },
  {
    id: "02",
    title: "CipherNexus",
    subtitle: "Steganography & Cryptography Suite",
    description:
      "A browser-based steganography and cryptography learning suite combining interactive visualizations, practical tools, and real-world attack references. Teaches data hiding, steganalysis, encryption modes, hashing, disk encryption, and password cracking.",
    tags: ["Cryptography", "Steganography", "Browser-based", "JavaScript", "Security Education", "LSB", "AES"],
    github: "https://github.com/harkaran911/CipherNexus",
    color: "#ff007a",
    accent: "#9400ff",
    highlights: [
      "Interactive crypto & stego visualizations",
      "Real-world attack references",
      "LSB steganography & steganalysis",
      "Encryption modes & password cracking",
    ],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        <div
          className="relative p-6 md:p-8 h-full flex flex-col gap-6 border bg-[rgba(0,10,20,0.7)] backdrop-blur-sm transition-all duration-300 cursor-default"
          style={{
            borderColor: `${project.color}40`,
            boxShadow: `0 0 20px ${project.color}15, inset 0 0 20px ${project.color}05`,
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.color}40, inset 0 0 30px ${project.color}10`;
            (e.currentTarget as HTMLElement).style.borderColor = `${project.color}80`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${project.color}15, inset 0 0 20px ${project.color}05`;
            (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
          }}
        >
          <div className="absolute top-0 right-0 w-6 h-6" style={{ background: project.color, opacity: 0.6 }} />
          <div className="absolute top-0 right-0 w-5 h-5 bg-[#05050f]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          <div className="absolute bottom-0 left-0 w-6 h-6" style={{ background: project.color, opacity: 0.4 }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 bg-[#05050f]" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-tech text-xs tracking-widest" style={{ color: project.color }}>
                  PROJECT_{project.id}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.color}60, transparent)`, width: "40px" }} />
              </div>
              <h3 className="font-orbitron text-xl md:text-2xl font-bold text-[#e0e8ff]">{project.title}</h3>
              <p className="font-mono-tech text-xs mt-1" style={{ color: project.accent }}>
                {project.subtitle}
              </p>
            </div>

            <motion.span
              className="font-orbitron text-5xl md:text-6xl font-black opacity-10 select-none"
              style={{ color: project.color }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {project.id}
            </motion.span>
          </div>

          <p className="font-exo text-[#a0aec0] text-sm leading-relaxed">{project.description}</p>

          <div className="flex flex-col gap-2">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}` }} />
                <span className="font-mono-tech text-[11px] text-[#6b7db3]">{h}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono-tech text-[10px] px-2 py-0.5 border text-[#6b7db3]"
                style={{ borderColor: `${project.color}30`, background: `${project.color}08` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2 mt-auto">
            <CyberButton href={project.github} variant={index === 0 ? "cyan" : "pink"}>
              [GITHUB]
            </CyberButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono-tech text-xs text-[#ff007a] tracking-[0.3em]">02.</span>
          <h2 className="font-orbitron text-3xl font-bold text-[#e0e8ff]">PROJECTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[rgba(255,0,122,0.4)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-mono-tech text-xs text-[#6b7db3] tracking-widest">
            [MORE OPERATIONS IN PROGRESS...]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
