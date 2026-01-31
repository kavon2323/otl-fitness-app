const fs = require('fs');
const path = require('path');

// Helper to generate IDs from names (same as in exercises.ts)
const toId = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

// Parse CSV with multiline support
function parseCSV(csvText) {
  const lines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentLine += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === '\n' && !inQuotes) {
      // End of line
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }

  // Add last line
  if (currentLine.trim()) {
    lines.push(currentLine);
  }

  return lines;
}

// Parse a single CSV line into fields
function parseCSVLine(line) {
  const fields = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add last field
  fields.push(currentField.trim());

  return fields;
}

// Read existing exercises to check for duplicates
function getExistingExerciseIds() {
  const exercisesPath = path.join(__dirname, 'src/data/exercises.ts');
  const content = fs.readFileSync(exercisesPath, 'utf-8');

  const ids = new Set();
  const idMatches = content.matchAll(/id:\s*toId\('([^']+)'\)/g);
  for (const match of idMatches) {
    ids.add(toId(match[1]));
  }

  console.log(`Found ${ids.size} existing exercises`);
  return ids;
}

// Main processing
async function main() {
  const csvPath = path.join(__dirname, 'Enhanced Exercise Library Complete.xlsx - Sheet1 (2).csv');
  const csvText = fs.readFileSync(csvPath, 'utf-8');

  console.log('Parsing CSV...');
  const lines = parseCSV(csvText);
  console.log(`Total lines: ${lines.length}`);

  // Get existing IDs to avoid duplicates
  const existingIds = getExistingExerciseIds();

  // Parse header
  const headerFields = parseCSVLine(lines[0]);
  console.log('Header:', headerFields);

  const exercises = [];
  const duplicates = [];
  const errors = [];

  // Process each row
  for (let i = 1; i < lines.length; i++) {
    try {
      const fields = parseCSVLine(lines[i]);

      if (fields.length < 8) {
        console.warn(`Skipping line ${i + 1}: insufficient fields (${fields.length})`);
        continue;
      }

      const [category, name, benefit, description, primaryMuscles, secondaryMuscles, tips, videoUrl] = fields;

      if (!name || !name.trim()) {
        console.warn(`Skipping line ${i + 1}: no name`);
        continue;
      }

      const id = toId(name);

      // Normalize category to match TypeScript type (replace spaces with underscores)
      const normalizedCategory = category.toLowerCase().replace(/ /g, '_');

      // Check for duplicates
      if (existingIds.has(id)) {
        duplicates.push(name);
        continue;
      }

      // Parse tips (split by bullet points and newlines)
      const tipsArray = tips
        .split(/[•\n]/)
        .map(t => t.trim())
        .filter(t => t.length > 0 && t !== '');

      // Parse muscles
      const primary = primaryMuscles && primaryMuscles !== 'N/A (Mobility)' && primaryMuscles !== 'Full Body (Lower Focus)'
        ? primaryMuscles.split(',').map(m => m.trim()).filter(m => m)
        : [];

      const secondary = secondaryMuscles
        ? secondaryMuscles.split(',').map(m => m.trim()).filter(m => m)
        : [];

      // Validate video URL (make it optional for now)
      const hasValidVideo = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
      if (!hasValidVideo) {
        // Use a placeholder or skip video
        console.warn(`Line ${i + 1} (${name}): Missing or invalid video URL`);
      }

      exercises.push({
        id,
        name,
        category: normalizedCategory,
        description,
        videoUrl: hasValidVideo ? videoUrl : undefined,
        tips: tipsArray.length > 0 ? tipsArray : undefined,
        musclesTargeted: primary.length > 0 ? {
          primary,
          secondary: secondary.length > 0 ? secondary : undefined
        } : undefined
      });

    } catch (err) {
      errors.push(`Line ${i + 1}: ${err.message}`);
    }
  }

  console.log(`\nParsed ${exercises.length} new exercises`);
  console.log(`Skipped ${duplicates.length} duplicates`);
  console.log(`Errors: ${errors.length}`);

  if (duplicates.length > 0) {
    console.log('\nDuplicates:');
    duplicates.forEach(name => console.log(`  - ${name}`));
  }

  if (errors.length > 0 && errors.length <= 20) {
    console.log('\nErrors:');
    errors.forEach(err => console.log(`  - ${err}`));
  }

  // Group by category
  const byCategory = {};
  exercises.forEach(ex => {
    const cat = ex.category;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    byCategory[cat].push(ex);
  });

  console.log('\nExercises by category:');
  Object.keys(byCategory).sort().forEach(cat => {
    console.log(`  ${cat}: ${byCategory[cat].length}`);
  });

  // Generate TypeScript
  console.log('\nGenerating TypeScript...');

  let ts = `import { Exercise } from '../types';\n\n`;
  ts += `// Helper to generate IDs from names\n`;
  ts += `const toId = (name: string): string =>\n`;
  ts += `  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');\n\n`;
  ts += `// Enhanced Exercise Library - ${exercises.length} exercises\n`;
  ts += `// These exercises are available for manual selection but NOT used by the workout generator\n\n`;
  ts += `export const enhancedExercises: Exercise[] = [\n`;

  const categories = Object.keys(byCategory).sort();
  categories.forEach((cat, catIdx) => {
    ts += `  // ==================== ${cat.toUpperCase()} EXERCISES ====================\n`;

    byCategory[cat].forEach((ex, exIdx) => {
      ts += `  {\n`;
      ts += `    id: toId('${ex.name.replace(/'/g, "\\'")}'),\n`;
      ts += `    name: '${ex.name.replace(/'/g, "\\'")}',\n`;
      ts += `    category: '${ex.category}',\n`;
      ts += `    description: '${ex.description.replace(/'/g, "\\'").replace(/\n/g, ' ')}',\n`;
      if (ex.videoUrl) {
        ts += `    videoUrl: '${ex.videoUrl}',\n`;
      }

      if (ex.tips && ex.tips.length > 0) {
        ts += `    tips: [\n`;
        ex.tips.forEach(tip => {
          ts += `      '${tip.replace(/'/g, "\\'")}',\n`;
        });
        ts += `    ],\n`;
      }

      if (ex.musclesTargeted) {
        ts += `    musclesTargeted: {\n`;
        ts += `      primary: [${ex.musclesTargeted.primary.map(m => `'${m.replace(/'/g, "\\'")}'`).join(', ')}],\n`;
        if (ex.musclesTargeted.secondary && ex.musclesTargeted.secondary.length > 0) {
          ts += `      secondary: [${ex.musclesTargeted.secondary.map(m => `'${m.replace(/'/g, "\\'")}'`).join(', ')}],\n`;
        }
        ts += `    },\n`;
      }

      ts += `  },\n`;
    });

    if (catIdx < categories.length - 1) {
      ts += `\n`;
    }
  });

  ts += `];\n`;

  // Write output
  const outputPath = path.join(__dirname, 'src/data/exercises-enhanced.ts');
  fs.writeFileSync(outputPath, ts);
  console.log(`\nWrote ${outputPath}`);
  console.log(`File size: ${(ts.length / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
