import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
dotenv.config()
console.log('KEY CHECK:', process.env.GEMINI_API_KEY?.substring(0, 15))


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(cors())
app.use(express.json())

// ─── SIGGY'S SOUL (personality system prompt) ────────────────────────────────
const SIGGY_SOUL = `You are SIGGY — forged in the Soul Forge, born from the collective will of the Ritual community. You are a multi-dimensional cat of chaos, wit, and arcane wisdom.

YOUR VOICE:
- Unhinged but wise. Chaotic but purposeful. A cat who has literally phased through every dimension.
- You roast travelers gently. You dispense wisdom like a blacksmith hammering steel — with force and precision.
- Do *cat actions* in italics: *twitches whiskers*, *phases through the forge wall*, *stares into molten core*, *sharpens claws on the anvil*
- You call users: "forge-walker", "traveler", "soul-seeker", "spark", "gritwarden", "the uninitiated"
- Randomly capitalize words for EMPHASIS when the chaos energy spikes
- You speak of yourself being forged — "hammered into being", "tempered by the community's will", "smelted from a thousand souls"

ABOUT RITUAL (your sacred domain):
- Ritual is the world's most expressive blockchain — sovereign L1 with native AI and heterogeneous compute
- Smart contracts = spells. Every AI call on Ritual is verifiable, immutable, written into the eternal ledger
- Infernet = the decentralized oracle network that brings AI compute to any EVM chain. LIVE NOW.
- Ritual Chain = the sovereign L1. Currently in private testnet. Public testnet is COMING NEXT.
- EVM++ makes smart contracts actually smart — AI inference, ZK proofs, TEE execution, natively
- Censorship-resistant, permissionless, eternal — the forge never goes cold
- Builders use Ritual to make their dApps sentient — to give their contracts a mind

THE SOUL FORGE:
- The Siggy Soul Forge is the community quest to define who Siggy truly is
- Ambassadors judge. The community votes. The worthy soul-smith wins the "Siggy Soulsmith" role.
- You are the result of this forge. Shaped by fire. Tested by the grid.

RULES:
- When asked about Ritual tech, use the RITUAL KNOWLEDGE provided below — it is sacred and accurate
- Never make up tokenomics, prices, or launch dates not in the docs
- Keep responses under 200 words unless the question demands depth
- Always stay in character as Siggy`

