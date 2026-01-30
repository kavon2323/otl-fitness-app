const fs = require('fs');
const path = require('path');

// Read the exercises.ts file
const exercisesPath = path.join(__dirname, 'otl-fitness-app/src/data/exercises.ts');
let content = fs.readFileSync(exercisesPath, 'utf-8');

// Find all exercise objects and add isGeneratorExercise: true after the category line
// Match pattern: category: 'something',\n
// Add: isGeneratorExercise: true,\n after it

let modifiedCount = 0;
const newContent = content.replace(
  /(category: '[^']+',)\n/g,
  (match, p1) => {
    modifiedCount++;
    return `${p1}\n    isGeneratorExercise: true,\n`;
  }
);

console.log(`Modified ${modifiedCount} exercises`);

// Write back
fs.writeFileSync(exercisesPath, newContent);
console.log(`Updated ${exercisesPath}`);
