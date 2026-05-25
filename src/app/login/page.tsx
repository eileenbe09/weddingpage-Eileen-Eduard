'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authErr) setError('E-Mail oder Passwort falsch.')
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--espresso)' }}>
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-2 mb-14 hover:text-[var(--honey)] transition-colors"
          style={{ color: 'rgba(242,234,217,0.4)' }}
        >
          <ArrowLeft size={14} /> Zur Hochzeitsseite
        </Link>

        {/* Branding */}
        <div className="text-center mb-14">
          <p className="f-script mb-3" style={{ fontSize: '4rem', color: 'var(--honey)', lineHeight: 1 }}>
            E &amp; E
          </p>
          <p className="eyebrow" style={{ color: 'rgba(242,234,217,0.35)' }}>Brautpaar-Bereich</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div>
            <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'rgba(242,234,217,0.4)' }}>
              E-Mail
            </label>
            <input
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="field"
              style={{ borderColor: 'rgba(201,168,108,0.3)', color: 'var(--warm-white)' }}
            />
          </div>
          <div>
            <label className="eyebrow block mb-2" style={{ fontSize: '0.6rem', color: 'rgba(242,234,217,0.4)' }}>
              Passwort
            </label>
            <input
              type="password" required
              value={password} onChange={e => setPassword(e.target.value)}
              className="field"
              style={{ borderColor: 'rgba(201,168,108,0.3)', color: 'var(--warm-white)' }}
            />
          </div>

          {error && <p className="f-sans text-sm text-center" style={{ color: 'var(--rose)' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center disabled:opacity-50 mt-4"
            style={{ background: 'var(--honey)', borderColor: 'var(--honey)', color: 'var(--espresso)', fontWeight: 500 }}
          >
            {loading ? 'Anmelden…' : 'Einloggen'}
          </button>
        </form>
      </div>
    </div>
  )
}
