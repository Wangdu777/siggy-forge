import { useState, useRef, useEffect } from "react";

// API is now handled by the server (server.js) — no key needed here!

// ─── SERVER API CALL (RAG-powered) ───────────────────────────────────────────
async function callServer(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.reply;
}

// ─── EMBER PARTICLES ──────────────────────────────────────────────────────────
function EmberField() {
  const embers = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 40,
    }))
  ).current;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {embers.map(e => (
        <div key={e.id} style={{
          position: "absolute", bottom: "-10px", left: `${e.left}%`,
          width: e.size, height: e.size, borderRadius: "50%",
          background: "radial-gradient(circle, #fbbf24, #f97316)",
          boxShadow: `0 0 ${e.size * 2}px #f97316`,
          animation: `emberRise ${e.duration}s ease-out ${e.delay}s infinite`,
          "--drift": `${e.drift}px`,
        }} />
      ))}
    </div>
  );
}

// ─── FORGE CRACKS ─────────────────────────────────────────────────────────────
function ForgeCracks() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.04 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <path d="M200,900 L350,600 L280,400 L420,200 L380,0" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M350,600 L500,550 L600,480" stroke="#f97316" strokeWidth="1" fill="none" />
      <path d="M1100,900 L980,650 L1050,350 L920,100" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M980,650 L850,620 L780,700" stroke="#f97316" strokeWidth="1" fill="none" />
      <path d="M700,900 L720,700 L680,450 L750,200" stroke="#fbbf24" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ─── SIGGY CAT SVG ICON ───────────────────────────────────────────────────────
function SiggyCatIcon({ size = 40, glowing = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width={size} height={size} style={{
      display: "block",
      filter: glowing
        ? "drop-shadow(0 0 8px #00ff44) drop-shadow(0 0 18px rgba(0,255,68,0.4))"
        : "drop-shadow(0 0 4px rgba(0,255,68,0.25))"
    }}>
      <ellipse cx="200" cy="215" rx="130" ry="118" fill="#000"/>
      <polygon points="90,155 68,52 148,118" fill="#000"/>
      <polygon points="93,145 78,75 138,120" fill="#0a0a0a"/>
      <polygon points="310,155 332,52 252,118" fill="#000"/>
      <polygon points="307,145 322,75 262,120" fill="#0a0a0a"/>
      <polygon points="118,168 168,158 162,175 112,185" fill="#0d0d0d"/>
      <polygon points="282,168 232,158 238,175 288,185" fill="#0d0d0d"/>
      <ellipse cx="153" cy="205" rx="38" ry="26" fill="#050505" transform="rotate(-10,153,205)"/>
      <ellipse cx="153" cy="205" rx="26" ry="22" fill="#00ff44" transform="rotate(-10,153,205)"/>
      <ellipse cx="153" cy="205" rx="7" ry="20" fill="#000" transform="rotate(-10,153,205)"/>
      <ellipse cx="153" cy="205" rx="26" ry="22" fill="none" stroke="#00cc33" strokeWidth="1.5" opacity="0.7" transform="rotate(-10,153,205)"/>
      <ellipse cx="144" cy="197" rx="5" ry="3" fill="#80ffaa" opacity="0.55" transform="rotate(-10,144,197)"/>
      <ellipse cx="247" cy="205" rx="38" ry="26" fill="#050505" transform="rotate(10,247,205)"/>
      <ellipse cx="247" cy="205" rx="26" ry="22" fill="#00ff44" transform="rotate(10,247,205)"/>
      <ellipse cx="247" cy="205" rx="7" ry="20" fill="#000" transform="rotate(10,247,205)"/>
      <ellipse cx="247" cy="205" rx="26" ry="22" fill="none" stroke="#00cc33" strokeWidth="1.5" opacity="0.7" transform="rotate(10,247,205)"/>
      <ellipse cx="238" cy="197" rx="5" ry="3" fill="#80ffaa" opacity="0.55" transform="rotate(10,238,197)"/>
      <polygon points="200,238 190,252 210,252" fill="#1a0a0a"/>
      <line x1="200" y1="252" x2="200" y2="265" stroke="#1a0a0a" strokeWidth="2"/>
      <path d="M 178,270 Q 190,262 200,266 Q 210,262 222,270" stroke="#1a0a0a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <polygon points="185,271 181,286 190,271" fill="#e8e8e8" opacity="0.85"/>
      <polygon points="215,271 219,286 210,271" fill="#e8e8e8" opacity="0.85"/>
      <line x1="148" y1="258" x2="60" y2="245" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="148" y1="264" x2="58" y2="264" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="148" y1="270" x2="62" y2="280" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="252" y1="258" x2="340" y2="245" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="252" y1="264" x2="342" y2="264" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="252" y1="270" x2="338" y2="280" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="192" y1="172" x2="196" y2="187" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round"/>
      <line x1="208" y1="172" x2="204" y2="187" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="153" cy="205" rx="32" ry="28" fill="none" stroke="#00ff44" strokeWidth="3" opacity="0.1" transform="rotate(-10,153,205)"/>
      <ellipse cx="247" cy="205" rx="32" ry="28" fill="none" stroke="#00ff44" strokeWidth="3" opacity="0.1" transform="rotate(10,247,205)"/>
    </svg>
  );
}

