'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type RSVPStatus = 'confirmed' | 'declined' | null

export default function RSVPPage() {
  const [status,    setStatus]    = useState<RSVPStatus>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    adults: 1, children: 0,
    dietary_notes: '', message: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!status) { setError('Bitte wählt Zu- oder Absage.'); return }
    setLoading(true); setError('')
    const { error: dbErr } = await supabase.from('guests').insert({
      name: form.name, email: form.email || null, phone: form.phone || null,
      rsvp_status: status, adults: form.adults, children: form.children,
      dietary_notes: form.dietary_notes || null, message: form.message || null,
    })
    setLoading(false)
    if (dbErr) setError('Ein Fehler ist aufgetreten. Bitte versucht es erneut.')
    else setSubmitted(true)
  }

  /* ── Bestätigungsseite ─────────────────────── */
  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--linen)' }}>
      <div className="max-w-md w-full text-center py-20">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: status === 'confirmed' ? 'var(--caramel)' : 'var(--muted)' }}
        >
          {status === 'confirmed' ? <Check size={32} color="#fff" /> : <X size={32} color="#fff" />}
        </div>
        <h2 className="f-serif mb-4" style={{ fontSize: '2.4rem', color: 'var(--espresso)', fontWeight: 400 }}>
          {status === 'confirmed' ? 'Wir freuen uns!' : 'Schade, aber okay!'}
        </h2>
        <p className="f-sans mb-10" style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9 }}>
          {status === 'confirmed'
            ? `Vielen Dank, ${form.name}! Wir freuen uns sehr darauf, diesen besonderen Tag mit euch zu teilen.`
            : `Danke für die Nachricht, ${form.name}. Ihr werdet uns fehlen!`}
        </p>
        <div className="ornament w-24 mx-auto mb-10">
          <span style={{ color: 'var(--honey)', fontSize: '0.5rem', letterSpacing: '0.7em' }}>✦ ✦ ✦</span>
        </div>
        <p className="f-script mb-8" style={{ fontSize: '3rem', color: 'var(--honey)' }}>Eileen &amp; Eduard</p>
        <Link href="/" className="eyebrow inline-flex items-center gap-2 hover:text-[var(--honey)] transition-colors" style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={14} /> Zurück zur Startseite
        </Link>
      </div>
    </div>
  )

  /* ── Formular ──────────────────────────────── */
  return (
    <div className="min-h-screen py-24 px-6" style={{ background: 'var(--linen)' }}>
      <div className="max-w-xl mx-auto">

        <Link href="/" className="eyebrow inline-flex items-center gap-2 mb-14 hover:text-[var(--honey)] transition-colors" style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={14} /> Zurück
        </Link>

        {/* Headline */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">10. Juli 2026</p>
          <h1 className="f-script leading-none mb-4" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', color: 'var(--bark)' }}>
            Seid ihr dabei?
          </h1>
          <p className="f-sans" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
            Bitte antwortet bis zum 27. Mai 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

          {/* Zu-/Absage */}
          <div className="grid grid-cols-2 gap-4">
            {([
              { val: 'confirmed', icon: <Check size={22} />, label: 'Ich bin dabei!' },
              { val: 'declined',  icon: <X    size={22} />, label: 'Leider nicht' },
            ] as const).map(opt => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setStatus(opt.val)}
                className="py-7 flex flex-col items-center gap-3 border transition-all"
                style={{
                  borderColor: status === opt.val ? 'var(--caramel)' : 'var(--sand)',
                  background:  status === opt.val ? 'rgba(166,124,82,0.08)' : '#fff',
                  color: status === opt.val ? 'var(--caramel)' : 'var(--muted)',
                }}
              >
                {opt.icon}
                <span className="eyebrow" style={{ fontSize: '0.62rem', color: 'inherit' }}>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Name */}
          <div>
            <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>
              Name *
            </label>
            <input required className="field" placeholder="Vor- und Nachname"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          {status === 'confirmed' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>Erwachsene</label>
                  <input type="number" min={1} max={10} className="field"
                    value={form.adults} onChange={e => setForm({ ...form, adults: +e.target.value })} />
                </div>
                <div>
                  <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>Kinder</label>
                  <input type="number" min={0} max={10} className="field"
                    value={form.children} onChange={e => setForm({ ...form, children: +e.target.value })} />
                </div>
              </div>

              <div>
                <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>
                  Ernährungswünsche
                </label>
                <input className="field" placeholder="z. B. vegetarisch, vegan, Allergien..."
                  value={form.dietary_notes} onChange={e => setForm({ ...form, dietary_notes: e.target.value })} />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>E-Mail</label>
              <input type="email" className="field" placeholder="eure@email.de"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>Telefon</label>
              <input type="tel" className="field" placeholder="Telefonnummer"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'var(--espresso)' }}>
              Nachricht ans Brautpaar
            </label>
            <textarea rows={4} className="field resize-none" placeholder="Eure persönlichen Worte..."
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>

          {error && <p className="f-sans text-sm text-center" style={{ color: 'var(--rose)' }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full text-center disabled:opacity-50">
            {loading ? 'Wird gesendet…' : 'Absenden'}
          </button>
        </form>
      </div>
    </div>
  )
}
