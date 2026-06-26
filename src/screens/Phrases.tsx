import { useState } from 'react'
import { Link } from 'react-router-dom'
import { phrasebook } from '../data/phrasebook'

function speak(text: string, lang: string) {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  } catch { /* sin voz disponible */ }
}

export default function Phrases() {
  const [li, setLi] = useState(0)
  const lang = phrasebook[li]

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Frases útiles</h1>
        <div className="sub">Funciona sin conexión · toca 🔊 para oírlas</div>
      </div>

      {/* Selector de idioma */}
      <div className="ph-langs">
        {phrasebook.map((l, i) => (
          <button key={l.code} className={`ph-lang ${i === li ? 'on' : ''}`} onClick={() => setLi(i)}>{l.flag} {l.label}</button>
        ))}
      </div>
      <div className="ph-note">{lang.note}</div>

      {lang.cats.map((cat) => (
        <div key={cat.title}>
          <div className="section-title">{cat.icon} {cat.title}</div>
          <div className="card">
            {cat.items.map((p, i) => (
              <button key={i} className="phrase-row" onClick={() => speak(p.local, lang.lang)}>
                <span className="pr-body">
                  <span className="pr-es">{p.es}</span>
                  <span className="pr-local">{p.local}{p.pron && <span className="pr-pron"> · {p.pron}</span>}</span>
                </span>
                <span className="pr-spk">🔊</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{ height: 12 }} />
    </div>
  )
}
