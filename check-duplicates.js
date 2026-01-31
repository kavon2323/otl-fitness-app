const data = require('./exercises-export.json');
const ids = data.exercises.map(e => e.id);
const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
console.log('Total exercises:', ids.length);
console.log('Duplicate IDs:', duplicates.length);
if (duplicates.length > 0) {
  console.log('First 10 duplicates:', duplicates.slice(0, 10));
}
