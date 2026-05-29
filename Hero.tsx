"use client";
import { useState, useRef } from "react";
import { MENU, CATEGORIES } from "../lib/menu";
import { useCart } from "./CartContext";

const TAG_CONFIG = {
  star:  { label: "⭐ الأشهر",   cls: "bg-amber-900/30 text-amber-300 border border-amber-500/30" },
  new:   { label: "✨ جديد",     cls: "bg-cyan-900/30 text-cyan-300 border border-cyan-500/30" },
  cold:  { label: "❄️ بارد",    cls: "bg-blue-900/30 text-blue-300 border border-blue-500/30" },
  gamer: { label: "🎮 للاعبين", cls: "bg-purple-900/30 text-purple-300 border border-purple-500/30" },
};

function PriceTag({ price, isPs }: { price: number; isPs: boolean }) {
  return (
    <div className={`text-right ${isPs ? "text-[#00D4FF]" : "text-[#F0C966]"} font-black text-xl leading-none`}>
      {price}
      <span className="text-xs font-medium mr-1 opacity-70">ج</span>
    </div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState("hot");
  const { add, items } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = MENU.filter(i => i.category === active);
  const isPs = active === "ps";

  function inCart(id: string) {
    return items.find(i => i.id === id)?.qty ?? 0;
  }

  return (
    <section ref={sectionRef} id="menu" className="relative py-20 px-4 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-[#00D4FF] text-xs tracking-[6px] uppercase mb-3">OUR MENU</p>
        <h2 className="text-4xl md:text-5xl font-black" style={{fontFamily:"'Cinzel Decorative',serif",
          background:"linear-gradient(135deg,#F0C966,#C9A84C,#00D4FF)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          المنيو
        </h2>
        <div className="w-24 h-px mx-auto mt-4" style={{background:"linear-gradient(90deg,transparent,#00D4FF,transparent)"}} />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 justify-center flex-wrap mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActive(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              active === cat.id ? "tab-active shadow-lg" : "glass text-[#7BA8BC] hover:text-white border border-[#0E3A52]"
            }`}>
            <span className="text-base">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category desc */}
      <p className="text-center text-[#7BA8BC] text-sm mb-8 tracking-widest uppercase">
        {CATEGORIES.find(c => c.id === active)?.desc}
      </p>

      {/* Items grid */}
      <div className={`grid gap-4 ${isPs ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {filtered.map((item, idx) => {
          const qty = inCart(item.id);
          return (
            <div key={item.id} className="card-3d glass neon-border rounded-2xl p-5 relative overflow-hidden group cursor-pointer"
              style={{ animationDelay: `${idx * 0.05}s` }}
              onClick={() => add(item)}>

              {/* Glow corner */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{background:"radial-gradient(circle at top right, rgba(0,212,255,0.12), transparent 70%)"}} />

              {/* Emoji */}
              <div className="text-3xl mb-3 animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                {item.emoji}
              </div>

              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-base text-white leading-tight">{item.name}</h3>
                  <p className="text-[#7BA8BC] text-[11px] mt-0.5">{item.nameEn}</p>
                </div>
                <PriceTag price={item.price} isPs={isPs} />
              </div>

              {/* Desc */}
              <p className="text-[#7BA8BC] text-xs leading-relaxed mb-4">{item.desc}</p>

              {/* Tag + Add btn */}
              <div className="flex items-center justify-between gap-2">
                {item.tag ? (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${TAG_CONFIG[item.tag].cls}`}>
                    {TAG_CONFIG[item.tag].label}
                  </span>
                ) : <span />}

                {qty > 0 ? (
                  <div className="flex items-center gap-2 bg-[rgba(0,212,255,0.1)] rounded-xl px-2 py-1">
                    <span className="text-[#00D4FF] text-xs font-bold">{qty} ✓</span>
                  </div>
                ) : (
                  <div className="text-[#00D4FF] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    اضغط لإضافة <span>+</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Combo offer */}
      {active === "hot" && (
        <div className="mt-8 glass neon-border rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
          style={{background:"linear-gradient(135deg,rgba(0,212,255,0.06),rgba(201,168,76,0.04))"}}>
          <div>
            <h4 className="font-black text-white text-base">🔥 عرض الكومبو</h4>
            <p className="text-[#7BA8BC] text-sm mt-1">أي مشروب ساخن + توست بالجبنة — وفر 10 جنيه</p>
          </div>
          <div className="text-[#F0C966] font-black text-lg">وفر 10ج ⚡</div>
        </div>
      )}
    </section>
  );
}
