"use client";

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-[rgba(0,245,255,0.1)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-sm font-bold text-[#00f5ff]" style={{ textShadow: "0 0 8px #00f5ff" }}>
              KS<span className="text-[#ff007a]">.</span>
            </span>
            <span className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">
              HARKARAN SINGH — CYBERSECURITY
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/harkaran911" target="_blank" rel="noopener noreferrer"
              className="font-mono-tech text-[10px] text-[#6b7db3] hover:text-[#00f5ff] transition-colors tracking-widest">
              GITHUB
            </a>
            <span className="text-[#6b7db3] text-xs">//</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="font-mono-tech text-[10px] text-[#6b7db3] hover:text-[#ff007a] transition-colors tracking-widest">
              LINKEDIN
            </a>
          </div>

          <p className="font-mono-tech text-[10px] text-[#6b7db3] tracking-widest">
            BUILT WITH NEXT.JS — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
