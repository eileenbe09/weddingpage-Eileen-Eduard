'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Check } from 'lucide-react'

type BudgetItem = {
  id: string
  category: string
  title: string
  estimated: number
  actual: number | null
  paid: boolean
  notes: string | null
}

const categories = ['Location', 'Catering', 'Kleidung', 'Deko', 'Musik', 'Fotografie', 'Ringe', 'Einladungen', 'Reise', 'Sonstiges']

export default function BudgetPage() {
  const [items, setItems] = useState<BudgetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({ category: 'Sonstiges', title: '', estimated: '', actual: '', notes: '' })
  const [totalBudget, setTotalBudget] = useState(15000)

  async function loadItems() {
    const { data } = await supabase.from('budget_items').select('*').order('category')
    if (data) setItems(data as BudgetItem[])
    setLoading(false)
  }

  useEffect(() => { loadItems() }, [])

  async function addItem() {
    if (!newItem.title || !newItem.estimated) return
    await supabase.from('budget_items').insert({
      category: newItem.category,
      title: newItem.title,
      estimated: parseFloat(newItem.estimated),
      actual: newItem.actual ? parseFloat(newItem.actual) : null,
      paid: false,
      notes: newItem.notes || null,
    })
    setNewItem({ category: 'Sonstiges', title: '', estimated: '', actual: '', notes: '' })
    setShowForm(false)
    loadItems()
  }

  async function togglePaid(id: string, paid: boolean) {
    await supabase.from('budget_items').update({ paid: !paid }).eq('id', id)
    loadItems()
  }

  async function deleteItem(id: string) {
    await supabase.from('budget_items').delete().eq('id', id)
    loadItems()
  }

  const totalEstimated = items.reduce((sum, i) => sum + i.estimated, 0)
  const totalActual = items.reduce((sum, i) => sum + (i.actual ?? i.estimated), 0)
  const totalPaid = items.filter(i => i.paid).reduce((sum, i) => sum + (i.actual ?? i.estimated), 0)
  const remaining = totalBudget - totalActual

  const formatEur = (n: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n)

  const groupedByCategory = categories
    .map(cat => ({ cat, items: items.filter(i => i.category === cat) }))
    .filter(g => g.items.length > 0)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Budget</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Überblick über alle Kosten
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
          style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
        >
          <Plus size={16} />
          Position
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Gesamtbudget', value: formatEur(totalBudget), color: 'var(--dark-brown)' },
          { label: 'Geplant', value: formatEur(totalEstimated), color: 'var(--gold)' },
          { label: 'Aktuell', value: formatEur(totalActual), color: remaining < 0 ? 'var(--terracotta)' : 'var(--dark-brown)' },
          { label: 'Bezahlt', value: formatEur(totalPaid), color: 'var(--terracotta)' },
        ].map((card, i) => (
          <div key={i} className="p-5 rounded-sm" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}>
            <p className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>{card.label}</p>
            <p className="font-heading text-2xl font-light" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Budget Bar */}
      <div className="mb-8 p-6 rounded-sm" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}>
        <div className="flex justify-between mb-2">
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Budget genutzt</span>
          <span className="font-body text-xs" style={{ color: remaining < 0 ? 'var(--terracotta)' : 'var(--gold)' }}>
            {formatEur(remaining)} {remaining < 0 ? 'überzogen' : 'verbleibend'}
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--beige)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min((totalActual / totalBudget) * 100, 100)}%`,
              background: remaining < 0
                ? 'var(--terracotta)'
                : 'linear-gradient(to right, var(--gold), var(--terracotta))',
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-body text-xs" style={{ color: 'var(--muted)' }}>0 €</span>
          <span className="font-body text-xs" style={{ color: 'var(--muted)' }}>
            Gesamtbudget: {formatEur(totalBudget)}
            <button
              onClick={() => {
                const val = prompt('Gesamtbudget in €:', String(totalBudget))
                if (val) setTotalBudget(parseFloat(val))
              }}
              className="ml-2 underline"
              style={{ color: 'var(--gold)' }}
            >
              ändern
            </button>
          </span>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={newItem.category}
              onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none cursor-pointer"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              placeholder="Bezeichnung *"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Geplant (€) *"
              type="number"
              value={newItem.estimated}
              onChange={e => setNewItem({ ...newItem, estimated: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Tatsächlich (€)"
              type="number"
              value={newItem.actual}
              onChange={e => setNewItem({ ...newItem, actual: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addItem} className="px-6 py-2 font-body text-sm" style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}>Hinzufügen</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 font-body text-sm border" style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* Items by Category */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
        ) : groupedByCategory.length === 0 ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Noch keine Positionen. Füge eine hinzu!</p>
        ) : (
          groupedByCategory.map(({ cat, items: catItems }) => (
            <div key={cat}>
              <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--terracotta)' }}>{cat}</p>
              <div className="flex flex-col gap-2">
                {catItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-sm"
                    style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.15)' }}
                  >
                    <div className="flex-1">
                      <p className="font-body text-sm" style={{ color: 'var(--dark-brown)' }}>{item.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm" style={{ color: 'var(--dark-brown)' }}>
                        {formatEur(item.actual ?? item.estimated)}
                      </p>
                      {item.actual && item.actual !== item.estimated && (
                        <p className="font-body text-xs" style={{ color: 'var(--muted)' }}>
                          Geplant: {formatEur(item.estimated)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => togglePaid(item.id, item.paid)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-body text-xs transition-all"
                      style={{
                        background: item.paid ? 'rgba(200,149,108,0.2)' : 'transparent',
                        color: item.paid ? 'var(--terracotta)' : 'var(--muted)',
                        border: '1px solid',
                        borderColor: item.paid ? 'var(--terracotta)' : 'rgba(184,148,74,0.3)',
                      }}
                    >
                      {item.paid && <Check size={10} />}
                      {item.paid ? 'Bezahlt' : 'Offen'}
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="hover:opacity-70" style={{ color: 'var(--muted)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
