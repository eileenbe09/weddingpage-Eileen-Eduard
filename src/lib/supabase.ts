import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      guests: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string | null
          phone: string | null
          rsvp_status: 'pending' | 'confirmed' | 'declined'
          adults: number
          children: number
          dietary_notes: string | null
          message: string | null
          table_number: number | null
          group_name: string | null
          invite_code: string | null
        }
        Insert: Omit<Database['public']['Tables']['guests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['guests']['Insert']>
      }
      checklist_items: {
        Row: {
          id: string
          created_at: string
          title: string
          category: string
          due_date: string | null
          completed: boolean
          notes: string | null
          priority: 'low' | 'medium' | 'high'
        }
        Insert: Omit<Database['public']['Tables']['checklist_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['checklist_items']['Insert']>
      }
      budget_items: {
        Row: {
          id: string
          created_at: string
          category: string
          title: string
          estimated: number
          actual: number | null
          paid: boolean
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['budget_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['budget_items']['Insert']>
      }
      timeline_events: {
        Row: {
          id: string
          created_at: string
          time: string
          title: string
          description: string | null
          location: string | null
          icon: string | null
          order_index: number
        }
        Insert: Omit<Database['public']['Tables']['timeline_events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['timeline_events']['Insert']>
      }
      moodboard_items: {
        Row: {
          id: string
          created_at: string
          image_url: string
          title: string | null
          category: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['moodboard_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['moodboard_items']['Insert']>
      }
      notes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          color: string
          pinned: boolean
        }
        Insert: Omit<Database['public']['Tables']['notes']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['notes']['Insert']>
      }
      tables: {
        Row: {
          id: string
          created_at: string
          name: string
          seats: number
          x_pos: number
          y_pos: number
          shape: 'round' | 'rect'
        }
        Insert: Omit<Database['public']['Tables']['tables']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tables']['Insert']>
      }
    }
  }
}
