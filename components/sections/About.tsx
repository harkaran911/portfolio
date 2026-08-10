"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "SIEM & Log Analysis", level: 90, color: "#00f5ff", tag: "Wazuh, Splunk" },
  { name: "Threat Detection", level: 88, color: "#00f5ff", tag: "MITRE ATT&CK" },
  { name: "Network Security", level: 80, color: "#ff007a", tag: "Wireshark, nmap" },
  { name: "Cryptography", level: 85, color: "#9400ff", tag: "AES, RSA, Hashing" },
  { name: "Steganography", level: 82, color: "#9400ff", tag: "LSB, Steganalysis" },
  { name: "Penetration Testing", level: 75, color: "#ff007a", tag: "Kali, Metasploit" },
  { name: "Python", level: 78, color: "#00ff88", tag: "Automation, Tools" },
  { name: "Linux / Bash", level: 85, color: "#00ff88", tag: "Debian, Arch" },
  { name: "Incident Response", level: 80, color: "#00f5ff", tag: "Forensics, IR Plans" },
  { name: "Web Security", level: 72, color: "#ff007a", tag: "OWASP, XSS, SQLi" },
];

const tools = [
  "Wazuh", "Splunk", "Wireshark", "nmap", "Metasploit",
  "Burp Suite", "Kali Linux", "Python", "Bash", "Git",
  "MITRE ATT&CK", "Suricata", "OpenSSL", "John the Ripper", "Volatility",
];

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
          />
          <span className="font-mono-tech text-xs text-[#e0e8ff]">{skill.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-tech text-[10px] text-[#6b7db3]">{skill.tag}</span>
          <span className="font-mono-tech text-xs" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}`,
          }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
              boxShadow: `0 0 8px ${skill.color}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono-tech text-xs text-[#ff007a] tracking-[0.3em]">01.</span>
          <h2 className="font-orbitron text-3xl font-bold text-[#e0e8ff]">ABOUT</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,245,255,0.4)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div
              className="relative p-6 border border-[rgba(0,245,255,0.2)] bg-[rgba(0,10,20,0.6)]"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)" }}
            >
              <div className="absolute top-0 right-0 w-5 h-5 border-b-2 border-l-2 border-[#00f5ff]" style={{ transform: "translate(0,0)" }} />

              <div className="font-mono-tech text-xs text-[#00f5ff] mb-4 tracking-widest">[BIO.INIT]</div>
              <div className="flex flex-col gap-4 font-exo text-[#a0aec0] text-sm leading-relaxed">
                <p>
                  I&apos;m <span className="text-[#00f5ff] font-semibold">Harkaran Singh</span> (call me Karan) — a
                  cybersecurity enthusiast obsessed with understanding how systems fail so I can stop them from doing so.
                </p>
                <p>
                  My approach is hands-on and adversarial by design. I build real lab environments, simulate attacks,
                  trace them through SIEM dashboards, and map every finding to the{" "}
                  <span className="text-[#ff007a]">MITRE ATT&amp;CK</span> framework.
                </p>
                <p>
                  From standing up a{" "}
                  <span className="text-[#9400ff]">Wazuh-powered SOC lab</span> to building browser-based
                  cryptography tools, I learn by breaking and building — because the best defense is knowing the offense.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "2+", label: "PROJECTS", color: "#00f5ff" },
                { value: "∞", label: "CURIOSITY", color: "#ff007a" },
                { value: "100%", label: "DEFENDER", color: "#9400ff" },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 p-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(0,10,20,0.4)]"
                >
                  <span
                    className="font-orbitron text-2xl font-bold"
                    style={{ color, textShadow: `0 0 10px ${color}` }}
                  >
                    {value}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">{label}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="font-mono-tech text-xs text-[#6b7db3] tracking-widest mb-3">[TOOLKIT]</div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <motion.span
                    key={tool}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="font-mono-tech text-[10px] px-3 py-1 border border-[rgba(0,245,255,0.25)] text-[#6b7db3] hover:text-[#00f5ff] hover:border-[#00f5ff] transition-all cursor-default"
                    style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="font-mono-tech text-xs text-[#6b7db3] tracking-widest">[SKILL.MATRIX]</div>
            <div className="flex flex-col gap-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
