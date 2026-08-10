import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harkaran Singh | Cybersecurity Portfolio",
  description: "Cybersecurity enthusiast — preventing systems from breaking. Explore my projects in SIEM, threat detection, cryptography, and more.",
  keywords: ["cybersecurity", "portfolio", "SIEM", "Wazuh", "penetration testing", "threat detection"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
