'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type RSVPStatus = 'confirmed' | 'declined' | null

export default function RSVPPage() {
  const [status, setStatus] = useState<RSVPStatus>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    dietary_notes: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!status) {
      setError('Bitte wählt aus, ob ihr zusagen oder absagen möchtet.')
      return
    }
    setLoading(true)
    setError('')

    const { error: dbError } = await supabase.from('guests').insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      rsvp_status: status,
      adults: form.adults,
      children: form.children,
      dietary_notes: form.dietary_notes || null,
      message: form.message || null,
    })

    setLoading(false)
    if (dbError) {
      setError('Es ist ein Fehler aufgetreten. Bitte versucht es erneut oder kontaktiert die Trauzeugen.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--cream)' }}>
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: status === 'confirmed' ? 'var(--terracotta)' : 'var(--muted)' }}
          >
            {status === 'confirmed' ? (
              <Check size={36} color="white" />
            ) : (
              <X size={36} color="white" />
            )}
          </div>

          <h2 className="font-heading text-4xl font-light mb-4" style={{ color: 'var(--dark-brown)' }}>
            {status === 'confirmed' ? 'Wir freuen uns!' : 'Schade, aber okay!'}
          </h2>

          <p className="font-body font-light text-base mb-8" style={{ color: 'var(--muted)' }}>
            {status === 'confirmed'
              ? `Vielen Dank, ${form.name}! Eure Zusage ist bei uns eingegangen. Wir freuen uns sehr, diesen besonderen Tag mit euch zu teilen.`
              : `Danke für die Nachricht, ${form.name}. Ihr werdet uns fehlen! Wenn sich etwas ändert, meldet euch gerne.`}
          </p>

          <div className="gold-divider w-32 mx-auto mb-8">
            <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✦</span>
          </div>

          <p className="font-heading italic text-xl mb-8" style={{ color: 'var(--dark-brown)' }}>
            Eileen & Eduard
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase hover:opacity-70"
            style={{ color: 'var(--terracotta)' }}
          >
            <ArrowLeft size={14} />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24 px-6" style={{ background: 'var(--cream)' }}>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase mb-12 hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft size={14} />
          Zurück
        </Link>

        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--terracotta)' }}>
            10. Juli 2026
          </p>
          <h1
            className="font-script leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', color: 'var(--dark-brown)' }}
          >
            Seid ihr dabei?
          </h1>
          <p className="font-body font-light" style={{ color: 'var(--muted)' }}>
            Bitte antwortet bis zum 27. Mai 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Zu/Absage Auswahl */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setStatus('confirmed')}
              className="py-6 flex flex-col items-center gap-3 border-2 rounded-sm transition-all"
              style={{
                borderColor: status === 'confirmed' ? 'var(--terracotta)' : 'rgba(184,148,74,0.3)',
                background: status === 'confirmed' ? 'rgba(200,149,108,0.1)' : 'transparent',
              }}
            >
              <Check size={28} style={{ color: status === 'confirmed' ? 'var(--terracotta)' : 'var(--muted)' }} />
              <span className="font-body text-sm tracking-widest uppercase" style={{ color: status === 'confirmed' ? 'var(--terracotta)' : 'var(--muted)' }}>
                Ich bin dabei!
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('declined')}
              className="py-6 flex flex-col items-center gap-3 border-2 rounded-sm transition-all"
              style={{
                borderColor: status === 'declined' ? 'var(--dark-brown)' : 'rgba(184,148,74,0.3)',
                background: status === 'declined' ? 'rgba(74,55,40,0.1)' : 'transparent',
              }}
            >
              <X size={28} style={{ color: status === 'declined' ? 'var(--dark-brown)' : 'var(--muted)' }} />
              <span className="font-body text-sm tracking-widest uppercase" style={{ color: status === 'declined' ? 'var(--dark-brown)' : 'var(--muted)' }}>
                Leider nicht
              </span>
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
              Euer Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Vor- und Nachname"
              className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent transition-colors"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>

          {status === 'confirmed' && (
            <>
              {/* Personen */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
                    Erwachsene
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.adults}
                    onChange={(e) => setForm({ ...form, adults: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
                    style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
                    Kinder
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={form.children}
                    onChange={(e) => setForm({ ...form, children: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
                    style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
                  />
                </div>
              </div>

              {/* Dietary */}
              <div>
                <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
                  Besondere Ernährungswünsche
                </label>
                <input
                  type="text"
                  value={form.dietary_notes}
                  onChange={(e) => setForm({ ...form, dietary_notes: e.target.value })}
                  placeholder="z.B. vegetarisch, vegan, Allergien..."
                  className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
                  style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
                />
              </div>
            </>
          )}

          {/* Email/Telefon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
                E-Mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="eure@email.de"
                className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
                style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
                Telefon
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Eure Telefonnummer"
                className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
                style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
              />
            </div>
          </div>

          {/* Nachricht */}
          <div>
            <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--dark-brown)' }}>
              Nachricht ans Brautpaar
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Eure persönlichen Worte..."
              className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent resize-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>

          {error && (
            <p className="font-body text-sm text-center" style={{ color: 'var(--terracotta)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-4 font-body text-sm tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: 'var(--terracotta)',
              color: 'white',
              borderRadius: '2px',
              letterSpacing: '0.2em',
            }}
          >
            {loading ? 'Wird gesendet...' : 'Absenden'}
          </button>
        </form>
      </div>
    </div>
  )
}
