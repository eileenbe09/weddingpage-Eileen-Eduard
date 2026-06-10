'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authErr) setError('E-Mail oder Passwort falsch.')
    else router.push('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', background: 'linear-gradient(145deg, #EAE0CF 0%, #B6C8A2 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <Link href="/" className="eyebrow" style={{
          color: 'var(--mid)', display: 'inline-flex', alignItems: 'center',
          gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none',
        }}>
          <ArrowLeft size={13} /> Zur Hochzeitsseite
        </Link>

        <div style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '2.75rem 2.25rem', boxShadow: '0 8px 40px rgba(26,34,22,0.10)' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <p className="t-display" style={{ fontSize: '3rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem' }}>
              E &amp; E
            </p>
            <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.52rem' }}>Brautpaar-Bereich</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.52rem', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>E-Mail</label>
              <input type="email" required className="field" placeholder="deine@email.de"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.52rem', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>Passwort</label>
              <input type="password" required className="field" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--rose)', textAlign: 'center' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-gold"
              style={{ marginTop: '0.25rem', opacity: loading ? 0.6 : 1, width: '100%', textAlign: 'center' }}>
              {loading ? 'Anmelden…' : 'Einloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
