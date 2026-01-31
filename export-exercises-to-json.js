const fs = require('fs');
const path = require('path');

// This script exports exercises from the TypeScript files to JSON for migration

async function exportExercises() {
  console.log('📦 Exporting exercises to JSON...\n');

  // Import the exercises module
  // Since it's TypeScript, we need to either:
  // 1. Compile it first, or
  // 2. Use ts-node, or
  // 3. Parse the TS manually

  // For simplicity, let's use a dynamic import approach
  // We'll read the TS files and extract the data

  const exercisesPath = path.join(__dirname, 'src/data/exercises.ts');
  const enhancedPath = path.join(__dirname, 'src/data/exercises-enhanced.ts');

  console.log('⚠️  This script requires the exercises to be in a specific format.');
  console.log('    It extracts exercise data from TypeScript files.\n');

  // Read files
  const exercisesTs = fs.readFileSync(exercisesPath, 'utf-8');
  const enhancedTs = fs.readFileSync(enhancedPath, 'utf-8');

  // Find where coreExercises array starts and ends
  const coreStart = exercisesTs.indexOf('const coreExercises: Exercise[] = [');
  const coreEnd = exercisesTs.indexOf('];', coreStart);

  // Find where enhancedExercises array starts and ends
  const enhancedStart = enhancedTs.indexOf('export const enhancedExercises: Exercise[] = [');
  const enhancedEnd = enhancedTs.indexOf('];', enhancedStart);

  if (coreStart === -1 || enhancedStart === -1) {
    console.error('❌ Could not find exercise arrays in TypeScript files');
    process.exit(1);
  }

  // Extract the arrays (this is a simplified version)
  console.log('ℹ️  For accurate export, we recommend using TypeScript compilation');
  console.log('   or manually creating the JSON export.\n');

  // Alternative: Provide a manual export template
  console.log('📝 Creating export template...\n');

  const template = {
    info: 'This file should contain all exercises from exercises.ts and exercises-enhanced.ts',
    instructions: [
      '1. In your mobile app, add a temporary function to export exercises',
      '2. Import { exercises } from "./src/data/exercises"',
      '3. console.log(JSON.stringify({ exercises, coreExerciseIds: [...] }))',
      '4. Copy the output to exercises-export.json',
      'OR',
      '1. Run: npx ts-node -e "import { exercises } from \'./src/data/exercises\'; console.log(JSON.stringify({ exercises }))" > exercises-export.json'
    ],
    template: {
      exercises: [],
      coreExerciseIds: []
    }
  };

  // Actually, let's create a simpler approach - create a temp TS file that exports to JSON
  const exportScript = `
import { exercises } from './src/data/exercises';
import { coreExercises } from './src/data/exercises';
import * as fs from 'fs';

// Get IDs of core exercises (the first 140)
const coreExerciseIds = new Set(exercises.slice(0, 140).map(ex => ex.id));

const exportData = {
  exercises: exercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    category: ex.category,
    description: ex.description,
    videoUrl: ex.videoUrl,
    tips: ex.tips,
    musclesTargeted: ex.musclesTargeted,
    equipment: ex.equipment,
  })),
  coreExerciseIds: Array.from(coreExerciseIds),
};

fs.writeFileSync('exercises-export.json', JSON.stringify(exportData, null, 2));
console.log(\`✅ Exported \${exportData.exercises.length} exercises to exercises-export.json\`);
`;

  fs.writeFileSync(path.join(__dirname, 'temp-export.ts'), exportScript);

  console.log('✅ Created temp-export.ts');
  console.log('\nTo export exercises, run:');
  console.log('  npx ts-node temp-export.ts\n');
  console.log('Or install ts-node if needed:');
  console.log('  npm install -D ts-node\n');
}

exportExercises().catch(console.error);
