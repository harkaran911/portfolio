"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import CyberButton from "@/components/three/CyberButton";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const inputClasses = `
    w-full bg-[rgba(0,5,15,0.8)] border border-[rgba(0,245,255,0.2)]
    text-[#e0e8ff] font-mono-tech text-sm px-4 py-3
    focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_12px_rgba(0,245,255,0.3)]
    placeholder:text-[#6b7db3] transition-all duration-200
  `;

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono-tech text-xs text-[#ff007a] tracking-[0.3em]">04.</span>
          <h2 className="font-orbitron text-3xl font-bold text-[#e0e8ff]">CONTACT</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,245,255,0.4)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-orbitron text-2xl font-bold text-[#e0e8ff] mb-4">
                ESTABLISH{" "}
                <span className="text-[#00f5ff]" style={{ textShadow: "0 0 10px #00f5ff" }}>
                  CONNECTION
                </span>
              </h3>
              <p className="font-exo text-[#a0aec0] text-sm leading-relaxed">
                Have a project in mind, a security question, or just want to connect? Ping me. I&apos;m always
                up for talking about cybersecurity, building cool things, or collaborating on something impactful.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "GITHUB",
                  value: "github.com/harkaran911",
                  href: "https://github.com/harkaran911",
                  color: "#00f5ff",
                  icon: "⌥",
                },
                {
                  label: "EMAIL",
                  value: "Available on request",
                  href: "#",
                  color: "#ff007a",
                  icon: "◈",
                },
                {
                  label: "LINKEDIN",
                  value: "linkedin.com/in/harkaran",
                  href: "https://linkedin.com",
                  color: "#9400ff",
                  icon: "◉",
                },
              ].map(({ label, value, href, color, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-[rgba(255,255,255,0.06)] bg-[rgba(0,10,20,0.4)] hover:border-opacity-60 transition-all duration-300"
                  style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <span className="text-xl" style={{ color }}>{icon}</span>
                  <div>
                    <div className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">{label}</div>
                    <div className="font-mono-tech text-xs transition-colors" style={{ color }}>
                      {value}
                    </div>
                  </div>
                  <span className="ml-auto font-mono-tech text-xs text-[#6b7db3] group-hover:text-[#00f5ff] transition-colors">→</span>
                </a>
              ))}
            </div>

            <div
              className="p-4 border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.05)]"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full bg-[#00ff88]"
                  style={{ boxShadow: "0 0 8px #00ff88", animation: "pulse-glow 2s ease-in-out infinite" }}
                />
                <span className="font-mono-tech text-xs text-[#00ff88] tracking-widest">
                  OPEN TO OPPORTUNITIES — ACTIVELY BUILDING
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-6 md:p-8 border border-[rgba(0,245,255,0.2)] bg-[rgba(0,10,20,0.6)] flex flex-col gap-5"
              style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00f5ff]" />

              <div className="font-mono-tech text-xs text-[#00f5ff] tracking-widest">[OPEN.CHANNEL]</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest block mb-1.5">NAME</label>
                  <input
                    type="text"
                    placeholder="YOUR_NAME"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest block mb-1.5">EMAIL</label>
                  <input
                    type="email"
                    placeholder="YOUR@EMAIL.COM"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest block mb-1.5">SUBJECT</label>
                <input
                  type="text"
                  placeholder="MISSION_BRIEF"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest block mb-1.5">MESSAGE</label>
                <textarea
                  placeholder="ENTER_MESSAGE..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono-tech text-xs text-[#00ff88] tracking-widest text-center p-3 border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.05)]"
                >
                  ✓ TRANSMISSION RECEIVED — WILL RESPOND SHORTLY
                </motion.div>
              )}
              {status === "error" && (
                <div className="font-mono-tech text-xs text-[#ff007a] tracking-widest text-center">
                  ✗ TRANSMISSION FAILED — TRY AGAIN
                </div>
              )}

              <CyberButton variant="cyan" className="w-full justify-center" onClick={() => handleSubmit()}>
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">◌</span> TRANSMITTING...
                  </span>
                ) : (
                  "SEND TRANSMISSION"
                )}
              </CyberButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