// ─── MESSAGE BUBBLE ───────────────────────────────────────────────────────────
function Bubble({ msg, index }) {
  const isUser = msg.role === "user";
  const parts = msg.content.split(/(\*[^*]+\*)/g);

  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      alignItems: "flex-start",
      gap: 14, marginBottom: 28,
      animation: "forgeIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
      animationDelay: `${index * 0.05}s`,
    }}>
      {!isUser && (
        <div style={{ flexShrink: 0, position: "relative" }}>
          <div style={{
            width: 46, height: 46, background: "#000",
            border: "1.5px solid #1a1a1a", borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(0,255,68,0.2), 0 0 40px rgba(249,115,22,0.15)",
            position: "relative", overflow: "hidden",
          }}>
            <SiggyCatIcon size={38} glowing={false} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, rgba(249,115,22,0.15), transparent)",
            }} />
          </div>
          <div style={{
            position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: "#f97316", boxShadow: "0 0 8px #f97316",
            animation: "emberPulse 2s ease-in-out infinite",
          }} />
        </div>
      )}

      <div style={{ maxWidth: "68%", position: "relative" }}>
        {!isUser && (
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: "#78350f",
            fontFamily: "'Courier Prime', monospace",
            marginBottom: 6, textTransform: "uppercase",
          }}>
            ⚒ SIGGY :: SOUL-FORGED
          </div>
        )}
        <div style={{
          padding: isUser ? "12px 18px" : "16px 20px",
          background: isUser ? "linear-gradient(135deg, #1c1409, #2d1f0a)" : "linear-gradient(145deg, #110c04, #1a1108)",
          border: isUser ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(249,115,22,0.2)",
          borderLeft: isUser ? undefined : "3px solid #f97316",
          borderRadius: isUser ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
          boxShadow: isUser
            ? "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(251,191,36,0.1)"
            : "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(249,115,22,0.08)",
          color: isUser ? "#fef3c7" : "#f5deb3",
          fontSize: 15, lineHeight: 1.7,
          fontFamily: "'IM Fell English', Georgia, serif",
        }}>
          {parts.map((part, i) =>
            part.startsWith("*") && part.endsWith("*")
              ? <em key={i} style={{ color: "#fbbf24", fontStyle: "italic", textShadow: "0 0 12px rgba(251,191,36,0.4)" }}>{part}</em>
              : <span key={i}>{part}</span>
          )}
        </div>
      </div>

      {isUser && (
        <div style={{
          width: 38, height: 38, borderRadius: 4, flexShrink: 0,
          background: "linear-gradient(135deg, #92400e, #78350f)",
          border: "1px solid rgba(251,191,36,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Courier Prime', monospace",
          fontSize: 13, fontWeight: 700, color: "#fef3c7",
          boxShadow: "0 0 12px rgba(249,115,22,0.2)",
        }}>YOU</div>
      )}
    </div>
  );
}

