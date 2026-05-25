'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useDropzone } from 'react-dropzone'
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react'

type MoodboardItem = {
  id: string
  image_url: string
  title: string | null
  category: string | null
  notes: string | null
}

const categories = ['Alle', 'Deko', 'Blumen', 'Kleidung', 'Frisur & Make-up', 'Tisch', 'Location', 'Sonstiges']

export default function MoodboardPage() {
  const [items, setItems] = useState<MoodboardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [newItemCategory, setNewItemCategory] = useState('Deko')
  const [newItemTitle, setNewItemTitle] = useState('')

  async function loadItems() {
    const { data } = await supabase.from('moodboard_items').select('*').order('created_at', { ascending: false })
    if (data) setItems(data as MoodboardItem[])
    setLoading(false)
  }

  useEffect(() => { loadItems() }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    for (const file of acceptedFiles) {
      const fileName = `moodboard/${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wedding')
        .upload(fileName, file)

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from('wedding').getPublicUrl(fileName)
        await supabase.from('moodboard_items').insert({
          image_url: urlData.publicUrl,
          title: newItemTitle || null,
          category: newItemCategory,
          notes: null,
        })
      }
    }
    setUploading(false)
    setNewItemTitle('')
    loadItems()
  }, [newItemCategory, newItemTitle])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  })

  async function deleteItem(id: string, imageUrl: string) {
    if (!confirm('Bild entfernen?')) return
    const path = imageUrl.split('/wedding/')[1]
    if (path) await supabase.storage.from('wedding').remove([path])
    await supabase.from('moodboard_items').delete().eq('id', id)
    loadItems()
  }

  const filtered = items.filter(i => activeCategory === 'Alle' || i.category === activeCategory)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Moodboard</h1>
        <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Inspiration und Ideen sammeln
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Bezeichnung (optional)"
          value={newItemTitle}
          onChange={e => setNewItemTitle(e.target.value)}
          className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
          style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
        />
        <select
          value={newItemCategory}
          onChange={e => setNewItemCategory(e.target.value)}
          className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none cursor-pointer"
          style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
        >
          {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div
        {...getRootProps()}
        className="mb-8 p-12 rounded-sm border-2 border-dashed text-center cursor-pointer transition-all"
        style={{
          borderColor: isDragActive ? 'var(--terracotta)' : 'rgba(184,148,74,0.4)',
          background: isDragActive ? 'rgba(200,149,108,0.05)' : 'var(--cream)',
        }}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>Lädt hoch...</p>
          ) : (
            <>
              <Upload size={32} style={{ color: 'var(--terracotta)' }} />
              <p className="font-body text-sm" style={{ color: 'var(--dark-brown)' }}>
                {isDragActive ? 'Bilder hier ablegen...' : 'Bilder hierher ziehen oder klicken zum Auswählen'}
              </p>
              <p className="font-body text-xs" style={{ color: 'var(--muted)' }}>JPG, PNG, WEBP · Mehrere Bilder gleichzeitig möglich</p>
            </>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
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

      {/* Grid */}
      {loading ? (
        <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon size={48} style={{ color: 'var(--muted)', margin: '0 auto' }} />
          <p className="font-body text-sm mt-4" style={{ color: 'var(--muted)' }}>Noch keine Bilder. Lade deine ersten Inspirationsbilder hoch!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(item => (
            <div
              key={item.id}
              className="relative group rounded-sm overflow-hidden aspect-square"
              style={{ background: 'var(--beige)' }}
            >
              <img
                src={item.image_url}
                alt={item.title ?? ''}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  onClick={() => deleteItem(item.id, item.image_url)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/20 hover:bg-white/40"
                >
                  <Trash2 size={16} color="white" />
                </button>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60">
                  <p className="font-body text-xs text-white">{item.title}</p>
                </div>
              )}
              {item.category && (
                <div className="absolute top-2 left-2">
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(253,250,245,0.9)', color: 'var(--terracotta)' }}
                  >
                    {item.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
