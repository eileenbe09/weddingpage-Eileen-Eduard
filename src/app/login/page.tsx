'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (authError) {
      setError('E-Mail oder Passwort falsch.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--dark-brown)' }}>
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase mb-12 hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft size={14} />
          Zur Hochzeitsseite
        </Link>

        <div className="text-center mb-12">
          <p className="font-script text-5xl mb-4" style={{ color: 'var(--gold)' }}>
            Eileen & Eduard
          </p>
          <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: 'var(--muted)' }}>
            Brautpaar-Bereich
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(253,250,245,0.5)' }}>
              E-Mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--cream)' }}
            />
          </div>

          <div>
            <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(253,250,245,0.5)' }}>
              Passwort
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 font-body font-light text-sm outline-none border-b-2 bg-transparent"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--cream)' }}
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
            className="py-4 font-body text-sm tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50 mt-4"
            style={{
              background: 'var(--gold)',
              color: 'var(--dark-brown)',
              borderRadius: '2px',
              letterSpacing: '0.2em',
              fontWeight: 600,
            }}
          >
            {loading ? 'Anmelden...' : 'Einloggen'}
          </button>
        </form>
      </div>
    </div>
  )
}