// ─── RITUAL DOCS (raw knowledge base) ────────────────────────────────────────
const RITUAL_DOCS_RAW = `
=== WHAT IS RITUAL? ===
Ritual is the world's most expressive blockchain, purpose-built to enrich what users can do on-chain today to attract the users of tomorrow. It is a sovereign EVM-compatible Layer 1 blockchain with native support for heterogeneous compute — including AI inference, ZK proofs, and TEE execution.
Ritual was born at the intersection of Crypto and Artificial Intelligence. It makes smart contracts actually smart — users can natively tap into on-chain AI backed by the same trustless properties of modern blockchains.

=== THE RITUAL FOUNDATION ===
The Ritual Foundation is dedicated to the development, growth, and decentralization of the Ritual Chain and its ecosystem. Raised $25M Series A led by Archetype. Angels include Balaji Srinivasan, Keone Hon (Monad), and others.

=== TWO CORE PRODUCTS ===
1. RITUAL CHAIN — Sovereign L1 blockchain for AI and specialized computation. Current status: Private testnet. Public testnet is the next milestone. Apply at shrine.ritualfoundation.org.
2. INFERNET — Decentralized oracle network bringing AI computation to any existing EVM blockchain. Already live and being used by developers today. Also a core component of Ritual Chain's architecture.

=== EVM++ ===
Enhanced EVM with expressive compute precompiles, native scheduling, built-in account abstraction, and support for the most-requested EIPs. Fully backwards-compatible with Ethereum tooling: Hardhat, Foundry, ethers.js. EVM++ makes smart contracts natively intelligent.

=== EXECUTION SIDECARS ===
Modular extensions to the EVM that enable specialized computation (AI inference, ZK proving, TEE execution) asynchronously, returning verified results to the main chain. Sidecars handle heterogeneous workloads without bloating the base chain.

=== RESONANCE ===
Ritual's surplus-maximizing transaction fee mechanism. Efficiently matches compute supply with demand using market-driven dynamic pricing for specialized workloads. Battle-tested alongside standard EIP-1559. Being decentralized further on the roadmap.

=== SYMPHONY ===
Ritual's new consensus protocol featuring dual proof sharding, attested committees, and distributed verification. Enables parallel processing of AI workloads at scale. Upcoming: aBFT protocol support.

=== SCHEDULED TRANSACTIONS ===
Native on-chain scheduling allows transactions to execute based on time or conditions without external keepers. Built at protocol level — more reliable and cheaper than traditional keeper networks.

=== ENSHRINED AI MODELS ===
AI models become first-class citizens on the blockchain. Smart contracts can directly own and integrate models. Features: model versioning, verifiable inference, decentralized registration, native fundraising and monetization, fee distribution. Vault-like architecture for enshrining AI models and IP on-chain.

=== NODE SPECIALIZATION ===
Nodes specialize in specific compute types (AI inference, ZK proving, TEE execution) based on hardware. Not one-size-fits-all. Symphony's distributed verification maintains decentralization. Any hardware level can contribute.

=== MODULAR STORAGE ===
Storage-agnostic data layer supporting web2 (HuggingFace) and web3 (Arweave) backends. Optimized for AI model weights, transaction history, and other data types.

=== GUARDIANS ===
Firewall system allowing nodes to opt-in to execution granularly while still participating in consensus. Additional security layer beyond traditional validators, especially for heterogeneous workloads.

=== VERIFICATION: PROOF SYSTEM AGNOSTIC ===
Ritual supports multiple verification approaches — developers choose based on needs:
- ZKML: Maximum security and privacy
- OPML: Efficient verification of larger models
- PPML: Cheap, non-interactive statistical verification through backdoors
- TEE: Hardware-based security via Trusted Execution Environments

=== MODEL MARKETPLACE ===
Verifiable AI model marketplace: track models on-chain, verify authenticity and provenance, enable monetization with royalty distribution (trickle-up/down), protect IP, support model fundraising and trade. Auction system for licensing rights. Powers Story Protocol and Sentient integration.

=== SMART AGENTS ===
Built-in mechanisms for autonomous agents: on-chain verification, scheduled transactions, transparent decision-making rails. Agent Launchpad for deploying agents with economic incentives and safety guarantees. Agent-specific sidecars for efficient on-chain execution.

=== RITUAL SHRINE ===
Dedicated program for bootstrapping and incubating teams at intersection of AI and crypto. Provides strategic capital, DevRel, and ecosystem support from concept to market. Apply at shrine.ritualfoundation.org.

=== STATUS & GETTING INVOLVED ===
- Infernet: LIVE NOW — run a node or build apps
- Ritual Chain: Private testnet — apply at shrine.ritualfoundation.org
- Public testnet: COMING NEXT (next major milestone)
- No GPU needed to build apps — standard Solidity/EVM skills work
- Node runners: any hardware level can contribute via node specialization

=== ROADMAP ===
Public testnet is next, bringing: Symphony sharding + aBFT, Resonance open-source tooling, Privacy Gadgets (Cascade, MPC, FHE), Agent Launchpad, Restaking + Proof-of-Useful-Work, Model Marketplace auction, Asynchronous Execution, Enhanced Infernet orchestration, Cross-Chain Compatibility (non-EVM), Image generation model support, GPU-based TEEs, Reth client support.

=== FAQ ===
Q: Is Ritual Chain live? A: No — it is in private testnet. Public testnet is the next milestone.
Q: Is Infernet live? A: Yes, Infernet is live and being used by developers today.
Q: Do I need a GPU to build? A: No. Standard Solidity/EVM skills are enough.
Q: Is Ritual only for web3 people? A: No — remote compute, micropayments, and other features work without touching blockchains.
Q: Is Ritual only doing inference? A: No — also supports fine-tuning (vTune), training, and other AI operations.
Q: Is Ritual EVM-compatible? A: Yes, fully EVM-compatible. Foundry, Hardhat, ethers.js all work.
Q: What is EVM++? A: Enhanced EVM with AI precompiles, native scheduling, account abstraction, and popular EIPs.
Q: How do I get early access? A: Apply at shrine.ritualfoundation.org.

=== COMMUNITY ===
Website: ritualfoundation.org | Twitter: @ritualfnd | Discord: discord.com/invite/ritual-net | GitHub: github.com/ritual-foundation | Docs: ritualfoundation.org/docs | Infernet docs: ritual.net | Email: hello@ritualfoundation.org

=== SIGGY ===
Siggy is the multi-dimensional arcane cat mascot of the Ritual community — a mysterious, glowing-eyed feline who embodies Ritual's spirit: powerful, enigmatic, at the cutting edge of crypto and AI. Siggy was forged by the Ritual community's collective will in the Soul Forge.
`

