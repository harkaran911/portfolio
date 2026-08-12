"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CyberButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "cyan" | "pink" | "purple";
  className?: string;
}

const variantStyles = {
  cyan: {
    border: "border-[#00f5ff]",
    glow: "shadow-[0_0_15px_#00f5ff,0_0_30px_rgba(0,245,255,0.3)]",
    hoverGlow: "hover:shadow-[0_0_25px_#00f5ff,0_0_50px_rgba(0,245,255,0.5),0_0_80px_rgba(0,245,255,0.2)]",
    text: "text-[#00f5ff]",
    bg: "hover:bg-[rgba(0,245,255,0.1)]",
    before: "#00f5ff",
    gradient: "from-[rgba(0,245,255,0.15)] to-transparent",
  },
  pink: {
    border: "border-[#ff007a]",
    glow: "shadow-[0_0_15px_#ff007a,0_0_30px_rgba(255,0,122,0.3)]",
    hoverGlow: "hover:shadow-[0_0_25px_#ff007a,0_0_50px_rgba(255,0,122,0.5),0_0_80px_rgba(255,0,122,0.2)]",
    text: "text-[#ff007a]",
    bg: "hover:bg-[rgba(255,0,122,0.1)]",
    before: "#ff007a",
    gradient: "from-[rgba(255,0,122,0.15)] to-transparent",
  },
  purple: {
    border: "border-[#9400ff]",
    glow: "shadow-[0_0_15px_#9400ff,0_0_30px_rgba(148,0,255,0.3)]",
    hoverGlow: "hover:shadow-[0_0_25px_#9400ff,0_0_50px_rgba(148,0,255,0.5)]",
    text: "text-[#9400ff]",
    bg: "hover:bg-[rgba(148,0,255,0.1)]",
    before: "#9400ff",
    gradient: "from-[rgba(148,0,255,0.15)] to-transparent",
  },
};

export default function CyberButton({
  children,
  onClick,
  href,
  variant = "cyan",
  className = "",
}: CyberButtonProps) {
  const v = variantStyles[variant];

  const buttonContent = (
    <motion.div
      className={`
        relative inline-flex items-center gap-2 px-6 py-3
        border ${v.border} ${v.text}
        font-orbitron text-sm font-semibold tracking-widest uppercase
        cursor-pointer select-none overflow-hidden
        transition-all duration-300
        ${v.glow} ${v.hoverGlow} ${v.bg}
        ${className}
      `}
      style={{
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
    >
      {/* Corner accents */}
      <span
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
        style={{ borderColor: v.before }}
      />
      <span
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
        style={{ borderColor: v.before }}
      />

      {/* Scan line sweep on hover */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r opacity-0"
        style={{ background: `linear-gradient(90deg, transparent, ${v.before}22, transparent)` }}
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%", opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <span
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(135deg, ${v.before}08 0%, transparent 100%)` }}
      />

      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
