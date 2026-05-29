"use client";
import { useCart } from "./CartContext";

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { count, total } = useCart();
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-3"
      style={{ background: "rgba(5,12,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(14,58,82,0.5)" }}>
      <div className="flex items-center gap-2">
        <span className="text-lg font-black" style={{fontFamily:"'Cinzel Decorative',serif",
          background:"linear-gradient(135deg,#F0C966,#00D4FF)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Jo
        </span>
        <span className="text-[#7BA8BC] text-xs tracking-widest hidden sm:block">PLAYSTATION CAFE</span>
      </div>

      <div className="flex items-center gap-2">
        {["△","○","✕","□"].map((s,i) => (
          <span key={i} className="text-sm hidden md:block" style={{color:["#3B82F6","#EF4444","#E5E7EB","#F59E0B"][i]}}>{s}</span>
        ))}
      </div>

      <button onClick={onCartOpen} className="relative flex items-center gap-2 ps-btn px-4 py-2 rounded-xl">
        {count > 0 && <span className="cart-badge">{count}</span>}
        <span className="text-white font-bold text-sm">🛒</span>
        {count > 0 && <span className="text-[#00D4FF] font-black text-sm">{total}ج</span>}
      </button>
    </nav>
  );
}
