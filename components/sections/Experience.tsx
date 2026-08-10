"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CyberButton from "@/components/three/CyberButton";

const timeline = [
  {
    period: "2024 — PRESENT",
    role: "Independent Security Researcher",
    org: "Home Lab / Self-Directed",
    color: "#00f5ff",
    type: "RESEARCH",
    points: [
      "Built a fully functional home SOC with Wazuh SIEM for attack detection",
      "Simulated real-world adversarial TTPs and mapped to MITRE ATT&CK",
      "Developed CipherNexus — an interactive cryptography & steganography learning platform",
      "Studied network forensics, malware behavior, and log analysis",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Cybersecurity Learner",
    org: "Self-Directed",
    color: "#ff007a",
    type: "EDUCATION",
    points: [
      "Completed hands-on labs in penetration testing, web security, and cryptography",
      "Studied OWASP Top 10, network protocols, and intrusion detection systems",
      "Built proficiency in Kali Linux, Wireshark, Burp Suite, and Python scripting",
      "Participated in CTF challenges and security communities",
    ],
  },
  {
    period: "ONGOING",
    role: "Cybersecurity Certifications",
    org: "Continuous Learning",
    color: "#9400ff",
    type: "CERTS",
    points: [
      "CompTIA Security+ (in progress)",
      "Studying SOC Analyst Level 1 curriculum",
      "TryHackMe & Hack The Box labs",
      "Blue Team / SOC-focused learning path",
    ],
  },
];

type TimelineEntry = typeof timeline[0];

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -40 }}
      animate={itemInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12"
    >
      <motion.div
        className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full -translate-x-1/2"
        style={{
          backgroundColor: item.color,
          boxShadow: `0 0 12px ${item.color}, 0 0 24px ${item.color}60`,
        }}
        animate={{
          boxShadow: [
            `0 0 8px ${item.color}, 0 0 16px ${item.color}60`,
            `0 0 16px ${item.color}, 0 0 32px ${item.color}80`,
            `0 0 8px ${item.color}, 0 0 16px ${item.color}60`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
      />

      <div
        className="p-5 border bg-[rgba(0,10,20,0.6)]"
        style={{
          borderColor: `${item.color}30`,
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="font-mono-tech text-[10px] tracking-widest" style={{ color: item.color }}>
            {item.period}
          </span>
          <span
            className="font-mono-tech text-[10px] px-2 py-0.5 border tracking-widest"
            style={{ borderColor: `${item.color}40`, color: item.color }}
          >
            {item.type}
          </span>
        </div>
        <h3 className="font-orbitron text-lg font-bold text-[#e0e8ff] mb-1">{item.role}</h3>
        <p className="font-mono-tech text-xs text-[#6b7db3] mb-4">{item.org}</p>
        <ul className="flex flex-col gap-2">
          {item.points.map((pt, j) => (
            <li key={j} className="flex items-start gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}
              />
              <span className="font-exo text-[#a0aec0] text-sm">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono-tech text-xs text-[#ff007a] tracking-[0.3em]">03.</span>
          <h2 className="font-orbitron text-3xl font-bold text-[#e0e8ff]">EXPERIENCE</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[rgba(148,0,255,0.4)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative">
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #00f5ff44, #ff007a44, #9400ff44)" }}
              />

              <div className="flex flex-col gap-12">
                {timeline.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div
              className="p-6 border border-[rgba(0,245,255,0.2)] bg-[rgba(0,10,20,0.6)] flex flex-col gap-6"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
            >
              <div className="font-mono-tech text-xs text-[#00f5ff] tracking-widest">[RESUME.PDF]</div>
              <div className="flex flex-col gap-3">
                <p className="font-exo text-[#a0aec0] text-sm">
                  Full resume available on request. Covers lab work, projects, skills, and security learning path.
                </p>
                <div className="h-px bg-gradient-to-r from-[#00f5ff40] to-transparent" />
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { label: "FORMAT", value: "PDF" },
                  { label: "LAST UPDATED", value: "2026" },
                  { label: "STATUS", value: "AVAILABLE" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">{label}</span>
                    <span className="font-mono-tech text-[10px] text-[#00f5ff] tracking-widest">{value}</span>
                  </div>
                ))}
              </div>

              <CyberButton
                variant="cyan"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                REQUEST CV
              </CyberButton>
            </div>

            <div
              className="p-6 border border-[rgba(255,0,122,0.2)] bg-[rgba(0,10,20,0.6)]"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)" }}
            >
              <div className="font-mono-tech text-xs text-[#ff007a] tracking-widest mb-4">[FOCUS.AREAS]</div>
              <div className="flex flex-col gap-3">
                {[
                  { area: "Blue Team / SOC", color: "#00f5ff" },
                  { area: "Threat Detection", color: "#00f5ff" },
                  { area: "Security Research", color: "#ff007a" },
                  { area: "Cryptography", color: "#9400ff" },
                  { area: "Incident Response", color: "#00ff88" },
                ].map(({ area, color }) => (
                  <div key={area} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span className="font-mono-tech text-xs text-[#a0aec0]">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
