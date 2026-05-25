'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Pin } from 'lucide-react'

type Note = {
  id: string
  title: string
  content: string
  color: string
  pinned: boolean
  updated_at: string
}

const noteColors = ['#FDFAF5', '#FFF3CD', '#D4EDDA', '#F8D7DA', '#D1ECF1', '#E8D5F0']
const colorLabels = ['Creme', 'Gelb', 'Grün', 'Rosa', 'Blau', 'Lila']

export default function NotizenPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '#FDFAF5' })

  async function loadNotes() {
    const { data } = await supabase.from('notes').select('*').order('pinned', { ascending: false }).order('updated_at', { ascending: false })
    if (data) setNotes(data as Note[])
    setLoading(false)
  }

  useEffect(() => { loadNotes() }, [])

  async function addNote() {
    if (!newNote.content) return
    await supabase.from('notes').insert({
      title: newNote.title || 'Notiz',
      content: newNote.content,
      color: newNote.color,
      pinned: false,
      updated_at: new Date().toISOString(),
    })
    setNewNote({ title: '', content: '', color: '#FDFAF5' })
    setShowForm(false)
    loadNotes()
  }

  async function togglePin(id: string, pinned: boolean) {
    await supabase.from('notes').update({ pinned: !pinned }).eq('id', id)
    loadNotes()
  }

  async function deleteNote(id: string) {
    if (!confirm('Notiz löschen?')) return
    await supabase.from('notes').delete().eq('id', id)
    loadNotes()
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Notizen</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {notes.length} Notizen
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
          style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
        >
          <Plus size={16} />
          Neue Notiz
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <input
            placeholder="Titel (optional)"
            value={newNote.title}
            onChange={e => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none mb-4"
            style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
          />
          <textarea
            placeholder="Notiz schreiben..."
            rows={4}
            value={newNote.content}
            onChange={e => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none resize-none mb-4"
            style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
          />
          <div className="flex gap-2 mb-4">
            {noteColors.map((color, i) => (
              <button
                key={color}
                onClick={() => setNewNote({ ...newNote, color })}
                className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  background: color,
                  borderColor: newNote.color === color ? 'var(--gold)' : 'rgba(184,148,74,0.3)',
                }}
                title={colorLabels[i]}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={addNote} className="px-6 py-2 font-body text-sm" style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}>
              Speichern
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 font-body text-sm border" style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}>
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {loading ? (
        <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
      ) : notes.length === 0 ? (
        <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Noch keine Notizen. Erstelle eine!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow relative"
              style={{ background: note.color, border: '1px solid rgba(184,148,74,0.2)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="font-heading text-lg font-semibold flex-1" style={{ color: 'var(--dark-brown)' }}>
                  {note.title}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => togglePin(note.id, note.pinned)}
                    className="p-1 transition-colors hover:opacity-70"
                    style={{ color: note.pinned ? 'var(--gold)' : 'var(--muted)' }}
                  >
                    <Pin size={14} fill={note.pinned ? 'var(--gold)' : 'none'} />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="p-1 hover:opacity-70" style={{ color: 'var(--muted)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="font-body font-light text-sm whitespace-pre-wrap" style={{ color: 'var(--dark-brown)' }}>
                {note.content}
              </p>
              <p className="font-body text-xs mt-4" style={{ color: 'var(--muted)' }}>
                {new Date(note.updated_at).toLocaleDateString('de-DE')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
