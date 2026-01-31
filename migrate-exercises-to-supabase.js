const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load exercises from the TypeScript files
// We'll need to parse them since they're in TS format
function loadExercises() {
  // Read the exercises.ts file
  const exercisesPath = path.join(__dirname, 'src/data/exercises.ts');
  const enhancedPath = path.join(__dirname, 'src/data/exercises-enhanced.ts');

  const exercisesContent = fs.readFileSync(exercisesPath, 'utf-8');
  const enhancedContent = fs.readFileSync(enhancedPath, 'utf-8');

  // Extract exercise objects using regex (basic parsing)
  const exercises = [];

  // Match exercise objects in the format: { id: toId('...'), name: '...', ... }
  const exerciseRegex = /\{[^}]*id:\s*toId\(['"]([^'"]+)['"]\)[^}]*name:\s*['"]([^'"]+)['"][^}]*category:\s*['"]([^'"]+)['"][^}]*description:\s*['"]([^'"]+?)['"][^}]*\}/gs;

  // This is a simplified approach - for production, consider using a proper TS parser
  console.log('Note: This script loads exercises from compiled data.');
  console.log('Make sure to build the app first or use the exercises array directly.\n');

  return exercises;
}

async function migrateExercises() {
  // Get Supabase credentials from environment or prompt
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!');
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
    console.error('\nExample:');
    console.error('export SUPABASE_URL="https://your-project.supabase.co"');
    console.error('export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('🔄 Loading exercises from TypeScript files...\n');

  // Import exercises directly by requiring the compiled output
  // For now, we'll load from a JSON export
  const exercisesJsonPath = path.join(__dirname, 'exercises-export.json');

  if (!fs.existsSync(exercisesJsonPath)) {
    console.error('❌ exercises-export.json not found!');
    console.error('\nPlease run: node export-exercises-to-json.js first');
    process.exit(1);
  }

  const exercisesData = JSON.parse(fs.readFileSync(exercisesJsonPath, 'utf-8'));
  const exercises = exercisesData.exercises;

  console.log(`📊 Found ${exercises.length} exercises (including duplicates)\n`);

  // Deduplicate exercises by ID (keep the first occurrence)
  const uniqueExercises = [];
  const seenIds = new Set();
  for (const ex of exercises) {
    if (!seenIds.has(ex.id)) {
      uniqueExercises.push(ex);
      seenIds.add(ex.id);
    }
  }

  console.log(`📊 After deduplication: ${uniqueExercises.length} unique exercises\n`);

  // Convert exercises to match database schema
  const dbExercises = uniqueExercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    category: ex.category,
    description: ex.description,
    video_url: ex.videoUrl || null,
    tips: ex.tips || [],
    muscles_targeted: ex.musclesTargeted || null,
    equipment: ex.equipment || [],
    is_core_exercise: exercisesData.coreExerciseIds ? exercisesData.coreExerciseIds.includes(ex.id) : false,
    created_by: null, // System-created exercises
  }));

  // Upload in batches of 100
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < dbExercises.length; i += batchSize) {
    const batch = dbExercises.slice(i, i + batchSize);
    console.log(`⬆️  Uploading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(dbExercises.length / batchSize)} (${batch.length} exercises)...`);

    const { data, error } = await supabase
      .from('exercises')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error uploading batch: ${error.message}`);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`✅ Batch uploaded successfully`);
    }
  }

  console.log(`\n📈 Migration complete!`);
  console.log(`   ✅ Success: ${successCount} exercises`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount} exercises`);
  }

  // Verify the upload
  const { count, error: countError } = await supabase
    .from('exercises')
    .select('*', { count: 'exact', head: true });

  if (!countError) {
    console.log(`\n✨ Total exercises in database: ${count}`);
  }
}

// Run migration
migrateExercises().catch(console.error);
