import { useState, useRef, useEffect } from "react"

async function callServer(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.reply
}

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
  ).current
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
  )
}

function SiggyCatIcon({ size = 40, glowing = false }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{
      display: "block",
      filter: glowing
        ? "drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 18px rgba(255,0,0,0.4))"
        : "drop-shadow(0 0 4px rgba(255,0,0,0.25))"
    }}>
      <path d="M50 110 L70 60 L100 90 L130 60 L150 110 A50 50 0 1 1 50 110" fill="black"/>
      <ellipse cx="85" cy="120" rx="6" ry="10" fill="#ff0000"
        style={{ filter: "drop-shadow(0 0 6px red)", animation: "blink 3.5s infinite" }}/>
      <ellipse cx="115" cy="120" rx="6" ry="10" fill="#ff0000"
        style={{ filter: "drop-shadow(0 0 6px red)", animation: "blink 3.5s infinite" }}/>
    </svg>
  )
}

function Bubble({ msg, index }) {
  const isUser = msg.role === "user"
  const parts = msg.content.split(/(\*[^*]+\*)/g)
  return (
    <div style={{
      display: "flex", flexDirection: isUser ? "row-reverse" : "row",
      alignItems: "flex-start", gap: 14, marginBottom: 28,
      animation: "forgeIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
      animationDelay: `${index * 0.05}s`,
    }}>
      {!isUser && (
        <div style={{ flexShrink: 0, position: "relative" }}>
          <div style={{
            width: 46, height: 46, background: "#000",
            border: "1.5px solid #1a1a1a", borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(255,0,0,0.2), 0 0 40px rgba(249,115,22,0.15)",
          }}>
            <SiggyCatIcon size={38} />
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
            fontSize: 10, letterSpacing: "0.2em", color: "#ff8c3a",
            fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase",
          }}>SIGGY</div>
        )}
        <div style={{
          padding: isUser ? "12px 18px" : "16px 20px",
          background: isUser ? "linear-gradient(135deg, #1c1409, #2d1f0a)" : "linear-gradient(145deg, #110c04, #1a1108)",
          border: isUser ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(249,115,22,0.2)",
          borderLeft: isUser ? undefined : "3px solid #f97316",
          borderRadius: isUser ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          color: isUser ? "#fef3c7" : "#f5deb3",
          fontSize: 15, lineHeight: 1.7,
          fontFamily: "'IM Fell English', Georgia, serif",
          whiteSpace: "pre-wrap",
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
        }}>YOU</div>
      )}
    </div>
  )
}

function ForgeTyping() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 28 }}>
      <div style={{
        width: 46, height: 46, background: "#0a0000",
        border: "1.5px solid #2a0000", borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 20px rgba(255,0,0,0.3)",
      }}>
        <SiggyCatIcon size={38} glowing={true} />
      </div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#78350f", fontFamily: "'Courier Prime', monospace", marginBottom: 6 }}>
          SIGGY IS THINKING...
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
  )
}

function ErrorBanner({ msg, onDismiss }) {
  return (
    <div style={{
      margin: "0 40px 16px", padding: "10px 16px",
      background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.4)",
      borderRadius: 4, color: "#fca5a5", fontSize: 12,
      fontFamily: "'Courier Prime', monospace",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      zIndex: 3, position: "relative",
    }}>
      <span>⚠ {msg}</span>
      <button onClick={onDismiss} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 16 }}>✕</button>
    </div>
  )
}

