"use client";
import { useCart } from "./CartContext";
import { WHATSAPP } from "../lib/menu";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, increment, decrement, remove, total, count, clear } = useCart();

  function buildMsg() {
    if (!items.length) return "";
    const lines = items.map(i => `• ${i.emoji} ${i.name} × ${i.qty} = ${i.price * i.qty} ج`);
    return encodeURIComponent(
      `🎮 *Jo PlayStation Cafe*\n━━━━━━━━━━━━\n${lines.join("\n")}\n━━━━━━━━━━━━\n💰 *الإجمالي: ${total} ج*\n\nشكراً 🙏`
    );
  }

  function sendOrder() {
    if (!items.length) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${buildMsg()}`, "_blank");
    clear();
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(5,12,20,0.85)", backdropFilter: "blur(6px)" }}
        onClick={onClose} />

      {/* Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-400 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg,#0A1825 0%,#050C14 100%)", borderRight: "1px solid rgba(0,212,255,0.2)" }}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#0E3A52]">
          <div>
            <h2 className="font-black text-xl text-white">🛒 طلبك</h2>
            <p className="text-[#7BA8BC] text-xs mt-1">{count} صنف مضاف</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center text-[#7BA8BC] hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#7BA8BC]">
              <div className="text-5xl animate-float">🛒</div>
              <p className="text-sm">السلة فاضية<br />اختار من المنيو</p>
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className="glass neon-border rounded-xl p-4 flex items-center gap-3">
              <div className="text-2xl">{item.emoji}</div>
              <div className="flex-1">
                <p className="font-bold text-sm text-white">{item.name}</p>
                <p className="text-[#F0C966] text-sm font-black">{item.price * item.qty} ج</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="qty-btn" onClick={() => decrement(item.id)}>−</button>
                <span className="text-white font-bold w-5 text-center">{item.qty}</span>
                <button className="qty-btn" onClick={() => increment(item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#0E3A52] space-y-3">
            <div className="glass neon-border rounded-xl p-4 flex justify-between items-center">
              <span className="text-[#7BA8BC] font-bold">الإجمالي</span>
              <span className="text-[#F0C966] text-2xl font-black">{total} <span className="text-sm">ج</span></span>
            </div>
            <button onClick={sendOrder} className="order-btn w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2">
              <span>أرسل الطلب على واتساب</span>
              <span className="text-xl">📲</span>
            </button>
            <button onClick={clear} className="w-full py-3 text-[#7BA8BC] text-sm hover:text-red-400 transition-colors">
              🗑️ امسح الطلب
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
