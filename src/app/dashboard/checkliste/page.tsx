'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react'

type Item = {
  id: string
  title: string
  category: string
  due_date: string | null
  completed: boolean
  notes: string | null
  priority: 'low' | 'medium' | 'high'
}

const categories = ['Venue', 'Catering', 'Kleidung', 'Musik', 'Deko', 'Fotografie', 'Reise', 'Sonstiges']
const priorityColors = { low: 'var(--muted)', medium: 'var(--gold)', high: 'var(--terracotta)' }

const defaultItems = [
  { title: 'Location besichtigen & buchen', category: 'Venue', priority: 'high' as const },
  { title: 'Brautkleid aussuchen', category: 'Kleidung', priority: 'high' as const },
  { title: 'Anzug / Outfit Bräutigam', category: 'Kleidung', priority: 'high' as const },
  { title: 'Catering anfragen & buchen', category: 'Catering', priority: 'high' as const },
  { title: 'Fotografin / Fotograf buchen', category: 'Fotografie', priority: 'high' as const },
  { title: 'Einladungen gestalten & versenden', category: 'Sonstiges', priority: 'medium' as const },
  { title: 'Blumendeko planen', category: 'Deko', priority: 'medium' as const },
  { title: 'Musik / DJ buchen', category: 'Musik', priority: 'medium' as const },
  { title: 'Hochzeitsreise planen', category: 'Reise', priority: 'low' as const },
  { title: 'Standesamtlichen Termin fixieren', category: 'Sonstiges', priority: 'high' as const },
]

export default function ChecklistePage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [newItem, setNewItem] = useState<{ title: string; category: string; priority: Item['priority']; due_date: string; notes: string }>({ title: '', category: 'Sonstiges', priority: 'medium', due_date: '', notes: '' })

  async function loadItems() {
    const { data } = await supabase.from('checklist_items').select('*').order('completed').order('priority', { ascending: false })
    if (data) setItems(data as Item[])
    else {
      setItems([])
    }
    setLoading(false)
  }

  useEffect(() => { loadItems() }, [])

  async function toggleItem(id: string, completed: boolean) {
    await supabase.from('checklist_items').update({ completed: !completed }).eq('id', id)
    loadItems()
  }

  async function addItem() {
    if (!newItem.title) return
    await supabase.from('checklist_items').insert({
      title: newItem.title,
      category: newItem.category,
      priority: newItem.priority,
      due_date: newItem.due_date || null,
      notes: newItem.notes || null,
      completed: false,
    })
    setNewItem({ title: '', category: 'Sonstiges', priority: 'medium', due_date: '', notes: '' })
    setShowForm(false)
    loadItems()
  }

  async function deleteItem(id: string) {
    await supabase.from('checklist_items').delete().eq('id', id)
    loadItems()
  }

  async function seedDefaults() {
    if (!confirm('Standard-Checkliste hinzufügen?')) return
    for (const item of defaultItems) {
      await supabase.from('checklist_items').insert({ ...item, completed: false, due_date: null, notes: null })
    }
    loadItems()
  }

  const allCategories = ['Alle', ...categories]
  const filtered = items.filter(i => activeCategory === 'Alle' || i.category === activeCategory)
  const doneCount = items.filter(i => i.completed).length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Checkliste</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {doneCount} von {items.length} erledigt
          </p>
        </div>
        <div className="flex gap-3">
          {items.length === 0 && (
            <button
              onClick={seedDefaults}
              className="px-4 py-2.5 font-body text-sm tracking-widest uppercase border"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)', borderRadius: '2px' }}
            >
              Standard laden
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
            style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
          >
            <Plus size={16} />
            Aufgabe
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-6 rounded-sm" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}>
        <div className="flex justify-between mb-2">
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Fortschritt</span>
          <span className="font-body text-xs" style={{ color: 'var(--gold)' }}>
            {items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--beige)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${items.length > 0 ? (doneCount / items.length) * 100 : 0}%`,
              background: 'linear-gradient(to right, var(--terracotta), var(--gold))',
            }}
          />
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Aufgabe *"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none col-span-full"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <select
              value={newItem.category}
              onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none cursor-pointer"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={newItem.priority}
              onChange={e => setNewItem({ ...newItem, priority: e.target.value as Item['priority'] })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none cursor-pointer"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            >
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
            </select>
            <input
              type="date"
              value={newItem.due_date}
              onChange={e => setNewItem({ ...newItem, due_date: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addItem} className="px-6 py-2 font-body text-sm" style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}>
              Hinzufügen
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 font-body text-sm border" style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}>
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 font-body text-xs tracking-widest uppercase transition-all"
            style={{
              background: activeCategory === cat ? 'var(--dark-brown)' : 'var(--cream)',
              color: activeCategory === cat ? 'var(--cream)' : 'var(--muted)',
              borderRadius: '2px',
              border: '1px solid rgba(184,148,74,0.2)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {loading ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
        ) : filtered.length === 0 ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Keine Aufgaben. Füge eine hinzu!</p>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-sm transition-all hover:shadow-sm"
              style={{
                background: item.completed ? 'rgba(253,250,245,0.5)' : 'var(--cream)',
                border: '1px solid rgba(184,148,74,0.15)',
                opacity: item.completed ? 0.7 : 1,
              }}
            >
              <button onClick={() => toggleItem(item.id, item.completed)}>
                {item.completed
                  ? <CheckSquare size={20} style={{ color: 'var(--terracotta)' }} />
                  : <Square size={20} style={{ color: 'var(--muted)' }} />
                }
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className="font-body text-sm"
                  style={{
                    color: 'var(--dark-brown)',
                    textDecoration: item.completed ? 'line-through' : 'none',
                  }}
                >
                  {item.title}
                </p>
                <div className="flex gap-3 mt-0.5 flex-wrap">
                  <span className="font-body text-xs" style={{ color: 'var(--muted)' }}>{item.category}</span>
                  {item.due_date && (
                    <span className="font-body text-xs" style={{ color: 'var(--gold)' }}>
                      bis {new Date(item.due_date).toLocaleDateString('de-DE')}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: priorityColors[item.priority] }}
              />

              <button onClick={() => deleteItem(item.id)} className="hover:opacity-70" style={{ color: 'var(--muted)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
