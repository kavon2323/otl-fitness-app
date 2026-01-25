-- OTL Complete Database Schema
-- Run this in your Supabase SQL Editor
-- This creates all required tables for BOTH the mobile app AND coach portal

-- ============================================
-- STEP 1: Create base tables
-- ============================================

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'coach', 'admin')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'coaching')),
  current_program_id TEXT,
  current_week INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coach-Client Relationships
CREATE TABLE IF NOT EXISTS coach_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'paused', 'terminated')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(coach_id, client_id)
);

-- Custom Programs (created by coaches)
-- Includes columns for both mobile app and coach portal
CREATE TABLE IF NOT EXISTS custom_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  -- Mobile app columns
  days_per_week INTEGER CHECK (days_per_week >= 1 AND days_per_week <= 7),
  program_data JSONB,
  -- Coach portal columns
  duration_weeks INTEGER DEFAULT 4,
  workouts JSONB DEFAULT '[]'::jsonb,
  -- Shared columns
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Program Assignments
CREATE TABLE IF NOT EXISTS program_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES custom_programs(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workout Logs (client workout history)
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES custom_programs(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  exercises JSONB DEFAULT '[]'::jsonb,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations (for messaging)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(coach_id, client_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- ============================================
-- STEP 2: Create indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON user_profiles(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_coach_clients_coach ON coach_clients(coach_id);
CREATE INDEX IF NOT EXISTS idx_coach_clients_client ON coach_clients(client_id);
CREATE INDEX IF NOT EXISTS idx_custom_programs_coach ON custom_programs(coach_id);
CREATE INDEX IF NOT EXISTS idx_program_assignments_client ON program_assignments(client_id);
CREATE INDEX IF NOT EXISTS idx_program_assignments_coach ON program_assignments(coach_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user ON workout_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_program ON workout_logs(program_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- ============================================
-- STEP 3: Enable RLS
-- ============================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: Create RLS policies
-- ============================================

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Coaches can view all profiles" ON user_profiles;
CREATE POLICY "Coaches can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role IN ('coach', 'admin')
    )
  );

-- Coach clients policies
DROP POLICY IF EXISTS "Coaches can view their clients" ON coach_clients;
CREATE POLICY "Coaches can view their clients" ON coach_clients
  FOR SELECT USING (coach_id = auth.uid());

DROP POLICY IF EXISTS "Coaches can manage their clients" ON coach_clients;
CREATE POLICY "Coaches can manage their clients" ON coach_clients
  FOR ALL USING (coach_id = auth.uid());

DROP POLICY IF EXISTS "Clients can view their coach" ON coach_clients;
CREATE POLICY "Clients can view their coach" ON coach_clients
  FOR SELECT USING (client_id = auth.uid());

-- Custom programs policies
DROP POLICY IF EXISTS "Coaches can manage their programs" ON custom_programs;
CREATE POLICY "Coaches can manage their programs" ON custom_programs
  FOR ALL USING (coach_id = auth.uid());

DROP POLICY IF EXISTS "Clients can view assigned programs" ON custom_programs;
CREATE POLICY "Clients can view assigned programs" ON custom_programs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM program_assignments pa
      WHERE pa.program_id = id
      AND pa.client_id = auth.uid()
      AND pa.status IN ('assigned', 'active')
    )
  );

-- Program assignments policies
DROP POLICY IF EXISTS "Coaches can manage assignments" ON program_assignments;
CREATE POLICY "Coaches can manage assignments" ON program_assignments
  FOR ALL USING (coach_id = auth.uid());

DROP POLICY IF EXISTS "Clients can view their assignments" ON program_assignments;
CREATE POLICY "Clients can view their assignments" ON program_assignments
  FOR SELECT USING (client_id = auth.uid());

-- Workout logs policies
DROP POLICY IF EXISTS "Users can view own logs" ON workout_logs;
CREATE POLICY "Users can view own logs" ON workout_logs
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own logs" ON workout_logs;
CREATE POLICY "Users can manage own logs" ON workout_logs
  FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Coaches can view client logs" ON workout_logs;
CREATE POLICY "Coaches can view client logs" ON workout_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_id = auth.uid() AND client_id = workout_logs.user_id
    )
  );

-- Conversations policies
DROP POLICY IF EXISTS "Participants can view conversations" ON conversations;
CREATE POLICY "Participants can view conversations" ON conversations
  FOR SELECT USING (coach_id = auth.uid() OR client_id = auth.uid());

DROP POLICY IF EXISTS "Coaches can create conversations" ON conversations;
CREATE POLICY "Coaches can create conversations" ON conversations
  FOR INSERT WITH CHECK (coach_id = auth.uid());

DROP POLICY IF EXISTS "Participants can update conversations" ON conversations;
CREATE POLICY "Participants can update conversations" ON conversations
  FOR UPDATE USING (coach_id = auth.uid() OR client_id = auth.uid());

-- Messages policies
DROP POLICY IF EXISTS "Participants can view messages" ON messages;
CREATE POLICY "Participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = messages.conversation_id
      AND (coach_id = auth.uid() OR client_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Participants can send messages" ON messages;
CREATE POLICY "Participants can send messages" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = messages.conversation_id
      AND (coach_id = auth.uid() OR client_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Participants can update messages" ON messages;
CREATE POLICY "Participants can update messages" ON messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = messages.conversation_id
      AND (coach_id = auth.uid() OR client_id = auth.uid())
    )
  );

-- ============================================
-- STEP 5: Create functions and triggers
-- ============================================

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_coach_clients_updated_at ON coach_clients;
CREATE TRIGGER update_coach_clients_updated_at
  BEFORE UPDATE ON coach_clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_custom_programs_updated_at ON custom_programs;
CREATE TRIGGER update_custom_programs_updated_at
  BEFORE UPDATE ON custom_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_program_assignments_updated_at ON program_assignments;
CREATE TRIGGER update_program_assignments_updated_at
  BEFORE UPDATE ON program_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_workout_logs_updated_at ON workout_logs;
CREATE TRIGGER update_workout_logs_updated_at
  BEFORE UPDATE ON workout_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON conversations;
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- STEP 6: Enable realtime for messages
-- ============================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
