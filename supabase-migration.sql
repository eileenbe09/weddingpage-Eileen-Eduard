-- Migration: table_id Spalte zu guests hinzufügen
-- Einmalig im Supabase SQL-Editor ausführen

ALTER TABLE guests ADD COLUMN IF NOT EXISTS table_id TEXT;
