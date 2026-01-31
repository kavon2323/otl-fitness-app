import { exercises } from './src/data/exercises.js';
import * as fs from 'fs';

// The first 140 exercises are core exercises used by the workout generator
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
console.log(`✅ Exported ${exportData.exercises.length} exercises to exercises-export.json`);
console.log(`   - Core exercises: ${coreExerciseIds.size}`);
console.log(`   - Enhanced exercises: ${exportData.exercises.length - coreExerciseIds.size}`);
