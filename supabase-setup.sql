-- =====================================================
-- Hochzeitswebseite Eileen & Eduard – Supabase Setup
-- Dieses SQL in Supabase → SQL Editor einfügen & ausführen
-- =====================================================

-- Gästeliste
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rsvp_status TEXT DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')),
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  dietary_notes TEXT,
  message TEXT,
  table_number INTEGER,
  group_name TEXT,
  invite_code TEXT
);

-- Checkliste
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Sonstiges',
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'))
);

-- Budget
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  estimated DECIMAL(10,2) NOT NULL DEFAULT 0,
  actual DECIMAL(10,2),
  paid BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Timeline
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

-- Moodboard
CREATE TABLE IF NOT EXISTS moodboard_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  image_url TEXT NOT NULL,
  title TEXT,
  category TEXT,
  notes TEXT
);

-- Notizen
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT DEFAULT 'Notiz',
  content TEXT NOT NULL,
  color TEXT DEFAULT '#FDFAF5',
  pinned BOOLEAN DEFAULT FALSE
);

-- Tische (Sitzplan)
CREATE TABLE IF NOT EXISTS tables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  seats INTEGER DEFAULT 8,
  x_pos FLOAT DEFAULT 100,
  y_pos FLOAT DEFAULT 100,
  shape TEXT DEFAULT 'round' CHECK (shape IN ('round', 'rect'))
);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Guests: Öffentlich einfügen (RSVP), nur authentifizierte lesen/bearbeiten
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gäste können RSVP einsenden" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Nur Brautpaar kann lesen" ON guests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Nur Brautpaar kann aktualisieren" ON guests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Nur Brautpaar kann löschen" ON guests FOR DELETE USING (auth.role() = 'authenticated');

-- Alle anderen Tabellen: Nur authentifizierte
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON checklist_items FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON budget_items FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE moodboard_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON moodboard_items FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON notes FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nur Brautpaar" ON tables FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- Storage Bucket für Moodboard-Bilder
-- =====================================================
-- In Supabase → Storage → "wedding" Bucket erstellen (Public)
