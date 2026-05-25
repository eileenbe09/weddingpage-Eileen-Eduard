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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--dark)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <Link href="/" className="eyebrow" style={{ color: 'rgba(253,250,245,0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3.5rem' }}>
          <ArrowLeft size={13} /> Zur Hochzeitsseite
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="t-display" style={{ fontSize: '3.5rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}>
            E &amp; E
          </p>
          <p className="eyebrow" style={{ color: 'rgba(253,250,245,0.25)', fontSize: '0.55rem' }}>Brautpaar-Bereich</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label className="eyebrow" style={{ fontSize: '0.55rem', color: 'rgba(253,250,245,0.3)', display: 'block', marginBottom: '0.5rem' }}>E-Mail</label>
            <input type="email" required className="field" value={email} onChange={e => setEmail(e.target.value)}
              style={{ borderColor: 'rgba(200,169,110,0.2)', color: 'rgba(253,250,245,0.85)' }} />
          </div>
          <div>
            <label className="eyebrow" style={{ fontSize: '0.55rem', color: 'rgba(253,250,245,0.3)', display: 'block', marginBottom: '0.5rem' }}>Passwort</label>
            <input type="password" required className="field" value={password} onChange={e => setPassword(e.target.value)}
              style={{ borderColor: 'rgba(200,169,110,0.2)', color: 'rgba(253,250,245,0.85)' }} />
          </div>

          {error && <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--rose)', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn btn-gold" style={{ marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Anmelden…' : 'Einloggen'}
          </button>
        </form>
      </div>
    </div>
  )
}
