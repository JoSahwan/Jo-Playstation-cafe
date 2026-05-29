"use client";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const SYMBOLS = ["△","○","✕","□"];
const SYMBOL_COLORS = ["#3B82F6","#EF4444","#E5E7EB","#F59E0B"];

export default function Hero({ onOrder }: { onOrder: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{backgroundImage:"linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{background:"radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%)"}} />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{background:"radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)"}} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* PS Symbols */}
        <div className={`flex gap-5 justify-center mb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          {SYMBOLS.map((s, i) => (
            <div key={s} className="text-2xl font-bold animate-float"
              style={{ color: SYMBOL_COLORS[i], animationDelay: `${i * 0.3}s`, textShadow: `0 0 20px ${SYMBOL_COLORS[i]}` }}>
              {s}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div className={`transition-all duration-1000 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="relative inline-block">
            <h1 className="font-cinzel text-7xl md:text-9xl font-bold tracking-widest"
              style={{fontFamily:"'Cinzel Decorative',serif",
                background:"linear-gradient(135deg,#F0C966 0%,#C9A84C 40%,#00D4FF 100%)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                filter:"drop-shadow(0 0 30px rgba(0,212,255,0.5))"}}>
              Jo
            </h1>
            <div className="absolute -inset-4 rounded-full opacity-20 animate-glow-pulse"
              style={{background:"radial-gradient(circle,rgba(0,212,255,0.4),transparent)"}} />
          </div>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-sm md:text-base tracking-[8px] text-[#00D4FF] uppercase mt-2 font-medium">PlayStation Cafe</p>
          <p className="text-[#7BA8BC] text-sm mt-2 tracking-widest">اشرب ・ العب ・ ذاكر ・ استمتع</p>
        </div>

        {/* Award-style badges */}
        <div className={`flex flex-wrap gap-3 justify-center mt-8 transition-all duration-1000 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { icon: "⭐", text: "5-Star Experience" },
            { icon: "🎮", text: "PS4 & PS5" },
            { icon: "☕", text: "Premium Coffee" },
            { icon: "📚", text: "Study Zone" },
          ].map(b => (
            <div key={b.text} className="glass neon-border flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#7BA8BC]">
              <span>{b.icon}</span>
              <span className="tracking-wider">{b.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 flex gap-4 justify-center flex-wrap transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button onClick={onOrder}
            className="order-btn px-8 py-4 rounded-2xl text-lg font-black tracking-wide">
            🛒 اطلب دلوقتي
          </button>
          <button onClick={onOrder}
            className="glass neon-border px-8 py-4 rounded-2xl text-lg font-bold text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] transition-all">
            📋 شوف المنيو
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-[#7BA8BC] text-xs tracking-widest">
          <span className="animate-bounce text-[#00D4FF] text-xl">↓</span>
          SCROLL TO ORDER
        </div>
      </div>
    </section>
  );
}
