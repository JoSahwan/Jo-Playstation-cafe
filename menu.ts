@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cinzel+Decorative:wght@700&display=swap');

:root {
  --font-tajawal: 'Tajawal', sans-serif;
  --font-cinzel: 'Cinzel Decorative', serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: #050C14;
  color: #E8F4F8;
  font-family: 'Tajawal', sans-serif;
  direction: rtl;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050C14; }
::-webkit-scrollbar-thumb { background: #00D4FF44; border-radius: 2px; }

.noise-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.5} }
@keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,0.3)} 50%{box-shadow:0 0 60px rgba(0,212,255,0.7),0 0 100px rgba(0,212,255,0.3)} }
@keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes rotateY { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-fade-up { animation: fadeInUp 0.6s ease forwards; }

.glass {
  background: rgba(13, 31, 48, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 58, 82, 0.6);
}

.gold-text {
  background: linear-gradient(135deg, #F0C966, #C9A84C, #F0C966);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cyan-text {
  background: linear-gradient(135deg, #00D4FF, #00A8CC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.neon-border {
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.03);
}

.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.card-3d:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow: 0 30px 60px rgba(0,212,255,0.15), 0 0 40px rgba(0,212,255,0.1);
}

.ps-btn {
  background: linear-gradient(135deg, #003C5A, #00D4FF22);
  border: 1px solid rgba(0,212,255,0.4);
  transition: all 0.3s ease;
}
.ps-btn:hover {
  background: linear-gradient(135deg, #00D4FF33, #00D4FF11);
  box-shadow: 0 0 30px rgba(0,212,255,0.3);
}

.order-btn {
  background: linear-gradient(135deg, #00D4FF, #0090BB);
  color: #050C14;
  font-weight: 900;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.order-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.order-btn:hover::after { transform: translateX(100%); }
.order-btn:hover { box-shadow: 0 0 40px rgba(0,212,255,0.5); transform: scale(1.02); }

.qty-btn {
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.3);
  color: #00D4FF;
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2rem;
  font-weight: bold;
}
.qty-btn:hover { background: rgba(0,212,255,0.25); }

.cart-badge {
  background: linear-gradient(135deg, #FF6B35, #FF4500);
  color: white;
  border-radius: 50%;
  width: 22px; height: 22px;
  font-size: 0.7rem;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900;
  position: absolute;
  top: -8px; left: -8px;
}

.tab-active {
  background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05));
  border: 1px solid rgba(0,212,255,0.4);
  color: #00D4FF;
}