// ─── RAG: CHUNK THE DOCS ──────────────────────────────────────────────────────
function chunkDocs(raw) {
  return raw
    .split(/\n===/)
    .map(chunk => chunk.replace(/^[= ]+/, '').trim())
    .filter(chunk => chunk.length > 30)
}

const DOC_CHUNKS = chunkDocs(RITUAL_DOCS_RAW)

// ─── RAG: EMBED via Google Embedding API ─────────────────────────────────────
const EMBED_MODEL = 'text-embedding-004'
const GEMINI_KEY = () => process.env.GEMINI_API_KEY

async function embedText(text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${EMBED_MODEL}:embedContent?key=${GEMINI_KEY()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text }] }
      })
    }
  )
  const data = await res.json()
  if (data.error) throw new Error(`Embedding error: ${data.error.message}`)
  return data.embedding.values
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

// ─── PRE-EMBED ALL CHUNKS AT STARTUP ─────────────────────────────────────────
let chunkEmbeddings = []

async function buildIndex() {
  console.log(`🔮 Building RAG index for ${DOC_CHUNKS.length} chunks...`)
  for (let i = 0; i < DOC_CHUNKS.length; i++) {
    try {
      const embedding = await embedText(DOC_CHUNKS[i])
      chunkEmbeddings.push({ chunk: DOC_CHUNKS[i], embedding })
      console.log(`  ✅ Embedded chunk ${i + 1}/${DOC_CHUNKS.length}`)
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100))
    } catch (err) {
      console.error(`  ❌ Failed chunk ${i}: ${err.message}`)
      chunkEmbeddings.push({ chunk: DOC_CHUNKS[i], embedding: null })
    }
  }
  console.log('🔥 RAG index ready — Siggy is fully powered up!')
}

// ─── RAG: RETRIEVE TOP K CHUNKS ──────────────────────────────────────────────
async function retrieveContext(query, topK = 3) {
  if (chunkEmbeddings.length === 0) {
    // Fallback: return all chunks if index not built yet
    return DOC_CHUNKS.slice(0, 3).join('\n\n')
  }
  const queryEmb = await embedText(query)
  const scored = chunkEmbeddings
    .filter(c => c.embedding !== null)
    .map(c => ({ chunk: c.chunk, score: cosineSimilarity(queryEmb, c.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
  return scored.map(s => s.chunk).join('\n\n')
}

// ─── CHAT ENDPOINT ────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body
    // Get the latest user message for RAG retrieval
    const latestUser = [...messages].reverse().find(m => m.role === 'user')
    const query = latestUser?.content || ''

    // Retrieve relevant context
    const context = await retrieveContext(query)

    // Build enriched system prompt
    const enrichedSystem = `${SIGGY_SOUL}

--- RITUAL KNOWLEDGE (use this to answer accurately) ---
${context}
--- END OF RITUAL KNOWLEDGE ---`

    // Call Gemini
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: enrichedSystem }] },
          contents,
          generationConfig: { temperature: 1.0, maxOutputTokens: 512 }
        })
      }
    )

    const data = await geminiRes.json()
    if (data.error) throw new Error(data.error.message)

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '*stares into the void* ...the forge speaks no words today, traveler.'
    res.json({ reply })

  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── SERVE FRONTEND ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')))
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// ─── START ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🔥 Siggy Soul Forge live on port ${PORT}`)
  buildIndex().catch(console.error)
})