export default function SiggyForge() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `*siggy materializes from the forge fire, eyes glowing red*\n\ngRitual, traveler\nyou've found the soul forge\ni am siggy... forged from chaos and ritual knowledge\n\nask me anything about ritual\nor don't\ni'll just sit here and stare\n\nnyhehe 😼`
  }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next = [...messages, { role: "user", content: text }]
    setMessages(next)
    setInput("")
    setLoading(true)
    setError(null)
    try {
      const reply = await callServer(next)
      setMessages(m => [...m, { role: "assistant", content: reply }])
    } catch (err) {
      setError(err.message || "unknown error")
      setMessages(m => [...m, {
        role: "assistant",
        content: `*siggy squints at the broken connection*\n\nthe grid flickered...\ntry again, spark`
      }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  const SPARKS = ["what is ritual?", "how do i get a role?", "what is infernet?", "tell me about the blessing system"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cinzel+Decorative:wght@700&family=Courier+Prime:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #080500; }
        @keyframes blink { 0%,94%,100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
        @keyframes emberRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; } 90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; }
        }
        @keyframes emberPulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.5); opacity: 0.5; }
        }
        @keyframes forgeIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes forgeGlow {
          0%,100% { box-shadow: 0 0 15px rgba(255,0,0,0.2), 0 0 20px rgba(249,115,22,0.3); }
          50% { box-shadow: 0 0 30px rgba(255,0,0,0.5), 0 0 50px rgba(249,115,22,0.2); }
        }
        @keyframes hammerBounce {
          0%,60%,100% { transform: scaleY(1); }
          30% { transform: scaleY(1.8) translateY(-3px); }
        }
        @keyframes titleFlicker {
          0%,98%,100% { opacity: 1; } 99% { opacity: 0.7; }
        }
        @keyframes scanH {
          0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); }
        }
        @keyframes igniteFlicker {
          0%,100% { box-shadow: 0 0 6px #e85d04, 0 0 15px rgba(232,93,4,0.3); }
          50% { box-shadow: 0 0 12px #ff6a00, 0 0 25px rgba(255,100,0,0.3); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0d0900; }
        ::-webkit-scrollbar-thumb { background: #92400e; border-radius: 2px; }
textarea::placeholder { color: rgba(255,255,255,0.3); font-family: 'Courier Prime', monospace; letter-spacing: 0.12em; font-style: italic; }
      `}</style>

      <div style={{
        width: "100%", height: "100vh",
        background: "radial-gradient(ellipse at 20% 80%, rgba(120,53,15,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(146,64,14,0.1) 0%, transparent 50%), #080500",
        display: "flex", flexDirection: "column",
        fontFamily: "'Courier Prime', monospace",
letterSpacing: "0.12em",
        position: "relative", overflow: "hidden",
      }}>
        <EmberField />

        <div style={{
          position: "fixed", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)",
          animation: "scanH 8s linear infinite",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* HEADER */}
        <header style={{
          padding: "18px 40px",
          borderBottom: "1px solid rgba(146,64,14,0.3)",
          background: "linear-gradient(180deg, rgba(30,15,0,0.95), rgba(14,8,0,0.9))",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", zIndex: 2, flexShrink: 0,
          boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{
              width: 56, height: 56, background: "#0a0000",
              border: "1.5px solid #2a0000", borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "forgeGlow 3s ease-in-out infinite",
            }}>
              <SiggyCatIcon size={48} glowing={true} />
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 21, fontWeight: 700, color: "#fbbf24",
                textShadow: "0 0 20px rgba(251,191,36,0.5)",
                animation: "titleFlicker 6s ease-in-out infinite",
              }}>SIGGY</h1>
              <div style={{
                fontSize: 11, color: "#ff8c3a", letterSpacing: "0.2em",
                fontFamily: "'Courier Prime', monospace", marginTop: 3,
              }}>⚒ SOUL-FORGED · RITUAL GUARDIAN</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#f97316", boxShadow: "0 0 10px #f97316",
              animation: "emberPulse 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: 11.5, color: "#ff9944", fontFamily: "'Courier Prime', monospace", letterSpacing: "0.1em" }}>
              FORGE ACTIVE
            </span>
          </div>
        </header>

        {error && <ErrorBanner msg={error} onDismiss={() => setError(null)} />}

        {/* MESSAGES */}
        <main style={{
          flex: 1, overflowY: "auto", padding: "32px 40px 16px",
          position: "relative", zIndex: 2,
          maxWidth: 860, width: "100%", margin: "0 auto", alignSelf: "stretch",
        }}>
          {messages.map((m, i) => <Bubble key={i} msg={m} index={i} />)}
          {loading && <ForgeTyping />}
          <div ref={bottomRef} />
        </main>

        {/* SPARK SUGGESTIONS */}
        {messages.length === 1 && (
          <div style={{
            padding: "0 40px 12px", display: "flex", gap: 10, flexWrap: "wrap",
            maxWidth: 860, width: "100%", margin: "0 auto", zIndex: 2,
          }}>
            <span style={{ fontSize: 11, color: "#78350f", fontFamily: "'Courier Prime', monospace", alignSelf: "center" }}>
              ASK →
            </span>
            {SPARKS.map(s => (
              <button key={s} onClick={() => { setInput(s); textRef.current?.focus() }}
                style={{
                  padding: "6px 15px",
                  background: "rgba(146,64,14,0.15)",
                  border: "1px solid rgba(146,64,14,0.4)",
                  borderRadius: 3, color: "#d97706", fontSize: 13,
                  fontFamily: "'IM Fell English', serif", cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.2)"; e.currentTarget.style.color = "#fbbf24" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(146,64,14,0.15)"; e.currentTarget.style.color = "#d97706" }}
              >{s}</button>
            ))}
          </div>
        )}

        {/* INPUT */}
        <footer style={{
          padding: "16px 40px 24px",
          borderTop: "1px solid rgba(146,64,14,0.25)",
          background: "linear-gradient(0deg, rgba(14,8,0,0.97), rgba(10,6,0,0.9))",
          position: "relative", zIndex: 2, flexShrink: 0,
        }}>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", gap: 12, alignItems: "flex-end" }}>
            <SiggyCatIcon size={24} />
            <div style={{
              flex: 1, background: "rgba(20,10,0,0.8)",
              border: "1px solid rgba(146,64,14,0.4)",
              borderRadius: 4, padding: "10px 16px",
            }}>
              <textarea
                ref={textRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="ask siggy anything..."
                rows={1}
                style={{
                  width: "100%", background: "none", border: "none", outline: "none",
                  color: "#fef3c7", fontSize: 15, resize: "none", lineHeight: 1.6,
                  fontFamily: "'IM Fell English', Georgia, serif",
                  maxHeight: 120, overflowY: "auto", caretColor: "#f97316",
                }}
                onInput={e => {
                  e.target.style.height = "auto"
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
                }}
              />
            </div>
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                height: 44, paddingInline: 22,
                background: loading || !input.trim() ? "rgba(146,64,14,0.2)" : "linear-gradient(135deg, #7c1d06, #b94a0a, #e85d04)",
                border: `1px solid ${loading || !input.trim() ? "rgba(146,64,14,0.2)" : "#ff6a00"}`,
                borderRadius: 4,
                color: loading || !input.trim() ? "#78350f" : "#fff7ed",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontFamily: "'Courier Prime', monospace",
                fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
                animation: loading || !input.trim() ? "none" : "igniteFlicker 1.5s ease-in-out infinite",
              }}
            >
              {loading ? "..." : "IGNITE"}
            </button>
          </div>
          <div style={{
            textAlign: "center", marginTop: 12,
            fontSize: 10.5, color: "rgba(255,140,60,0.9)",
            fontFamily: "'Courier Prime', monospace", letterSpacing: "0.12em",
          }}>
            SIGGY SOUL FORGE · POWERED BY RITUAL'S OPEN AI INFRASTRUCTURE · gRITUAL
          </div>
        </footer>
      </div>
    </>
  )
}