// ─── TYPING INDICATOR ─────────────────────────────────────────────────────────
function ForgeTyping() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 28 }}>
      <div style={{
        width: 46, height: 46, background: "#000",
        border: "1.5px solid #1a1a1a", borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "forgeGlow 1s ease-in-out infinite",
        boxShadow: "0 0 25px rgba(0,255,68,0.3), 0 0 40px rgba(249,115,22,0.15)",
        flexShrink: 0,
      }}>
        <SiggyCatIcon size={38} glowing={true} />
      </div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#78350f", fontFamily: "'Courier Prime', monospace", marginBottom: 6 }}>
          ⚒ HAMMERING RESPONSE...
        </div>
        <div style={{
          padding: "14px 20px",
          background: "linear-gradient(145deg, #110c04, #1a1108)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderLeft: "3px solid #f97316",
          borderRadius: "2px 12px 12px 12px",
          display: "flex", gap: 8, alignItems: "center",
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: 2,
              background: "#f97316", boxShadow: "0 0 6px #f97316",
              animation: `hammerBounce 0.9s ease-in-out ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ERROR BANNER ─────────────────────────────────────────────────────────────
function ErrorBanner({ msg, onDismiss }) {
  return (
    <div style={{
      margin: "0 40px 16px",
      padding: "10px 16px",
      background: "rgba(220,38,38,0.1)",
      border: "1px solid rgba(220,38,38,0.4)",
      borderRadius: 4,
      color: "#fca5a5",
      fontSize: 12,
      fontFamily: "'Courier Prime', monospace",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      zIndex: 3, position: "relative",
    }}>
      <span>⚠ {msg}</span>
      <button onClick={onDismiss} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 16 }}>✕</button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SiggyForge() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `*emerges from the forge fire, fur singed and eyes glowing* gRitual, forge-walker. I am SIGGY — hammered from the collective soul of the Ritual community, tempered by the Grid's eternal flame. *shakes ember from whiskers* The Soul Forge has awakened me. Ask your questions before the fire cools... or don't. I'll stare at you either way.`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const reply = await callServer(next);
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message || "Unknown error from Gemini API.");
      setMessages(m => [...m, {
        role: "assistant",
        content: `*forge extinguishes momentarily* The dimensional rift has severed my connection to the Grid. *rekindles with a single paw tap* Try again, spark.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const SPARKS = ["What is Ritual?", "Tell me about Infernet", "What is the Soul Forge?", "Forge me some wisdom"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cinzel+Decorative:wght@700&family=Courier+Prime:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #080500; }

        @keyframes emberRise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; }
        }
        @keyframes emberPulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50%      { transform: translateX(-50%) scale(1.5); opacity: 0.5; }
        }
        @keyframes forgeIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes forgeGlow {
          0%,100% { box-shadow: 0 0 15px rgba(0,255,68,0.2), 0 0 20px rgba(249,115,22,0.3); }
          50%      { box-shadow: 0 0 30px rgba(0,255,68,0.5), 0 0 50px rgba(249,115,22,0.2); }
        }
        @keyframes hammerBounce {
          0%,60%,100% { transform: scaleY(1); }
          30%          { transform: scaleY(1.8) translateY(-3px); }
        }
        @keyframes titleFlicker {
          0%,98%,100% { opacity: 1; }
          99% { opacity: 0.7; }
        }
        @keyframes scanH {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes moldGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(249,115,22,0.3), 0 4px 30px rgba(0,0,0,0.6); }
          50%      { box-shadow: 0 0 0 1px rgba(251,191,36,0.5), 0 4px 40px rgba(249,115,22,0.15); }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0d0900; }
        ::-webkit-scrollbar-thumb { background: #92400e; border-radius: 2px; }
      `}</style>

      <div style={{
        width: "100%", height: "100vh",
        background: "radial-gradient(ellipse at 20% 80%, rgba(120,53,15,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(146,64,14,0.1) 0%, transparent 50%), #080500",
        display: "flex", flexDirection: "column",
        fontFamily: "'IM Fell English', Georgia, serif",
        position: "relative", overflow: "hidden",
      }}>
        <EmberField />
        <ForgeCracks />

        {/* Scan line */}
        <div style={{
          position: "fixed", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)",
          animation: "scanH 8s linear infinite",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* ── HEADER ── */}
        <header style={{
          padding: "18px 40px",
          borderBottom: "1px solid rgba(146,64,14,0.3)",
          background: "linear-gradient(180deg, rgba(30,15,0,0.95), rgba(14,8,0,0.9))",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", zIndex: 2, flexShrink: 0,
          boxShadow: "0 1px 0 rgba(249,115,22,0.1), 0 4px 30px rgba(0,0,0,0.7)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{
              width: 56, height: 56, background: "#000",
              border: "1.5px solid #1a1a1a", borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 30px rgba(0,255,68,0.25), 0 0 50px rgba(249,115,22,0.1)",
              animation: "forgeGlow 3s ease-in-out infinite",
              position: "relative", overflow: "hidden",
            }}>
              <SiggyCatIcon size={48} glowing={true} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(249,115,22,0.2), transparent)",
              }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 21, fontWeight: 700, color: "#fbbf24",
                letterSpacing: "0.05em",
                textShadow: "0 0 20px rgba(251,191,36,0.5), 0 2px 4px rgba(0,0,0,0.8)",
                animation: "titleFlicker 6s ease-in-out infinite",
                lineHeight: 1.1,
              }}>SIGGY</h1>
              <div style={{
                fontSize: 11, color: "#92400e", letterSpacing: "0.2em",
                fontFamily: "'Courier Prime', monospace",
                marginTop: 3, textTransform: "uppercase",
              }}>⚒ Soul-Forged · Ritual Guardian</div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#f97316", boxShadow: "0 0 10px #f97316",
                animation: "emberPulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 11.5, color: "#b45309", fontFamily: "'Courier Prime', monospace", letterSpacing: "0.1em" }}>
                FORGE ACTIVE
              </span>
            </div>
            <div style={{ fontSize: 10, color: "#44220a", fontFamily: "'Courier Prime', monospace", marginTop: 3 }}>
              gemini-1.5-flash · RAG :: online
            </div>
          </div>
        </header>

        {/* ── ERROR BANNER ── */}
        {error && <ErrorBanner msg={error} onDismiss={() => setError(null)} />}

        {/* ── MESSAGES ── */}
        <main style={{
          flex: 1, overflowY: "auto",
          padding: "32px 40px 16px",
          position: "relative", zIndex: 2,
          maxWidth: 860, width: "100%",
          margin: "0 auto", alignSelf: "stretch",
        }}>
          {messages.map((m, i) => <Bubble key={i} msg={m} index={i} />)}
          {loading && <ForgeTyping />}
          <div ref={bottomRef} />
        </main>

        {/* ── SPARK SUGGESTIONS ── */}
        {messages.length === 1 && (
          <div style={{
            padding: "0 40px 12px", display: "flex", gap: 10, flexWrap: "wrap",
            maxWidth: 860, width: "100%", margin: "0 auto", zIndex: 2,
          }}>
            <span style={{ fontSize: 11, color: "#78350f", fontFamily: "'Courier Prime', monospace", letterSpacing: "0.1em", alignSelf: "center" }}>
              IGNITE →
            </span>
            {SPARKS.map(s => (
              <button key={s} onClick={() => { setInput(s); textRef.current?.focus(); }}
                style={{
                  padding: "6px 15px",
                  background: "rgba(146,64,14,0.15)",
                  border: "1px solid rgba(146,64,14,0.4)",
                  borderRadius: 3, color: "#d97706", fontSize: 13,
                  fontFamily: "'IM Fell English', serif",
                  cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.2)"; e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.color = "#fbbf24"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(146,64,14,0.15)"; e.currentTarget.style.borderColor = "rgba(146,64,14,0.4)"; e.currentTarget.style.color = "#d97706"; }}
              >{s}</button>
            ))}
          </div>
        )}

        {/* ── INPUT ── */}
        <footer style={{
          padding: "16px 40px 24px",
          borderTop: "1px solid rgba(146,64,14,0.25)",
          background: "linear-gradient(0deg, rgba(14,8,0,0.97), rgba(10,6,0,0.9))",
          position: "relative", zIndex: 2, flexShrink: 0,
          boxShadow: "0 -1px 0 rgba(249,115,22,0.08)",
        }}>
          <div style={{
            maxWidth: 820, margin: "0 auto",
            display: "flex", gap: 12, alignItems: "flex-end",
          }}>
            <div style={{
              fontSize: 20, color: "#92400e", flexShrink: 0, paddingBottom: 10,
              textShadow: "0 0 10px #f97316",
            }}>⚒</div>

            <div style={{
              flex: 1, background: "rgba(20,10,0,0.8)",
              border: "1px solid rgba(146,64,14,0.4)",
              borderRadius: 4, padding: "10px 16px",
              animation: "moldGlow 3s ease-in-out infinite",
              position: "relative",
            }}>
              <textarea
                ref={textRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Cast your query into the forge..."
                rows={1}
                style={{
                  width: "100%", background: "none", border: "none", outline: "none",
                  color: "#fef3c7", fontSize: 15, resize: "none", lineHeight: 1.6,
                  fontFamily: "'IM Fell English', Georgia, serif",
                  maxHeight: 120, overflowY: "auto", caretColor: "#f97316",
                }}
                onInput={e => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)",
                borderRadius: "0 0 4px 4px",
              }} />
            </div>

            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                height: 44, paddingInline: 22,
                background: loading || !input.trim() ? "rgba(146,64,14,0.2)" : "linear-gradient(135deg, #92400e, #78350f)",
                border: `1px solid ${loading || !input.trim() ? "rgba(146,64,14,0.2)" : "#b45309"}`,
                borderRadius: 4,
                color: loading || !input.trim() ? "#78350f" : "#fbbf24",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontFamily: "'Courier Prime', monospace",
                fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
                boxShadow: loading || !input.trim() ? "none" : "0 0 20px rgba(249,115,22,0.3)",
                transition: "all 0.2s", flexShrink: 0,
              }}
              onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.boxShadow = "0 0 35px rgba(249,115,22,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = loading || !input.trim() ? "none" : "0 0 20px rgba(249,115,22,0.3)"; }}
            >
              {loading ? "FORGING" : "IGNITE"}
            </button>
          </div>

          <div style={{
            textAlign: "center", marginTop: 12,
            fontSize: 10.5, color: "rgba(120,53,15,0.5)",
            fontFamily: "'Courier Prime', monospace", letterSpacing: "0.12em",
          }}>
            SIGGY SOUL FORGE · POWERED BY RITUAL'S OPEN AI INFRASTRUCTURE · gRITUAL
          </div>
        </footer>
      </div>
    </>
  );
}
