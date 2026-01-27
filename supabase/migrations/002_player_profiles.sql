-- Migration: Create player_profiles table for paintball-specific training
-- Run this in Supabase SQL Editor

-- Step 1: Create player_profiles table
CREATE TABLE IF NOT EXISTS player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Position & Field Preferences
  primary_position TEXT NOT NULL CHECK (primary_position IN ('back', 'mid', 'front')),
  field_side_bias TEXT NOT NULL CHECK (field_side_bias IN ('snake', 'dorito', 'both')),

  -- Experience & Division
  current_division TEXT NOT NULL CHECK (current_division IN ('recreational', 'D5', 'D4', 'D3', 'D2', 'D1', 'Pro')),
  years_experience INTEGER NOT NULL CHECK (years_experience >= 0 AND years_experience <= 50),

  -- Training Phase
  current_phase TEXT NOT NULL CHECK (current_phase IN ('off_season', 'in_season', 'pre_tournament')),
  next_tournament_date DATE,

  -- Training Availability
  training_days_per_week INTEGER NOT NULL CHECK (training_days_per_week >= 2 AND training_days_per_week <= 4),

  -- Computed experience level
  experience_level TEXT GENERATED ALWAYS AS (
    CASE
      WHEN years_experience >= 5 THEN 'advanced'
      WHEN years_experience >= 2 THEN 'intermediate'
      ELSE 'beginner'
    END
  ) STORED,

  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one profile per user
  UNIQUE(user_id)
);

-- Step 2: Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_player_profiles_user ON player_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_player_profiles_position ON player_profiles(primary_position);
CREATE INDEX IF NOT EXISTS idx_player_profiles_phase ON player_profiles(current_phase);
CREATE INDEX IF NOT EXISTS idx_player_profiles_division ON player_profiles(current_division);

-- Step 3: Enable Row Level Security
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS Policies

-- Users can view their own player profile
CREATE POLICY "Users can view own player profile" ON player_profiles
  FOR SELECT USING (user_id = auth.uid());

-- Users can insert their own player profile
CREATE POLICY "Users can insert own player profile" ON player_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own player profile
CREATE POLICY "Users can update own player profile" ON player_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Users can delete their own player profile
CREATE POLICY "Users can delete own player profile" ON player_profiles
  FOR DELETE USING (user_id = auth.uid());

-- Coaches can view their clients' player profiles
CREATE POLICY "Coaches can view client player profiles" ON player_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_id = auth.uid()
      AND client_id = player_profiles.user_id
      AND status = 'active'
    )
  );

-- Step 5: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_player_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_player_profiles_updated_at
  BEFORE UPDATE ON player_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_player_profiles_updated_at();

-- Step 6: Add date_of_birth to user_profiles if not exists
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
