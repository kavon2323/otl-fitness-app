-- Migration: Add new subscription tiers
-- Run this in your Supabase SQL Editor to update existing database

-- Step 1: Add new columns to user_profiles
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS store_discount_percent INTEGER DEFAULT 0;

-- Step 2: Update the subscription_tier constraint
-- First, update any existing 'premium' users to 'basecamp_plus'
UPDATE user_profiles SET subscription_tier = 'basecamp_plus' WHERE subscription_tier = 'premium';

-- Update any existing 'coaching' users to 'pro_coaching'
UPDATE user_profiles SET subscription_tier = 'pro_coaching' WHERE subscription_tier = 'coaching';

-- Step 3: Drop the old constraint and add the new one
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_subscription_tier_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_subscription_tier_check
  CHECK (subscription_tier IN ('free', 'basecamp', 'basecamp_plus', 'pro_coaching'));

-- Step 4: Add constraint for subscription_status
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_subscription_status_check
  CHECK (subscription_status IN ('active', 'cancelled', 'past_due', 'trialing'));

-- Step 5: Update store discount based on tier
UPDATE user_profiles SET store_discount_percent = 10 WHERE subscription_tier = 'basecamp_plus';
UPDATE user_profiles SET store_discount_percent = 15 WHERE subscription_tier = 'pro_coaching';

-- Step 6: Create index for faster subscription queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status ON user_profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_expires ON user_profiles(subscription_expires_at);
