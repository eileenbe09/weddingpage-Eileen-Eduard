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
  const [form, setForm] = useState({ name: '', email: '', phone: '', adults: 1, children: 0, dietary_notes: '', message: '' })

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

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--off)' }}>
      <div style={{ maxWidth: '420px', textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 2rem',
          background: status === 'confirmed' ? 'var(--gold)' : 'var(--muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {status === 'confirmed' ? <Check size={28} color="#fff" /> : <X size={28} color="#fff" />}
        </div>
        <h2 className="t-display" style={{ fontSize: '2.2rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)', marginBottom: '1rem' }}>
          {status === 'confirmed' ? 'Wir freuen uns!' : 'Schade, aber okay!'}
        </h2>
        <p className="t-ui" style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '2.5rem' }}>
          {status === 'confirmed'
            ? `Danke, ${form.name}! Wir freuen uns sehr, diesen besonderen Tag mit euch zu teilen.`
            : `Danke für die Nachricht, ${form.name}. Ihr werdet uns fehlen!`}
        </p>
        <div className="divider" style={{ width: '80px', margin: '0 auto 2rem' }}>
          <span style={{ fontSize: '0.4rem', letterSpacing: '1em', color: 'var(--gold)' }}>◆</span>
        </div>
        <p className="t-display" style={{ fontSize: '2rem', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '2rem', fontWeight: 400 }}>
          Eileen &amp; Eduard
        </p>
        <Link href="/" className="eyebrow" style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={13} /> Zurück zur Startseite
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off)', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <Link href="/" className="eyebrow" style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3.5rem' }}>
          <ArrowLeft size={13} /> Zurück
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>10. Juli 2026</p>
          <h1 className="t-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Seid ihr dabei?
          </h1>
          <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Bitte antwortet bis zum 27. Mai 2026</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Zu/Absage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {([
              { val: 'confirmed' as const, icon: <Check size={20}/>, label: 'Ich bin dabei!' },
              { val: 'declined'  as const, icon: <X     size={20}/>, label: 'Leider nicht' },
            ]).map(opt => (
              <button key={opt.val} type="button" onClick={() => setStatus(opt.val)}
                style={{
                  padding: '1.8rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                  border: `1px solid ${status === opt.val ? 'var(--gold)' : 'var(--light)'}`,
                  background: status === opt.val ? 'rgba(200,169,110,0.08)' : 'var(--white)',
                  color: status === opt.val ? 'var(--gold-d)' : 'var(--muted)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {opt.icon}
                <span className="eyebrow" style={{ fontSize: '0.58rem', color: 'inherit' }}>{opt.label}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Name *</label>
            <input required className="field" placeholder="Vor- und Nachname" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          {status === 'confirmed' && (<>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Erwachsene</label>
                <input type="number" min={1} max={10} className="field" value={form.adults} onChange={e => setForm({ ...form, adults: +e.target.value })} />
              </div>
              <div>
                <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Kinder</label>
                <input type="number" min={0} max={10} className="field" value={form.children} onChange={e => setForm({ ...form, children: +e.target.value })} />
              </div>
            </div>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Ernährungswünsche</label>
              <input className="field" placeholder="z. B. vegetarisch, vegan, Allergien…" value={form.dietary_notes} onChange={e => setForm({ ...form, dietary_notes: e.target.value })} />
            </div>
          </>)}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>E-Mail</label>
              <input type="email" className="field" placeholder="eure@email.de" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Telefon</label>
              <input type="tel" className="field" placeholder="Telefonnummer" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="eyebrow" style={{ fontSize: '0.56rem', color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>Nachricht ans Brautpaar</label>
            <textarea rows={4} className="field" style={{ resize: 'none' }} placeholder="Eure persönlichen Worte…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>

          {error && <p className="t-ui" style={{ fontSize: '0.85rem', color: 'var(--rose)', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn btn-dark" style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Wird gesendet…' : 'Absenden'}
          </button>
        </form>
      </div>
    </div>
  )
}
