import { Exercise } from '../types';

// Helper to generate IDs from names
const toId = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

// Enhanced Exercise Library - 777 exercises
// These exercises are available for manual selection but NOT used by the workout generator

export const enhancedExercises: Exercise[] = [
  // ==================== CORE EXERCISES ====================
  {
    id: toId('Ab Rollout Hold'),
    name: 'Ab Rollout Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('KB Adduction Side Plank'),
    name: 'KB Adduction Side Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Landmine Dead Bug'),
    name: 'Landmine Dead Bug',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'shins parallel to the floor. Press your lower back flat against the floor. Slowly extend one leg straight while simultaneously lowering the opposite arm overhead. Keep your core engaged and lower back pressed to the floor. Return to start and repeat with opposite limbs.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back with your arms extended straight up and your knees bent at 90 degrees'],
    },
  },
  {
    id: toId('Spiderman Lunge w/ Rotation into Stabilization Bird Dog'),
    name: 'Spiderman Lunge w/ Rotation into Stabilization Bird Dog',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Hollow Boat Pull Aparts'),
    name: 'Hollow Boat Pull Aparts',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Buzz Saw Plank'),
    name: 'Buzz Saw Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Standing Band Crunch'),
    name: 'Standing Band Crunch',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Jump Squat Walkout + L Plank into Crab Reach'),
    name: 'Jump Squat Walkout + L Plank into Crab Reach',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Bear Hold Cable Pull Down'),
    name: 'Bear Hold Cable Pull Down',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Low Plank Supported Mountain Climber'),
    name: 'Low Plank Supported Mountain Climber',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Landmine Trunk Rotation'),
    name: 'Landmine Trunk Rotation',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('RKC Plank'),
    name: 'RKC Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Cable Low/High Chop'),
    name: 'Cable Low/High Chop',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Anti Rotation March'),
    name: 'Anti Rotation March',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('KB Deadbug'),
    name: 'KB Deadbug',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Copenhagen Side Plank'),
    name: 'Copenhagen Side Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Bird Dog'),
    name: 'Bird Dog',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a straight line from fingertips to toes. Hold briefly',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start on your hands and knees in a tabletop position. Engage your core and maintain a neutral spine. Simultaneously extend one arm straight forward and the opposite leg straight back'],
    },
  },
  {
    id: toId('Plank Walk Out'),
    name: 'Plank Walk Out',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Rolling Side Plank'),
    name: 'Rolling Side Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Low/High Chop'),
    name: 'Low/High Chop',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Side Plank Reach'),
    name: 'Side Plank Reach',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Bear Hold Press'),
    name: 'Bear Hold Press',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Plank Shoulder Tap to Toe Touch'),
    name: 'Plank Shoulder Tap to Toe Touch',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Bicycles w/ Pause'),
    name: 'Bicycles w/ Pause',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Copenhagen Plank w/ Reach'),
    name: 'Copenhagen Plank w/ Reach',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Tempo Trunk Rotation'),
    name: 'Tempo Trunk Rotation',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Stabilization Bird Dog'),
    name: 'Stabilization Bird Dog',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a straight line from fingertips to toes. Hold briefly',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start on your hands and knees in a tabletop position. Engage your core and maintain a neutral spine. Simultaneously extend one arm straight forward and the opposite leg straight back'],
    },
  },
  {
    id: toId('Floor Copenhagen'),
    name: 'Floor Copenhagen',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('V Sit Up'),
    name: 'V Sit Up',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Cable Power Crunch'),
    name: 'Cable Power Crunch',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Plank Step Ups'),
    name: 'Plank Step Ups',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'ensuring the entire foot is in contact with the surface. Keep your torso upright and core engaged. Drive through the elevated heel to step up onto the platform',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Place one foot on an elevated platform (box or bench)'],
    },
  },
  {
    id: toId('Bottoms Up Deadbug'),
    name: 'Bottoms Up Deadbug',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Landmine Press w/ Trunk Rotation'),
    name: 'Landmine Press w/ Trunk Rotation',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Plank Jacks'),
    name: 'Plank Jacks',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Lateral Plank Walk'),
    name: 'Lateral Plank Walk',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Hollow Jacks'),
    name: 'Hollow Jacks',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a \'hollow\' position. Extend your arms overhead or by your sides. Engage your abs to maintain contact between your lower back and the floor. Hold for the prescribed time',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back and press your lower back flat against the floor. Lift your shoulders and legs off the ground slightly'],
    },
  },
  {
    id: toId('Russian Twist'),
    name: 'Russian Twist',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'bringing the weight toward the ground beside your hip. Avoid using momentum. Rotate to the opposite side and continue alternating',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Sit on the ground with knees bent. Lean back slightly to engage your core while maintaining a straight spine. Hold a weight at your chest. Rotate your torso to one side'],
    },
  },
  {
    id: toId('Bird Dog Static Hold w/ Plate Hold'),
    name: 'Bird Dog Static Hold w/ Plate Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Hollow Boat Leg Raise'),
    name: 'Hollow Boat Leg Raise',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a \'hollow\' position. Extend your arms overhead or by your sides. Engage your abs to maintain contact between your lower back and the floor. Hold for the prescribed time',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back and press your lower back flat against the floor. Lift your shoulders and legs off the ground slightly'],
    },
  },
  {
    id: toId('Dead Bug Static Hold'),
    name: 'Dead Bug Static Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'shins parallel to the floor. Press your lower back flat against the floor. Slowly extend one leg straight while simultaneously lowering the opposite arm overhead. Keep your core engaged and lower back pressed to the floor. Return to start and repeat with opposite limbs.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back with your arms extended straight up and your knees bent at 90 degrees'],
    },
  },
  {
    id: toId('Stability Bird Dog Static Hold'),
    name: 'Stability Bird Dog Static Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a straight line from fingertips to toes. Hold briefly',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start on your hands and knees in a tabletop position. Engage your core and maintain a neutral spine. Simultaneously extend one arm straight forward and the opposite leg straight back'],
    },
  },
  {
    id: toId('Bird Dog Static Hold'),
    name: 'Bird Dog Static Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a straight line from fingertips to toes. Hold briefly',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start on your hands and knees in a tabletop position. Engage your core and maintain a neutral spine. Simultaneously extend one arm straight forward and the opposite leg straight back'],
    },
  },
  {
    id: toId('Bear Hold'),
    name: 'Bear Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Anti Rotation DB Shoulder Press'),
    name: 'Anti Rotation DB Shoulder Press',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'holding the weight at shoulder height with palms facing forward. Engage your core and maintain a neutral spine. Press the weight overhead in a straight line',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Half Kneeling DB Low/High Chop'),
    name: 'Half Kneeling DB Low/High Chop',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('DB Plank Pull Through'),
    name: 'DB Plank Pull Through',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Copenhagen Side Plank'),
    name: 'Copenhagen Side Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Power Crunch'),
    name: 'Power Crunch',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Power Trunk Rotations'),
    name: 'Power Trunk Rotations',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('S/A Plank'),
    name: 'S/A Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Anti Rotation Hold'),
    name: 'Anti Rotation Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Power Hollow Boat'),
    name: 'Power Hollow Boat',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a \'hollow\' position. Extend your arms overhead or by your sides. Engage your abs to maintain contact between your lower back and the floor. Hold for the prescribed time',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back and press your lower back flat against the floor. Lift your shoulders and legs off the ground slightly'],
    },
  },
  {
    id: toId('Spider-Man Plank'),
    name: 'Spider-Man Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Diamond Plank'),
    name: 'Diamond Plank',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Hollow Boat Hold'),
    name: 'Hollow Boat Hold',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a \'hollow\' position. Extend your arms overhead or by your sides. Engage your abs to maintain contact between your lower back and the floor. Hold for the prescribed time',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back and press your lower back flat against the floor. Lift your shoulders and legs off the ground slightly'],
    },
  },
  {
    id: toId('Low Plank Taps'),
    name: 'Low Plank Taps',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Hollow Boat X Med Ball Pass'),
    name: 'Hollow Boat X Med Ball Pass',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'creating a \'hollow\' position. Extend your arms overhead or by your sides. Engage your abs to maintain contact between your lower back and the floor. Hold for the prescribed time',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Lie on your back and press your lower back flat against the floor. Lift your shoulders and legs off the ground slightly'],
    },
  },
  {
    id: toId('Hollow Boat X Plate Pass'),
    name: 'Hollow Boat X Plate Pass',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Kneeling DB Trunk Rotation'),
    name: 'Kneeling DB Trunk Rotation',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Bicycles'),
    name: 'Bicycles',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'avoiding compensatory movements or excessive momentum.',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision'],
    },
  },
  {
    id: toId('Low Plank w/ Reach'),
    name: 'Low Plank w/ Reach',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },
  {
    id: toId('Plank Toe Touch w/ Reach'),
    name: 'Plank Toe Touch w/ Reach',
    category: 'core',
    description: 'stabilizing during rapid direction changes',
    tips: [
      'squeeze your glutes',
    ],
    musclesTargeted: {
      primary: ['and protecting the spine during dives and impacts.'],
      secondary: ['Start in a high plank position with your body forming a straight line from head to heels. Engage your core'],
    },
  },

  // ==================== ENERGY_SYSTEM EXERCISES ====================
  {
    id: toId('Dyna Ball Kneeling Jump Slam'),
    name: 'Dyna Ball Kneeling Jump Slam',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Split Stance Depth Drop to High Knee'),
    name: 'Split Stance Depth Drop to High Knee',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L DB Clean x Hop'),
    name: 'S/L DB Clean x Hop',
    category: 'energy_system',
    description: 'Balance on one leg with a slight bend in the knee. Explosively jump on the single leg',
    tips: [
      'knee',
    ],
    musclesTargeted: {
      primary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
      secondary: ['absorbing impact through your hip'],
    },
  },
  {
    id: toId('180 Turn Around Reactive Ball Drill'),
    name: '180 Turn Around Reactive Ball Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Seated Band Hip Abduction'),
    name: 'Seated Band Hip Abduction',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L Reactive Ball Drop'),
    name: 'S/L Reactive Ball Drop',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Med Ball IR Holds'),
    name: 'Med Ball IR Holds',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Knee Extension'),
    name: 'Banded Knee Extension',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('3 Way Ankle Mobilization'),
    name: '3 Way Ankle Mobilization',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Bear Crawl Reactive Drill'),
    name: 'Bear Crawl Reactive Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chaotic Stimulus 3'),
    name: 'Chaotic Stimulus 3',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('L Drill'),
    name: 'L Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L Airplane to High Knee'),
    name: 'S/L Airplane to High Knee',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Half Kneeling Banded Hip Hinge'),
    name: 'Half Kneeling Banded Hip Hinge',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L Reactive Ball Wall Bounce'),
    name: 'S/L Reactive Ball Wall Bounce',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Quadruped Tea Cup'),
    name: 'Quadruped Tea Cup',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hanging Knee Ups'),
    name: 'Hanging Knee Ups',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Half Kneeling Caveman'),
    name: 'Half Kneeling Caveman',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Ab Wheel Roll Out'),
    name: 'Ab Wheel Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Broad Jump'),
    name: 'Broad Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('S/L Band Pull Apart'),
    name: 'S/L Band Pull Apart',
    category: 'energy_system',
    description: 'Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control'],
      secondary: ['maintaining tension throughout.'],
    },
  },
  {
    id: toId('Tall Kneeling Banded Sved Raise'),
    name: 'Tall Kneeling Banded Sved Raise',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hip ER End Range Hold'),
    name: 'Hip ER End Range Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chaotic Stimulus Box 1'),
    name: 'Chaotic Stimulus Box 1',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L Reactive Ball Drill'),
    name: 'S/L Reactive Ball Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Reactive Box Drill'),
    name: 'Reactive Box Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Shin Box to Thai Sit'),
    name: 'Shin Box to Thai Sit',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Hamstring Curls'),
    name: 'Banded Hamstring Curls',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Body Saw'),
    name: 'Body Saw',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Standing Scapular Protraction:Retraction'),
    name: 'Standing Scapular Protraction:Retraction',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Quadruped Wrist Circles'),
    name: 'Quadruped Wrist Circles',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chaotic Stimulus 2'),
    name: 'Chaotic Stimulus 2',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Rapid Response Drill 1'),
    name: 'Rapid Response Drill 1',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chest Supported Blackburns'),
    name: 'Chest Supported Blackburns',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Swiss Ball Hamstring Curl'),
    name: 'Swiss Ball Hamstring Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chaotic Stimulus'),
    name: 'Chaotic Stimulus',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Inch Worm'),
    name: 'Inch Worm',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Pillar Engagement'),
    name: 'Pillar Engagement',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('KB Dorsiflexion Drill'),
    name: 'KB Dorsiflexion Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Predator Jacks'),
    name: 'Predator Jacks',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Pillar Breath Technique'),
    name: 'Pillar Breath Technique',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Stairway to Heaven Double Hop'),
    name: 'Stairway to Heaven Double Hop',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Split Stance Depth Drop'),
    name: 'Split Stance Depth Drop',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Seal Jacks Explosive'),
    name: 'Seal Jacks Explosive',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('The Dragonfly'),
    name: 'The Dragonfly',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Run'),
    name: 'Run',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Back Pedal'),
    name: 'Back Pedal',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Strict Pigeon Pose'),
    name: 'Strict Pigeon Pose',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Depth Drop'),
    name: 'Depth Drop',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('90/90 Sweeper'),
    name: '90/90 Sweeper',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hamstring Switches'),
    name: 'Hamstring Switches',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Pull Aparts'),
    name: 'Banded Pull Aparts',
    category: 'energy_system',
    description: 'Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control'],
      secondary: ['maintaining tension throughout.'],
    },
  },
  {
    id: toId('Incline DB Curl'),
    name: 'Incline DB Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Chest Supported Front Raise + Reverse Fly'),
    name: 'Chest Supported Front Raise + Reverse Fly',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Transverse Hop to Box Jump'),
    name: 'Transverse Hop to Box Jump',
    category: 'energy_system',
    description: 'Stand facing a box or platform at an appropriate distance. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Stand fully upright on the box',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump onto the box'],
      secondary: ['driving your arms up and forward. Land softly with both feet'],
    },
  },
  {
    id: toId('Adductor Roll Out'),
    name: 'Adductor Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('T Drilll (Demo)'),
    name: 'T Drilll (Demo)',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('The Murphy (Demo)'),
    name: 'The Murphy (Demo)',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Seated IR Switches'),
    name: 'Seated IR Switches',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Curl 21\'s'),
    name: 'DB Curl 21\'s',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Skull Crushers'),
    name: 'DB Skull Crushers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Upper Body Combo'),
    name: 'Upper Body Combo',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
    musclesTargeted: {
      primary: ['Full Body (Upper Focus)'],
      secondary: ['Core'],
    },
  },
  {
    id: toId('Reactive Ankle Hop'),
    name: 'Reactive Ankle Hop',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Inline Half Kneel w/ Hip Flexion'),
    name: 'Inline Half Kneel w/ Hip Flexion',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('90/90 Pigeon Pose'),
    name: '90/90 Pigeon Pose',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('High Knee Stabilization'),
    name: 'High Knee Stabilization',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Bear Crawl'),
    name: 'Bear Crawl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hip Raise Side Bridge'),
    name: 'Hip Raise Side Bridge',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Half Kneeling Dorsiflexion Test'),
    name: 'Half Kneeling Dorsiflexion Test',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Stairway to Heaven Double Hop'),
    name: 'Stairway to Heaven Double Hop',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Standing Spine Flexion/Extension'),
    name: 'Standing Spine Flexion/Extension',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Double Pogo Hop to Broad Jump'),
    name: 'Double Pogo Hop to Broad Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('Mrs. T\'s'),
    name: 'Mrs. T\'s',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Body Clean X Double Vert Jump to abroad Jump ( Pedal Back)'),
    name: 'Body Clean X Double Vert Jump to abroad Jump ( Pedal Back)',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('Banded Donkey Pulse Kick'),
    name: 'Banded Donkey Pulse Kick',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Fire Hydrant'),
    name: 'Banded Fire Hydrant',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Donkey Kick'),
    name: 'Banded Donkey Kick',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Glute Band Floor Bridge'),
    name: 'Glute Band Floor Bridge',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Wave Unload'),
    name: 'Wave Unload',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Standing Hip Circles'),
    name: 'Standing Hip Circles',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Skater Step'),
    name: 'Skater Step',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Reverse Hyper Hold'),
    name: 'Reverse Hyper Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Reactive Skater Jump'),
    name: 'Reactive Skater Jump',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Blast Off 1/2 Burpee'),
    name: 'Blast Off 1/2 Burpee',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Superman Waves'),
    name: 'Superman Waves',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Quadruped Elbow to Elbow'),
    name: 'Quadruped Elbow to Elbow',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('90/90 Hip Matrix'),
    name: '90/90 Hip Matrix',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('X Drill'),
    name: 'X Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('3D Maps'),
    name: '3D Maps',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Thigh Pop'),
    name: 'Thigh Pop',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L Look Up to Airplane'),
    name: 'S/L Look Up to Airplane',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L 3 Point Balance'),
    name: 'S/L 3 Point Balance',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Snap Downs'),
    name: 'Snap Downs',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Fire Feet'),
    name: 'Fire Feet',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('2 In 1 Out'),
    name: '2 In 1 Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Jefferson Curl'),
    name: 'Jefferson Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Double Vertical Jump to Broad Jump (Pedal Back)'),
    name: 'Double Vertical Jump to Broad Jump (Pedal Back)',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('In & Out'),
    name: 'In & Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Landmine Clean to Split Jerk'),
    name: 'Landmine Clean to Split Jerk',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'quickly drop under it by bending your knees and catch it in a front rack position',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles simultaneously. As the weight reaches chest height'],
    },
  },
  {
    id: toId('DB High Pull'),
    name: 'DB High Pull',
    category: 'energy_system',
    description: 'Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control'],
      secondary: ['maintaining tension throughout.'],
    },
  },
  {
    id: toId('OH Sit Up'),
    name: 'OH Sit Up',
    category: 'energy_system',
    description: 'Position yourself appropriately for the core exercise. Engage your core by drawing your belly button toward your spine. Maintain a neutral spine throughout. Focus on controlled movement and proper breathing. Execute with precision',
    tips: [
      'Core',
    ],
    musclesTargeted: {
      primary: ['avoiding compensatory movements or excessive momentum.'],
      secondary: ['Full Body (Lower Focus)'],
    },
  },
  {
    id: toId('Half Kneeling Hamstring Curl'),
    name: 'Half Kneeling Hamstring Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Monster Step'),
    name: 'Monster Step',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Shin Roll Out'),
    name: 'Shin Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Deceleration Drill'),
    name: 'Deceleration Drill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L High Knee'),
    name: 'S/L High Knee',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('A Skip'),
    name: 'A Skip',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Rope Climbers'),
    name: 'Rope Climbers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Split Stance Rack Pull'),
    name: 'Split Stance Rack Pull',
    category: 'energy_system',
    description: 'Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control'],
      secondary: ['maintaining tension throughout.'],
    },
  },
  {
    id: toId('Banded Bent Over Chest Pass'),
    name: 'Banded Bent Over Chest Pass',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Multi Directional Wrist Rock'),
    name: 'Multi Directional Wrist Rock',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Elbow Flexion/Extension Curls'),
    name: 'Elbow Flexion/Extension Curls',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Body Clean (Progression) + Crossover'),
    name: 'Body Clean (Progression) + Crossover',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'quickly drop under it by bending your knees and catch it in a front rack position',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles simultaneously. As the weight reaches chest height'],
    },
  },
  {
    id: toId('Depth Drop x Tuck Jump'),
    name: 'Depth Drop x Tuck Jump',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('S/L Pogo Hop x Transverse S/L Stick'),
    name: 'S/L Pogo Hop x Transverse S/L Stick',
    category: 'energy_system',
    description: 'Balance on one leg with a slight bend in the knee. Explosively jump on the single leg',
    tips: [
      'knee',
    ],
    musclesTargeted: {
      primary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
      secondary: ['absorbing impact through your hip'],
    },
  },
  {
    id: toId('OFF THE LEASH PAINTBALL: Rethink Your Drill Day'),
    name: 'OFF THE LEASH PAINTBALL: Rethink Your Drill Day',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Body Clean + Broad Jump'),
    name: 'Body Clean + Broad Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('Jumping Mountain Climber'),
    name: 'Jumping Mountain Climber',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Quadruped Adductor Rock Back'),
    name: 'Quadruped Adductor Rock Back',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Prone Swimmers'),
    name: 'Prone Swimmers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Reverse Step Down'),
    name: 'Reverse Step Down',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Half Kneeling Guns Up'),
    name: 'Half Kneeling Guns Up',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Moving S/L Hop'),
    name: 'Moving S/L Hop',
    category: 'energy_system',
    description: 'Balance on one leg with a slight bend in the knee. Explosively jump on the single leg',
    tips: [
      'knee',
    ],
    musclesTargeted: {
      primary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
      secondary: ['absorbing impact through your hip'],
    },
  },
  {
    id: toId('S/L Box Jump'),
    name: 'S/L Box Jump',
    category: 'energy_system',
    description: 'Stand facing a box or platform at an appropriate distance. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Stand fully upright on the box',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump onto the box'],
      secondary: ['driving your arms up and forward. Land softly with both feet'],
    },
  },
  {
    id: toId('Frog Stabilization'),
    name: 'Frog Stabilization',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Pro Scorpion'),
    name: 'Pro Scorpion',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Tempo Mountain Climbers'),
    name: 'Tempo Mountain Climbers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Basic Wall Run'),
    name: 'Basic Wall Run',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Active Butt Kicker'),
    name: 'Active Butt Kicker',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Frog Burpee'),
    name: 'Frog Burpee',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Snake Crawler'),
    name: 'Snake Crawler',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Overhead Hold'),
    name: 'Overhead Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cat Camel'),
    name: 'Cat Camel',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('D Side Snap Shot (Progression)'),
    name: 'D Side Snap Shot (Progression)',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Standing Windmill'),
    name: 'Standing Windmill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Human Bretzel'),
    name: 'Human Bretzel',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Lumbar Roll Out'),
    name: 'Lumbar Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Banded Tricep Extensions'),
    name: 'Banded Tricep Extensions',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Curl Half Way Hold'),
    name: 'DB Curl Half Way Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Seated Calf Raise'),
    name: 'Seated Calf Raise',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Mountain Walker'),
    name: 'Mountain Walker',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('3 Cone Toe Touch'),
    name: '3 Cone Toe Touch',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hamstring Roll Out'),
    name: 'Hamstring Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Glute Roll Out'),
    name: 'Glute Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('KB Halo Variation'),
    name: 'KB Halo Variation',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Dual DB Kick Backs'),
    name: 'Dual DB Kick Backs',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Curl w/ Iso Hold'),
    name: 'DB Curl w/ Iso Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Archer'),
    name: 'Archer',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cold Blooded Snake'),
    name: 'Cold Blooded Snake',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Extreme Core Trainer'),
    name: 'Extreme Core Trainer',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Inch Worm to Windmill'),
    name: 'Inch Worm to Windmill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Scap Roll Out'),
    name: 'Scap Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Standing Calf Raise'),
    name: 'Standing Calf Raise',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Anti Hold Step Out'),
    name: 'Anti Hold Step Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hip Flexion End Range Hold'),
    name: 'Hip Flexion End Range Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Hip Switches'),
    name: 'Hip Switches',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Bridge Reset (Level 1)'),
    name: 'Bridge Reset (Level 1)',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Calf Roll Out'),
    name: 'Calf Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Quad Roll Out'),
    name: 'Quad Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Stir the Pot'),
    name: 'Stir the Pot',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Tricep Extensions'),
    name: 'Tricep Extensions',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Farmers Walk (Palms Out)'),
    name: 'Farmers Walk (Palms Out)',
    category: 'energy_system',
    description: 'Hold heavy weights at your sides with a firm grip. Stand tall with shoulders back and core engaged. Walk forward with controlled',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['even steps'],
      secondary: ['maintaining an upright posture. Avoid leaning to either side or letting your shoulders round forward. Keep your core tight and breathe steadily. Walk for the prescribed distance or time.'],
    },
  },
  {
    id: toId('DB Curl'),
    name: 'DB Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Lazy Bear (Level 1)'),
    name: 'Lazy Bear (Level 1)',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Pec Roll Out'),
    name: 'Pec Roll Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('KB Windshield Wipers'),
    name: 'KB Windshield Wipers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('S/L KB Pass'),
    name: 'S/L KB Pass',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Broad Jump Variation'),
    name: 'Broad Jump Variation',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('Body Clean'),
    name: 'Body Clean',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'quickly drop under it by bending your knees and catch it in a front rack position',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles simultaneously. As the weight reaches chest height'],
    },
  },
  {
    id: toId('End Range Hamstring Hold'),
    name: 'End Range Hamstring Hold',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cross Body Mountain Climbers'),
    name: 'Cross Body Mountain Climbers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cognitive/Reactive Paintball Training'),
    name: 'Cognitive/Reactive Paintball Training',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Dynamic Warmup'),
    name: 'Dynamic Warmup',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Glute Med Rock Back'),
    name: 'Glute Med Rock Back',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Around The World Cone Touch'),
    name: 'Around The World Cone Touch',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Landmine Split Jerk'),
    name: 'Landmine Split Jerk',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Power High/Low Chop'),
    name: 'Power High/Low Chop',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Vertical Pass'),
    name: 'Vertical Pass',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Standing Calf Raise'),
    name: 'Standing Calf Raise',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Wall Sit X Snap Shot'),
    name: 'Wall Sit X Snap Shot',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Broad Jump'),
    name: 'Broad Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Reset to starting position or continue as prescribed.',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump forward'],
      secondary: ['driving your arms forward and upward. Focus on maximal horizontal distance. Land softly with both feet'],
    },
  },
  {
    id: toId('Flutter Kicks'),
    name: 'Flutter Kicks',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Walking Heel to Toe'),
    name: 'Walking Heel to Toe',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Walking High Knees'),
    name: 'Walking High Knees',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Sky Divers'),
    name: 'Sky Divers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Med Ball Bent Over Chest Pass'),
    name: 'Med Ball Bent Over Chest Pass',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Glute Complex'),
    name: 'Glute Complex',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Double Hop In/Out'),
    name: 'Double Hop In/Out',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Multi Directional Hop x S/L Toe Touch'),
    name: 'Multi Directional Hop x S/L Toe Touch',
    category: 'energy_system',
    description: 'Balance on one leg with a slight bend in the knee. Explosively jump on the single leg',
    tips: [
      'knee',
    ],
    musclesTargeted: {
      primary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
      secondary: ['absorbing impact through your hip'],
    },
  },
  {
    id: toId('DB Clean'),
    name: 'DB Clean',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'quickly drop under it by bending your knees and catch it in a front rack position',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles simultaneously. As the weight reaches chest height'],
    },
  },
  {
    id: toId('Skier Hop X Vertical Jump'),
    name: 'Skier Hop X Vertical Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Quickly drop into a quarter squat while swinging your arms back. Explosively jump straight up',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['driving your arms overhead for maximum height. Land softly with both feet'],
      secondary: ['absorbing impact through your hips and knees. Reset and repeat.'],
    },
  },
  {
    id: toId('DB Thruster'),
    name: 'DB Thruster',
    category: 'energy_system',
    description: 'Hold the weight in a front rack position at shoulder height. Stand with feet shoulder-width apart. Perform a front squat by descending until your thighs are parallel to the floor. Explosively drive up through your heels. As you reach standing',
    tips: [
      'Core',
    ],
    musclesTargeted: {
      primary: ['continue the momentum to press the weight overhead in one fluid motion. Lower to front rack position and immediately descend into the next squat.'],
      secondary: ['Full Body (Lower Focus)'],
    },
  },
  {
    id: toId('D Side Low/High Snapshot'),
    name: 'D Side Low/High Snapshot',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Depth Drop X Tuck Jump'),
    name: 'Depth Drop X Tuck Jump',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Box Jump'),
    name: 'Box Jump',
    category: 'energy_system',
    description: 'Stand facing a box or platform at an appropriate distance. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Stand fully upright on the box',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump onto the box'],
      secondary: ['driving your arms up and forward. Land softly with both feet'],
    },
  },
  {
    id: toId('Snake Crawler'),
    name: 'Snake Crawler',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Kneeling Windmill'),
    name: 'Kneeling Windmill',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Transverse Box Jump to S/L Hold'),
    name: 'Transverse Box Jump to S/L Hold',
    category: 'energy_system',
    description: 'Stand facing a box or platform at an appropriate distance. Lower into a quarter squat',
    tips: [
      'absorbing impact through your hips and knees. Stand fully upright on the box',
    ],
    musclesTargeted: {
      primary: ['swinging your arms back. Explosively jump onto the box'],
      secondary: ['driving your arms up and forward. Land softly with both feet'],
    },
  },
  {
    id: toId('Seated Barbell Curl'),
    name: 'Seated Barbell Curl',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Hang High Pull'),
    name: 'DB Hang High Pull',
    category: 'energy_system',
    description: 'Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control'],
      secondary: ['maintaining tension throughout.'],
    },
  },
  {
    id: toId('Kneeling Jump Ups X Snapshot'),
    name: 'Kneeling Jump Ups X Snapshot',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('S/L DB Clean w/ Hop'),
    name: 'S/L DB Clean w/ Hop',
    category: 'energy_system',
    description: 'Balance on one leg with a slight bend in the knee. Explosively jump on the single leg',
    tips: [
      'knee',
    ],
    musclesTargeted: {
      primary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
      secondary: ['absorbing impact through your hip'],
    },
  },
  {
    id: toId('Skier Hop w/ Vertical Jump'),
    name: 'Skier Hop w/ Vertical Jump',
    category: 'energy_system',
    description: 'Stand with feet hip-width apart. Quickly drop into a quarter squat while swinging your arms back. Explosively jump straight up',
    tips: [
      'Full Body (Lower Focus)',
    ],
    musclesTargeted: {
      primary: ['driving your arms overhead for maximum height. Land softly with both feet'],
      secondary: ['absorbing impact through your hips and knees. Reset and repeat.'],
    },
  },
  {
    id: toId('DB D Side Crossover'),
    name: 'DB D Side Crossover',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Dumbbell Kickbacks'),
    name: 'Dumbbell Kickbacks',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Dumbbell Tri Extension'),
    name: 'Dumbbell Tri Extension',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Power Jacks'),
    name: 'Power Jacks',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Quadruped Side Bend'),
    name: 'Quadruped Side Bend',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Wag Tail'),
    name: 'Wag Tail',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cobra'),
    name: 'Cobra',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('1/4 Get Up'),
    name: '1/4 Get Up',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Wall Sit Curls'),
    name: 'Wall Sit Curls',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Scorpion'),
    name: 'Scorpion',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Blackburns'),
    name: 'Blackburns',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Single Leg In/Out'),
    name: 'Single Leg In/Out',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Kneel to Tuck Jump'),
    name: 'Kneel to Tuck Jump',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Air Ball Slam'),
    name: 'Air Ball Slam',
    category: 'energy_system',
    description: 'Hold a slam ball or medicine ball overhead. Stand with feet shoulder-width apart. Engage your core and explosively slam the ball into the ground in front of you. Use your entire body to generate power. Pick up the ball and return to the starting position. Repeat with maximum intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Human Pretzel'),
    name: 'Human Pretzel',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Alternating Kneeling DB Snatch'),
    name: 'Alternating Kneeling DB Snatch',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'pull yourself under it by dropping into a partial squat. Catch the weight overhead with arms fully extended. Stand up fully to complete the rep. Return to starting position with control and repeat.',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles. As the weight rises'],
    },
  },
  {
    id: toId('Cross Over'),
    name: 'Cross Over',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Wall Sit x Snap Shot'),
    name: 'Wall Sit x Snap Shot',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Hang Clean'),
    name: 'DB Hang Clean',
    category: 'energy_system',
    description: 'Start with the weight at the starting position. Explosively pull the weight up by extending your hips',
    tips: [
      'quickly drop under it by bending your knees and catch it in a front rack position',
    ],
    musclesTargeted: {
      primary: ['knees'],
      secondary: ['and ankles simultaneously. As the weight reaches chest height'],
    },
  },
  {
    id: toId('D Side Up/Downs'),
    name: 'D Side Up/Downs',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Seated DB Shrug'),
    name: 'Seated DB Shrug',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('DB Swimmers'),
    name: 'DB Swimmers',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Frog Jump/KB Frog Jump'),
    name: 'Frog Jump/KB Frog Jump',
    category: 'energy_system',
    description: 'Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive',
    tips: [
      'absorbing impact through your joints. Complete the prescribed repetitions or distance with consistent intensity.',
    ],
    musclesTargeted: {
      primary: ['quick foot contacts'],
      secondary: ['and maintaining an athletic posture. Land softly from all jumps'],
    },
  },
  {
    id: toId('Standing Caveman Twist'),
    name: 'Standing Caveman Twist',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Cold Blooded Snake'),
    name: 'Cold Blooded Snake',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },
  {
    id: toId('Kneeling Snap Shot'),
    name: 'Kneeling Snap Shot',
    category: 'energy_system',
    description: 'Execute this conditioning movement with maximal effort and proper form. Focus on generating power from your hips and core. Maintain good breathing patterns and work-to-rest ratios as prescribed. Keep movements explosive yet controlled. Complete the prescribed reps or time interval while maintaining intensity.',
    tips: [
      'Calves',
    ],
  },

  // ==================== HINGE EXERCISES ====================
  {
    id: toId('Trap Bar Deadlift w/ Jump'),
    name: 'Trap Bar Deadlift w/ Jump',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'engage your core',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position yourself inside the trap bar with feet hip-width apart. Grip the handles'],
    },
  },
  {
    id: toId('KB Deadlift w/ Jump'),
    name: 'KB Deadlift w/ Jump',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Hinge at your hips while keeping your back flat and a slight bend in your knees. Lower the weights until you feel a stretch in your hamstrings',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Banded Glute Bridge Pull Over'),
    name: 'Banded Glute Bridge Pull Over',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('B Stance Hip Thrust'),
    name: 'B Stance Hip Thrust',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'shoulder-width apart. Place a barbell across your hips',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position your upper back against a bench with your feet flat on the floor'],
    },
  },
  {
    id: toId('Goat Belly Swing'),
    name: 'Goat Belly Swing',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Hip Thrust'),
    name: 'Hip Thrust',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'shoulder-width apart. Place a barbell across your hips',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position your upper back against a bench with your feet flat on the floor'],
    },
  },
  {
    id: toId('S/L Supported RDL'),
    name: 'S/L Supported RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight in the opposite hand. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand on one leg with a slight bend in the knee'],
    },
  },
  {
    id: toId('Sumo Deadlift'),
    name: 'Sumo Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Deadlift'),
    name: 'Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('DB Walking RDL'),
    name: 'DB Walking RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding dumbbells at your sides or in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Body Clean + Vert Jump to Hurdle Step + Broad Jump'),
    name: 'Body Clean + Vert Jump to Hurdle Step + Broad Jump',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('S/L Hurdle High Knee'),
    name: 'S/L Hurdle High Knee',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight in the opposite hand. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand on one leg with a slight bend in the knee'],
    },
  },
  {
    id: toId('Hurdle Box Hop'),
    name: 'Hurdle Box Hop',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Back Extension (Glute Focused)'),
    name: 'Back Extension (Glute Focused)',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Sumo Deadlift (Concentric Focus)'),
    name: 'Sumo Deadlift (Concentric Focus)',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Banded Pull Through'),
    name: 'Banded Pull Through',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('S:L Landmine Hip Thrust'),
    name: 'S:L Landmine Hip Thrust',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'shoulder-width apart. Place a barbell across your hips',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position your upper back against a bench with your feet flat on the floor'],
    },
  },
  {
    id: toId('RDL Top Down'),
    name: 'RDL Top Down',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Glute Bridge'),
    name: 'Glute Bridge',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('S/L Glute Bridge'),
    name: 'S/L Glute Bridge',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Bodyweight RDL'),
    name: 'Bodyweight RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('S/L Hurdle High Knee'),
    name: 'S/L Hurdle High Knee',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight in the opposite hand. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand on one leg with a slight bend in the knee'],
    },
  },
  {
    id: toId('Hurdle Box Hop'),
    name: 'Hurdle Box Hop',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('1-Leg Swing'),
    name: '1-Leg Swing',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('S/L Hip Thrust'),
    name: 'S/L Hip Thrust',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'using a pad for comfort. Lift one leg off the ground. Drive through the heel of your planted foot to lift your hips toward the ceiling',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position your upper back against a bench with feet flat on the floor. Place a barbell across your hips'],
    },
  },
  {
    id: toId('Deadlift to Hop'),
    name: 'Deadlift to Hop',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Banded Good Mornings'),
    name: 'Banded Good Mornings',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'hinge at your hips to lower your torso toward parallel with the floor. Keep your core engaged and maintain a neutral spine throughout. Feel the stretch in your hamstrings',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position a barbell across your upper back (not your neck). Stand with feet shoulder-width apart. Keeping your knees slightly bent and back flat'],
    },
  },
  {
    id: toId('S/L Deadlift + Reach'),
    name: 'S/L Deadlift + Reach',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('1-Leg Swing'),
    name: '1-Leg Swing',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Sumo Deadlift (Concentric Focus)'),
    name: 'Sumo Deadlift (Concentric Focus)',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Back Extensions'),
    name: 'Back Extensions',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Banded Deadlift Off Box'),
    name: 'Banded Deadlift Off Box',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('KB Swing'),
    name: 'KB Swing',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Hip Thrust'),
    name: 'Hip Thrust',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'shoulder-width apart. Place a barbell across your hips',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Position your upper back against a bench with your feet flat on the floor'],
    },
  },
  {
    id: toId('Romanian Deadlift'),
    name: 'Romanian Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('S/L Alternating KB RDL'),
    name: 'S/L Alternating KB RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Elevated S/L KB RDL'),
    name: 'Elevated S/L KB RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Glute Pull Through'),
    name: 'Glute Pull Through',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Deadlift'),
    name: 'Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('KB Deadlift x Jump'),
    name: 'KB Deadlift x Jump',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Hinge at your hips while keeping your back flat and a slight bend in your knees. Lower the weights until you feel a stretch in your hamstrings',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Walking RDL'),
    name: 'Walking RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding the weight with an overhand grip in front of your thighs. Keeping your back flat and knees slightly bent',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Barbell S/L RDL'),
    name: 'Barbell S/L RDL',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding a barbell with an overhand grip in front of your thighs. Keeping your back flat and maintaining balance',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('DB Catch and Release Deadlift'),
    name: 'DB Catch and Release Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('S/A DB Row X Deadlift X Curl'),
    name: 'S/A DB Row X Deadlift X Curl',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Barbell Glute Bridge'),
    name: 'Barbell Glute Bridge',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Kettlebell Deadlift X Row'),
    name: 'Kettlebell Deadlift X Row',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Hinge at your hips while keeping your back flat and a slight bend in your knees. Lower the weights until you feel a stretch in your hamstrings',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Glute Bridge Hold w/ Reverse Grip Press'),
    name: 'Glute Bridge Hold w/ Reverse Grip Press',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('DB Explosive Deadlift'),
    name: 'DB Explosive Deadlift',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },
  {
    id: toId('Kettlebell Stiff Leg Deadlift x Row'),
    name: 'Kettlebell Stiff Leg Deadlift x Row',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'holding kettlebells at your sides. Hinge at your hips while keeping your back flat and a slight bend in your knees. Lower the weights until you feel a stretch in your hamstrings',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Kickstart Russian Kettlebell Swing'),
    name: 'Kickstart Russian Kettlebell Swing',
    category: 'hinge',
    description: 'snap shooting from cover',
    tips: [
      'keeping the weight close to your body throughout. Engage your glutes and hamstrings to reverse the movement and return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining low athletic positions during games.'],
      secondary: ['Stand with feet hip-width apart in a stable position. Hinge at your hips while keeping your back flat and maintaining a slight bend in your knees. Lower the weight until you feel a stretch in your hamstrings'],
    },
  },

  // ==================== LUNGE EXERCISES ====================
  {
    id: toId('Scissor Step Ups'),
    name: 'Scissor Step Ups',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'switching feet in mid-air to land with the opposite foot on the platform. Focus on powerful leg drive and quick foot transitions. Land softly with control and immediately transition into the next rep.',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Place one foot on an elevated platform (box or bench). Explosively drive through the elevated leg'],
    },
  },
  {
    id: toId('Pull Apart Hold Lateral Step Over'),
    name: 'Pull Apart Hold Lateral Step Over',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'then bring your far leg over. Move with control and maintain good posture throughout. Continue moving laterally over the obstacles as prescribed.',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand beside an object or hurdle. Step over it laterally with your near leg'],
    },
  },
  {
    id: toId('S/A Front Rack KB Contralateral Lateral Lunge'),
    name: 'S/A Front Rack KB Contralateral Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Reverse Lunge Front Foot Elevated'),
    name: 'Reverse Lunge Front Foot Elevated',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing on the ball of your foot. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step backward with one leg'],
    },
  },
  {
    id: toId('DB Step Over Lateral Lunge'),
    name: 'DB Step Over Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Bulgarian Twist'),
    name: 'Bulgarian Twist',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keep your core engaged',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Execute the stepping or lunging movement with control and proper form. Maintain an upright torso'],
    },
  },
  {
    id: toId('Offset Step Up'),
    name: 'Offset Step Up',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'ensuring the entire foot is in contact with the surface. Keep your torso upright and core engaged. Drive through the elevated heel to step up onto the platform',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Place one foot on an elevated platform (box or bench)'],
    },
  },
  {
    id: toId('Loaded Beast + Spider Man Lunge w/ Rotation'),
    name: 'Loaded Beast + Spider Man Lunge w/ Rotation',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Kickstand to Kneel'),
    name: 'Kickstand to Kneel',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keep your core engaged',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Execute the stepping or lunging movement with control and proper form. Maintain an upright torso'],
    },
  },
  {
    id: toId('Kickstand Rock Back'),
    name: 'Kickstand Rock Back',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keep your core engaged',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Execute the stepping or lunging movement with control and proper form. Maintain an upright torso'],
    },
  },
  {
    id: toId('Contralateral Lateral Lunge'),
    name: 'Contralateral Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('DB Clean to Lunge'),
    name: 'DB Clean to Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Deep Lunge to Rocking Lunge'),
    name: 'Deep Lunge to Rocking Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Moving Lateral Lunge'),
    name: 'Moving Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Deep Lunge w/ Thoracic Reach'),
    name: 'Deep Lunge w/ Thoracic Reach',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Hinge/Lunge Thoracic Combo'),
    name: 'Hinge/Lunge Thoracic Combo',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('KB Front Rack Walking Lunge'),
    name: 'KB Front Rack Walking Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'lowering your back knee toward the ground by bending both knees. Keep your torso upright and front knee in line with your toes. Descend until both knees are bent to approximately 90 degrees. Push through your front heel to step forward with your back leg into the next lunge. Continue alternating legs',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Landmine Reverse Lunge'),
    name: 'Landmine Reverse Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing on the ball of your foot. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step backward with one leg'],
    },
  },
  {
    id: toId('Deep Lunge Warm Up Drill'),
    name: 'Deep Lunge Warm Up Drill',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Step Through Lunge'),
    name: 'Step Through Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Walking Lunge w/ Rotation'),
    name: 'Walking Lunge w/ Rotation',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'lowering your back knee toward the ground by bending both knees. Keep your torso upright and front knee in line with your toes. Descend until both knees are bent to approximately 90 degrees. Push through your front heel to step forward with your back leg into the next lunge. Continue alternating legs',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Banded Curtsey Lunge'),
    name: 'Banded Curtsey Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('1.5 Lateral Lunge + Raise'),
    name: '1.5 Lateral Lunge + Raise',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Jump Lunge'),
    name: 'Jump Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Lunge Compass'),
    name: 'Lunge Compass',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Hip Pull to Round the World Lateral Lunge'),
    name: 'Hip Pull to Round the World Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Low Hang Lateral Lunge w/ Pause'),
    name: 'Low Hang Lateral Lunge w/ Pause',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Lateral Lunge Rock Back'),
    name: 'Lateral Lunge Rock Back',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Barbell Step Up'),
    name: 'Barbell Step Up',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'ensuring the entire foot is in contact with the surface. Keep your torso upright and core engaged. Drive through the elevated heel to step up onto the platform',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Place one foot on an elevated platform (box or bench)'],
    },
  },
  {
    id: toId('Step Ups'),
    name: 'Step Ups',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'ensuring the entire foot is in contact with the surface. Keep your torso upright and core engaged. Drive through the elevated heel to step up onto the platform',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Place one foot on an elevated platform (box or bench)'],
    },
  },
  {
    id: toId('Tempo Lateral Lunge + Cross Over Step'),
    name: 'Tempo Lateral Lunge + Cross Over Step',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Anterior Lunge Explosive Concentric'),
    name: 'Anterior Lunge Explosive Concentric',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Active Cossack Lunge'),
    name: 'Active Cossack Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('BB Forward Lunge'),
    name: 'BB Forward Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Kickstand Internal Rotation'),
    name: 'Kickstand Internal Rotation',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keep your core engaged',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Execute the stepping or lunging movement with control and proper form. Maintain an upright torso'],
    },
  },
  {
    id: toId('Kickstand External Rotation'),
    name: 'Kickstand External Rotation',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keep your core engaged',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Execute the stepping or lunging movement with control and proper form. Maintain an upright torso'],
    },
  },
  {
    id: toId('KB Curtsy Lunge'),
    name: 'KB Curtsy Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Lateral Lunge X Crossover Step Up'),
    name: 'Lateral Lunge X Crossover Step Up',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('S/L Around The World Lunge'),
    name: 'S/L Around The World Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Burpee Lunge'),
    name: 'Burpee Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Reverse Lunge + High Knee Step Up'),
    name: 'Reverse Lunge + High Knee Step Up',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing on the ball of your foot. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step backward with one leg'],
    },
  },
  {
    id: toId('Pause Step Up'),
    name: 'Pause Step Up',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'ensuring the entire foot is in contact with the surface. Keep your torso upright and core engaged. Drive through the elevated heel to step up onto the platform',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Place one foot on an elevated platform (box or bench)'],
    },
  },
  {
    id: toId('KB Lateral Lunge'),
    name: 'KB Lateral Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Lunge Pulse'),
    name: 'Lunge Pulse',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Jump Lunge w/ Pause'),
    name: 'Jump Lunge w/ Pause',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Lateral Lunge w/ Hammer Press'),
    name: 'Lateral Lunge w/ Hammer Press',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },
  {
    id: toId('Kneel to Lunge'),
    name: 'Kneel to Lunge',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Alternating Lunge w/ Cable Fly'),
    name: 'Alternating Lunge w/ Cable Fly',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'landing with your entire foot flat on the ground. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand tall with feet hip-width apart. Step forward with one leg'],
    },
  },
  {
    id: toId('Kneeling Lateral Lunge to Tuck Jump'),
    name: 'Kneeling Lateral Lunge to Tuck Jump',
    category: 'lunge',
    description: 'stepping over bunkers',
    tips: [
      'keeping your toes pointed forward. Shift your weight onto the stepping leg while keeping the other leg straight. Bend the knee of the stepping leg and push your hips back',
    ],
    musclesTargeted: {
      primary: ['and maintaining balance during quick transitions on uneven terrain.'],
      secondary: ['Stand with feet hip-width apart. Take a wide step to the side with one leg'],
    },
  },

  // ==================== PREP EXERCISES ====================
  {
    id: toId('Half Kneeling CNS Breathing'),
    name: 'Half Kneeling CNS Breathing',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Wrist PAILS & RAILS Variation'),
    name: 'Wrist PAILS & RAILS Variation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Wrist CARS'),
    name: 'Wrist CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Frog Stretch PAILS & RAILS Variation'),
    name: 'Frog Stretch PAILS & RAILS Variation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Half Kneeling Ankle PAILS & RAILS'),
    name: 'Half Kneeling Ankle PAILS & RAILS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Banded Supine IT Band Stretch to Crossover'),
    name: 'Banded Supine IT Band Stretch to Crossover',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Tibia Rotations Level 1'),
    name: 'Tibia Rotations Level 1',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Frog Stretch to Hip Extension'),
    name: 'Frog Stretch to Hip Extension',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Couch Stretch'),
    name: 'Couch Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Greatest Stretch with Thoracic Reach'),
    name: 'Greatest Stretch with Thoracic Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('DNS Thoracic Reach'),
    name: 'DNS Thoracic Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Hip CARS'),
    name: 'Hip CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Half Kneeling Reach'),
    name: 'Half Kneeling Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Hip Opener'),
    name: 'Hip Opener',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Hip Opener Skip'),
    name: 'Hip Opener Skip',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Frog T Spine Rotation'),
    name: 'Frog T Spine Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Barbell Quad Release'),
    name: 'Barbell Quad Release',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Quadruped Scapular CARS'),
    name: 'Quadruped Scapular CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Scorpion to Reach'),
    name: 'Scorpion to Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Cobra to Downward Dog + Reach'),
    name: 'Cobra to Downward Dog + Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Ankle CARS'),
    name: 'Ankle CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Knee CARS'),
    name: 'Knee CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Foam Roll Lumbar Bridge'),
    name: 'Foam Roll Lumbar Bridge',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Foam Roll Pec Release'),
    name: 'Foam Roll Pec Release',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Thoracic Spine Foam Roll Mobility'),
    name: 'Thoracic Spine Foam Roll Mobility',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Assessment Intro'),
    name: 'Assessment Intro',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Quadruped Thoracic Rotation'),
    name: 'Quadruped Thoracic Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Overhead Assessment'),
    name: 'Overhead Assessment',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Standing Thoracic CARS'),
    name: 'Standing Thoracic CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Windmill Hamstring Stretch'),
    name: 'Windmill Hamstring Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Ankle Assessment'),
    name: 'Ankle Assessment',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Overhead Reach Assessment'),
    name: 'Overhead Reach Assessment',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Neck CARS'),
    name: 'Neck CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Worlds Greatest Stretch w/ Windmill'),
    name: 'Worlds Greatest Stretch w/ Windmill',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('S/L Transverse Hop w/ Reach'),
    name: 'S/L Transverse Hop w/ Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'absorbing impact through your hip',
    ],
    musclesTargeted: {
      primary: ['Balance on one leg with a slight bend in the knee. Explosively jump on the single leg'],
      secondary: ['focusing on height or distance as prescribed. Maintain balance and stability throughout. Land softly on the same leg'],
    },
  },
  {
    id: toId('Quadruped Glute Stretch'),
    name: 'Quadruped Glute Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('90/90 Hip Stretch'),
    name: '90/90 Hip Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Kneeling Crab Reach'),
    name: 'Kneeling Crab Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Standing Thoracic Reach'),
    name: 'Standing Thoracic Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Alternating Active Hamstring Stretch'),
    name: 'Alternating Active Hamstring Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Active Hamstring Stretch'),
    name: 'Active Hamstring Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Pigeon Stretch'),
    name: 'Pigeon Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Split Stance Rotational Slam'),
    name: 'Split Stance Rotational Slam',
    category: 'prep',
    description: 'more efficient play.',
    musclesTargeted: {
      primary: ['Hold a slam ball or medicine ball overhead. Stand with feet shoulder-width apart. Engage your core and explosively slam the ball into the ground in front of you. Use your entire body to generate power. Pick up the ball and return to the starting position. Repeat with maximum intensity.'],
      secondary: ['N/A (Mobility)'],
    },
  },
  {
    id: toId('Hip Capsule CARS'),
    name: 'Hip Capsule CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('90/90 External Rotation'),
    name: '90/90 External Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Nail & Pin Glute Stretch'),
    name: 'Nail & Pin Glute Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Roll Over Reach'),
    name: 'Roll Over Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Hip Flexion Stretch to Cross Body'),
    name: 'Hip Flexion Stretch to Cross Body',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Kneeling Hamstring Stretch'),
    name: 'Kneeling Hamstring Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Active Half Kneeling Hip Flexion Stretch'),
    name: 'Active Half Kneeling Hip Flexion Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Active Death March Stretch'),
    name: 'Active Death March Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Active High Knee Stretch'),
    name: 'Active High Knee Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Child\'s Pose Mobility Drill'),
    name: 'Child\'s Pose Mobility Drill',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Foam Rolling Thoracic Extension'),
    name: 'Foam Rolling Thoracic Extension',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('KB Psoas Release'),
    name: 'KB Psoas Release',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Couch Stretch'),
    name: 'Couch Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Tall Kneeling Scap CARS'),
    name: 'Tall Kneeling Scap CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Seated Thoracic CARS'),
    name: 'Seated Thoracic CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Quadruped Hip CARS'),
    name: 'Quadruped Hip CARS',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Frog Stretch/Half Kneeling Frog Stretch'),
    name: 'Frog Stretch/Half Kneeling Frog Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Side Lying Thoracic Rotation'),
    name: 'Side Lying Thoracic Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Crab Reach'),
    name: 'Crab Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Childs Pose w/ Side Reach'),
    name: 'Childs Pose w/ Side Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Cat Cow Stretch'),
    name: 'Cat Cow Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Kneeling Thoracic Rotation'),
    name: 'Kneeling Thoracic Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Ankle and Knee Dynamic Warm Up'),
    name: 'Ankle and Knee Dynamic Warm Up',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Shin Box Rotation X Reach'),
    name: 'Shin Box Rotation X Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Barbell Quad Release'),
    name: 'Barbell Quad Release',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Standing Rotational Chop'),
    name: 'Standing Rotational Chop',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'and maintaining an athletic posture. Land softly from all jumps',
    ],
    musclesTargeted: {
      primary: ['Execute the plyometric or sprint movement with explosive power and proper mechanics. Focus on powerful leg drive'],
      secondary: ['quick foot contacts'],
    },
  },
  {
    id: toId('Walking Quad Stretch'),
    name: 'Walking Quad Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Active Thoracic Extension'),
    name: 'Active Thoracic Extension',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Perfect Stretch'),
    name: 'Perfect Stretch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'never forcing past your comfortable range. Hold static stretches for the prescribed time or perform dynamic movements for the prescribed repetitions.',
    ],
    musclesTargeted: {
      primary: ['Perform the mobility or flexibility exercise as demonstrated'],
      secondary: ['moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately'],
    },
  },
  {
    id: toId('Lacrosse Ball Glute Med Release'),
    name: 'Lacrosse Ball Glute Med Release',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('S/L Elevated Reach Back X High Knee'),
    name: 'S/L Elevated Reach Back X High Knee',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Lying Reach Back and Touch'),
    name: 'Lying Reach Back and Touch',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Quadruped Thread and Reach'),
    name: 'Quadruped Thread and Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('Duck Walk with Hip Rotation'),
    name: 'Duck Walk with Hip Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'not momentum. Return to starting position with the same control and repeat.',
    ],
    musclesTargeted: {
      primary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
      secondary: ['powerful rotation generated from your core'],
    },
  },
  {
    id: toId('Ape Reach'),
    name: 'Ape Reach',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('DB Reach Back'),
    name: 'DB Reach Back',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'exhaling during the exertion phase. Move through the full range of motion while maintaining tension in the working muscles. Complete the prescribed sets and repetitions with consistent quality.',
    ],
    musclesTargeted: {
      primary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
      secondary: ['focusing on the target muscle groups. Breathe steadily'],
    },
  },
  {
    id: toId('DB Thruster w/ Rotation'),
    name: 'DB Thruster w/ Rotation',
    category: 'prep',
    description: 'more efficient play.',
    tips: [
      'N/A (Mobility)',
    ],
    musclesTargeted: {
      primary: ['Hold the weight in a front rack position at shoulder height. Stand with feet shoulder-width apart. Perform a front squat by descending until your thighs are parallel to the floor. Explosively drive up through your heels. As you reach standing'],
      secondary: ['continue the momentum to press the weight overhead in one fluid motion. Lower to front rack position and immediately descend into the next squat.'],
    },
  },

  // ==================== PRESS EXERCISES ====================
  {
    id: toId('Lying MB Chest Press'),
    name: 'Lying MB Chest Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Incline Bench Preacher Curl'),
    name: 'Incline Bench Preacher Curl',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('KB Seesaw Z Press'),
    name: 'KB Seesaw Z Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Bench T Spine Mobility Drill'),
    name: 'Bench T Spine Mobility Drill',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Axial Shoulder CARS'),
    name: 'Axial Shoulder CARS',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('1.5 Push Up Feet Elevated'),
    name: '1.5 Push Up Feet Elevated',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('S/A Floor Press'),
    name: 'S/A Floor Press',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at about 45 degrees. Press the weight back up explosively',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on the floor with your knees bent and feet flat. Hold dumbbells or a barbell above your chest with arms extended. Lower the weight until your upper arms touch the floor'],
    },
  },
  {
    id: toId('Feet Elevated Push Up'),
    name: 'Feet Elevated Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Quadruped Shoulder CARS'),
    name: 'Quadruped Shoulder CARS',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Banded Shoulder Rotation'),
    name: 'Banded Shoulder Rotation',
    category: 'press',
    description: 'diving',
    tips: [
      'powerful rotation generated from your core',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself for the rotational movement. Engage your core throughout. Rotate through your torso while keeping hips stable. Focus on controlled'],
    },
  },
  {
    id: toId('DB Bench Press Neutral Grip'),
    name: 'DB Bench Press Neutral Grip',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Kneeling Blast Off Explosive Push Up'),
    name: 'Kneeling Blast Off Explosive Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('DB Bench Press Matrix'),
    name: 'DB Bench Press Matrix',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Floor Press'),
    name: 'Floor Press',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at about 45 degrees. Press the weight back up explosively',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on the floor with your knees bent and feet flat. Hold dumbbells or a barbell above your chest with arms extended. Lower the weight until your upper arms touch the floor'],
    },
  },
  {
    id: toId('Explosive Band Press'),
    name: 'Explosive Band Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Tall Kneeling Shoulder Tut'),
    name: 'Tall Kneeling Shoulder Tut',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Bodyweight Dips'),
    name: 'Bodyweight Dips',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Dive Bomber Push Ups'),
    name: 'Dive Bomber Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Jump in Push Up w/ Shoulder Tap'),
    name: 'Jump in Push Up w/ Shoulder Tap',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Shoulder Opener'),
    name: 'Shoulder Opener',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Tiger Push Up'),
    name: 'Tiger Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Downward Dog Scap Push Up'),
    name: 'Downward Dog Scap Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Hover Push Up'),
    name: 'Hover Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Jump In Push Up'),
    name: 'Jump In Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('L Push Up'),
    name: 'L Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Half Kneeling Landmine Press'),
    name: 'Half Kneeling Landmine Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Push Off Push Up + Pause'),
    name: 'Push Off Push Up + Pause',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('S/A DB Bench Press + S/L Bridge'),
    name: 'S/A DB Bench Press + S/L Bridge',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Blast Off Push Up'),
    name: 'Blast Off Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Shoulder Tut'),
    name: 'Shoulder Tut',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('McKensie Press to Downward Dog'),
    name: 'McKensie Press to Downward Dog',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Hand Release Push Ups'),
    name: 'Hand Release Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Arnold Z-Press'),
    name: 'Arnold Z-Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Bench Press'),
    name: 'Bench Press',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Floor Press + Turkish Get Up to Hand'),
    name: 'Floor Press + Turkish Get Up to Hand',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at about 45 degrees. Press the weight back up explosively',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on the floor with your knees bent and feet flat. Hold dumbbells or a barbell above your chest with arms extended. Lower the weight until your upper arms touch the floor'],
    },
  },
  {
    id: toId('Pec/Shoulder Foam Roller Stretch'),
    name: 'Pec/Shoulder Foam Roller Stretch',
    category: 'press',
    description: 'diving',
    tips: [
      'moving through the full range of motion with control. Focus on breathing deeply and relaxing into the stretch or movement. Move slowly and deliberately',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Perform the mobility or flexibility exercise as demonstrated'],
    },
  },
  {
    id: toId('Banded Alternating Bench Press (Bottoms Up)'),
    name: 'Banded Alternating Bench Press (Bottoms Up)',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Push Up w/ Pause'),
    name: 'Push Up w/ Pause',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Alternating DB Bench Press (Bottom Up)'),
    name: 'Alternating DB Bench Press (Bottom Up)',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Shoulder CARS'),
    name: 'Shoulder CARS',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Split Stance DB Press to Elevated Jerk'),
    name: 'Split Stance DB Press to Elevated Jerk',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Explosive Elevated Push Up'),
    name: 'Explosive Elevated Push Up',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Bench Psoas Release'),
    name: 'Bench Psoas Release',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Kneeling Push Press'),
    name: 'Kneeling Push Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Banded Landmine Press'),
    name: 'Banded Landmine Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('S/A Floor Press'),
    name: 'S/A Floor Press',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at about 45 degrees. Press the weight back up explosively',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on the floor with your knees bent and feet flat. Hold dumbbells or a barbell above your chest with arms extended. Lower the weight until your upper arms touch the floor'],
    },
  },
  {
    id: toId('Walk Out Offset Push Ups'),
    name: 'Walk Out Offset Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Half Kneeling Incline Cable Press'),
    name: 'Half Kneeling Incline Cable Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Inch Worm Offset Push Ups'),
    name: 'Inch Worm Offset Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Shoulder Complex'),
    name: 'Shoulder Complex',
    category: 'press',
    description: 'diving',
    tips: [
      'focusing on the target muscle groups. Breathe steadily',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself in the proper starting stance for this movement. Engage your core and maintain good posture throughout. Execute the movement with control and proper form'],
    },
  },
  {
    id: toId('Alternating KB Press w/ Bridge Hold'),
    name: 'Alternating KB Press w/ Bridge Hold',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Incline Bench Press'),
    name: 'Incline Bench Press',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Bench Press w/ Pause'),
    name: 'Bench Press w/ Pause',
    category: 'press',
    description: 'diving',
    tips: [
      'keeping your elbows at approximately 45 degrees from your body. Press the bar back up explosively until your arms are fully extended. Maintain core tension and keep your shoulder blades retracted throughout.',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Lie on a bench with your feet flat on the floor and your back in a natural arch. Grip the barbell slightly wider than shoulder-width. Unrack the bar and position it over your chest with arms extended. Lower the bar under control to your mid-chest'],
    },
  },
  {
    id: toId('Half Kneeling KB Bottoms Up Press'),
    name: 'Half Kneeling KB Bottoms Up Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Overhand Grip Cable Chest Press'),
    name: 'Overhand Grip Cable Chest Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('KB Alternating Push Ups'),
    name: 'KB Alternating Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('S/A Kneeling Landmine Press w/ Reach'),
    name: 'S/A Kneeling Landmine Press w/ Reach',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Devil Press'),
    name: 'Devil Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Standing S/A DB Press'),
    name: 'Standing S/A DB Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Cable Sved Press'),
    name: 'Cable Sved Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Titan Press'),
    name: 'Titan Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Push Off Push Ups'),
    name: 'Push Off Push Ups',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Frog Push Up to Jump'),
    name: 'Frog Push Up to Jump',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('Kettlebell Bottoms Up Chest Press'),
    name: 'Kettlebell Bottoms Up Chest Press',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Explosive Push Up to Kneel'),
    name: 'Explosive Push Up to Kneel',
    category: 'press',
    description: 'diving',
    tips: [
      'body forming a straight line from head to heels. Engage your core and glutes to maintain a rigid torso. Lower your body by bending your elbows',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Start in a plank position with hands slightly wider than shoulder-width apart'],
    },
  },
  {
    id: toId('DB Chest Press to 1/4 Get Up'),
    name: 'DB Chest Press to 1/4 Get Up',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },
  {
    id: toId('Bosu Ball bridge hold w/ reverse grip DB chest press x fly'),
    name: 'Bosu Ball bridge hold w/ reverse grip DB chest press x fly',
    category: 'press',
    description: 'diving',
    tips: [
      'maintaining tension in the target muscles. Press the weight explosively to the starting position',
    ],
    musclesTargeted: {
      primary: ['and stabilizing your marker during rapid fire. Improves endurance for holding shooting positions.'],
      secondary: ['Position yourself appropriately for the pressing movement. Engage your core and maintain proper alignment throughout. Lower the weight under control'],
    },
  },

  // ==================== PULL EXERCISES ====================
  {
    id: toId('Lateral Step Dynaball Chest Pass'),
    name: 'Lateral Step Dynaball Chest Pass',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'following through toward your target. Catch the ball or retrieve it and reset for the next rep. Combine the stepping pattern with the explosive chest pass movement.',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Hold a medicine ball or slam ball at chest height. Step in the prescribed pattern while maintaining an athletic stance. Explosively pass the ball forward using your chest and arms'],
    },
  },
  {
    id: toId('Corkscrew Row'),
    name: 'Corkscrew Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('S/L Lateral Hop w/ Reactive Ball'),
    name: 'S/L Lateral Hop w/ Reactive Ball',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Banded Lateral Monster Walk (Above Knee)'),
    name: 'Banded Lateral Monster Walk (Above Knee)',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('DB Lateral Raise'),
    name: 'DB Lateral Raise',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Banded Rotational Lat Stretch'),
    name: 'Banded Rotational Lat Stretch',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Neutral Grip Pull Up'),
    name: 'Neutral Grip Pull Up',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'hands slightly wider than shoulder-width apart. Engage your core and pull your shoulder blades down and back. Pull your body up by driving your elbows down and back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Hang from a bar with an overhand grip (palms facing away)'],
    },
  },
  {
    id: toId('Chest Supported Row + Eccentric Fly'),
    name: 'Chest Supported Row + Eccentric Fly',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Banded Distracted Lat Stretch'),
    name: 'Banded Distracted Lat Stretch',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Tall Kneeling Lateral Flexion'),
    name: 'Tall Kneeling Lateral Flexion',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Half Kneeling Bottoms Up KB Hold (Ipsilateral)'),
    name: 'Half Kneeling Bottoms Up KB Hold (Ipsilateral)',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Chest Supported Scap Rows'),
    name: 'Chest Supported Scap Rows',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Hinge Band Pull Down'),
    name: 'Hinge Band Pull Down',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Kneeling 3 Point Row'),
    name: 'Kneeling 3 Point Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Chest Supported Alternating Row w/ ISO Hold'),
    name: 'Chest Supported Alternating Row w/ ISO Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Meadow Rows'),
    name: 'Meadow Rows',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Chin Ups'),
    name: 'Chin Ups',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'hands approximately shoulder-width apart. Engage your core and pull your shoulder blades down and back. Pull your body up by driving your elbows down',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Hang from a bar with an underhand grip (palms facing you)'],
    },
  },
  {
    id: toId('3 Point Row Pronated Grip'),
    name: '3 Point Row Pronated Grip',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Foam Roll Lat Release'),
    name: 'Foam Roll Lat Release',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('TRX Pike Pull Up'),
    name: 'TRX Pike Pull Up',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'hands slightly wider than shoulder-width apart. Engage your core and pull your shoulder blades down and back. Pull your body up by driving your elbows down and back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Hang from a bar with an overhand grip (palms facing away)'],
    },
  },
  {
    id: toId('Banded Shot Put Throw'),
    name: 'Banded Shot Put Throw',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Alternating Cable Pulldown ISO Hold'),
    name: 'Alternating Cable Pulldown ISO Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'focusing on your lats. Squeeze at the bottom',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Sit at a lat pulldown machine and grip the bar with a shoulder-width overhand grip. Engage your core and pull your shoulder blades down and back. Pull the bar down toward your upper chest by driving your elbows down and back'],
    },
  },
  {
    id: toId('Seated Cable Row'),
    name: 'Seated Cable Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'Back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Sit at a cable row machine with your feet braced and knees slightly bent. Grip the handle and sit up tall with your chest out. Pull the handle toward your lower ribcage by driving your elbows back and squeezing your shoulder blades together. Keep your torso stable throughout. Extend your arms back to the starting position with control and repeat.'],
    },
  },
  {
    id: toId('Half Kneeling Thoracic Row'),
    name: 'Half Kneeling Thoracic Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Banded Face Pull'),
    name: 'Banded Face Pull',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'thumbs near the ends. Step back to create tension. Pull the rope toward your face',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Attach a rope to a cable machine at upper chest height. Grasp the rope with an overhand grip'],
    },
  },
  {
    id: toId('Lateral Bear Crawl to Sit Through'),
    name: 'Lateral Bear Crawl to Sit Through',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('X Lateral Monster Walk'),
    name: 'X Lateral Monster Walk',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Deceleration Drill'),
    name: 'Lateral Deceleration Drill',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Slides'),
    name: 'Lateral Slides',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Pendlay Row'),
    name: 'Pendlay Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Thoracic Reach'),
    name: 'Lateral Thoracic Reach',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Reactive Lateral High Knee'),
    name: 'Reactive Lateral High Knee',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Bent Over Barbell Row (Reverse Grip)'),
    name: 'Bent Over Barbell Row (Reverse Grip)',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Batwing Rows'),
    name: 'Batwing Rows',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Switch Step x Lateral Skater'),
    name: 'Switch Step x Lateral Skater',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral KB Suitcase Carry'),
    name: 'Lateral KB Suitcase Carry',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Cable Pull Down'),
    name: 'Cable Pull Down',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Explosive Inverted Row'),
    name: 'Explosive Inverted Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'engaging your core and glutes. Lower with control and repeat.',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Set a barbell in a rack at about waist height. Lie underneath and grip it with hands slightly wider than shoulder-width. Position your body in a straight line with heels on the ground. Pull your chest to the bar by driving your elbows back and squeezing your shoulder blades together. Keep your body rigid'],
    },
  },
  {
    id: toId('Lateral S/L Box Jump'),
    name: 'Lateral S/L Box Jump',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Cable Face Pull'),
    name: 'Cable Face Pull',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'thumbs near the ends. Step back to create tension. Pull the rope toward your face',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Attach a rope to a cable machine at upper chest height. Grasp the rope with an overhand grip'],
    },
  },
  {
    id: toId('Chest Supported Row'),
    name: 'Chest Supported Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Half Kneeling Low Cable Row'),
    name: 'Half Kneeling Low Cable Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'Back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Sit at a cable row machine with your feet braced and knees slightly bent. Grip the handle and sit up tall with your chest out. Pull the handle toward your lower ribcage by driving your elbows back and squeezing your shoulder blades together. Keep your torso stable throughout. Extend your arms back to the starting position with control and repeat.'],
    },
  },
  {
    id: toId('Resistance Band Bent Over Row Hold'),
    name: 'Resistance Band Bent Over Row Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'holding dumbbells. Hinge at your hips with a slight bend in your knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Lateral Quadruped Crawl'),
    name: 'Lateral Quadruped Crawl',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Raise w/ Static Hold'),
    name: 'Lateral Raise w/ Static Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Pull Up w/ Hold'),
    name: 'Pull Up w/ Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'hands slightly wider than shoulder-width apart. Engage your core and pull your shoulder blades down and back. Pull your body up by driving your elbows down and back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Hang from a bar with an overhand grip (palms facing away)'],
    },
  },
  {
    id: toId('3 point DB Row'),
    name: '3 point DB Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Renegade Rows'),
    name: 'Renegade Rows',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Prone Plate Raise'),
    name: 'Prone Plate Raise',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lat Roll Out'),
    name: 'Lat Roll Out',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Chest Supported Row Iso Hold'),
    name: 'Chest Supported Row Iso Hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Wall Hinge Scap Row'),
    name: 'Wall Hinge Scap Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Inverted Row'),
    name: 'Inverted Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'engaging your core and glutes. Lower with control and repeat.',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Set a barbell in a rack at about waist height. Lie underneath and grip it with hands slightly wider than shoulder-width. Position your body in a straight line with heels on the ground. Pull your chest to the bar by driving your elbows back and squeezing your shoulder blades together. Keep your body rigid'],
    },
  },
  {
    id: toId('Lateral Step to Box Jump'),
    name: 'Lateral Step to Box Jump',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Wall Hinge DB Row Holds'),
    name: 'Wall Hinge DB Row Holds',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Power Straight Arm Pull Down'),
    name: 'Power Straight Arm Pull Down',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('S/L Lateral Hop'),
    name: 'S/L Lateral Hop',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Pendlay Row'),
    name: 'Pendlay Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Cable Power Row'),
    name: 'Cable Power Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Double Hop In/Out'),
    name: 'Lateral Double Hop In/Out',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Close Grip Landmine Row'),
    name: 'Close Grip Landmine Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Plate Hold X Flutter Kicks'),
    name: 'Plate Hold X Flutter Kicks',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Banded Lateral Monster Walks'),
    name: 'Banded Lateral Monster Walks',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('DB Explosive Row'),
    name: 'DB Explosive Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Hop to Broad Jump'),
    name: 'Lateral Hop to Broad Jump',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Bent Over Row w/ Catch'),
    name: 'Bent Over Row w/ Catch',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'holding dumbbells. Hinge at your hips with a slight bend in your knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Stand with feet hip-width apart'],
    },
  },
  {
    id: toId('Wall Sit Wide Row'),
    name: 'Wall Sit Wide Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Barbell Row to 1/2 Burpee'),
    name: 'Barbell Row to 1/2 Burpee',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Single Leg In/Out'),
    name: 'Lateral Single Leg In/Out',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Duck Walk'),
    name: 'Lateral Duck Walk',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('DB alternating row w/ iso hold'),
    name: 'DB alternating row w/ iso hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Lateral Hop w/ rotation to single leg balance'),
    name: 'Lateral Hop w/ rotation to single leg balance',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Kettlebell Row'),
    name: 'Kettlebell Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Plate Lift/Chop'),
    name: 'Plate Lift/Chop',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Hammer shrug/Lateral Raise w/ hold'),
    name: 'Hammer shrug/Lateral Raise w/ hold',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Wide Grip Row'),
    name: 'Wide Grip Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Wide Grip Row'),
    name: 'Wide Grip Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Cable Scapular Row'),
    name: 'Cable Scapular Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Cable Row'),
    name: 'Cable Row',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'Back',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Sit at a cable row machine with your feet braced and knees slightly bent. Grip the handle and sit up tall with your chest out. Pull the handle toward your lower ribcage by driving your elbows back and squeezing your shoulder blades together. Keep your torso stable throughout. Extend your arms back to the starting position with control and repeat.'],
    },
  },
  {
    id: toId('Isolated DB Pullover'),
    name: 'Isolated DB Pullover',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },
  {
    id: toId('Exaggerated Lateral Raise'),
    name: 'Exaggerated Lateral Raise',
    category: 'pull',
    description: 'pulling yourself up or over obstacles',
    tips: [
      'then drive your elbows back. Focus on squeezing your back muscles at peak contraction. Lower the weight with control',
    ],
    musclesTargeted: {
      primary: ['and maintaining posture during extended games.'],
      secondary: ['Position yourself appropriately for the pulling movement with a stable base and engaged core. Initiate the pull by retracting your shoulder blades'],
    },
  },

  // ==================== SPRINT EXERCISES ====================
  {
    id: toId('S/L Plate RDL to Sprinter Step Up'),
    name: 'S/L Plate RDL to Sprinter Step Up',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('3 Hurdle Step Over to Lateral Step Over Sprint'),
    name: '3 Hurdle Step Over to Lateral Step Over Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Bound to Sprint Drill'),
    name: 'Bound to Sprint Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Figure 8 Drill'),
    name: 'Figure 8 Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Linear COD Sprint Drill'),
    name: 'Linear COD Sprint Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Zig Zag Speed Hurdle'),
    name: 'Lateral Zig Zag Speed Hurdle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Falling Sprint'),
    name: 'Falling Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Bounds'),
    name: 'Bounds',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Slight Incline Speed Bench Press'),
    name: 'Slight Incline Speed Bench Press',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('3 Point Sprint Start'),
    name: '3 Point Sprint Start',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crocodile Breathing'),
    name: 'Crocodile Breathing',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Jump Lunge to Lateral High Knee Speed Ladder'),
    name: 'Jump Lunge to Lateral High Knee Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Mountain Climber to Plank Walk Speed Ladder'),
    name: 'Mountain Climber to Plank Walk Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Drop Squat Speed Ladder'),
    name: 'Drop Squat Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Skater Hop Reactive Ball Drill'),
    name: 'Skater Hop Reactive Ball Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Speed Lunge'),
    name: 'Lateral Speed Lunge',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Barbell Reverse Lunge + Sprinter High Knee'),
    name: 'Barbell Reverse Lunge + Sprinter High Knee',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral 2 Over 1 Back Hurdle Hop'),
    name: 'Lateral 2 Over 1 Back Hurdle Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Triple Hurdle Step COD'),
    name: 'Triple Hurdle Step COD',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('S/L Toe Touch to Power Skater Hop'),
    name: 'S/L Toe Touch to Power Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Reacitve Lateral Hurdle Hop'),
    name: 'Reacitve Lateral Hurdle Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Banded Sprinter Stand'),
    name: 'Banded Sprinter Stand',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Backward Sprint'),
    name: 'Backward Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Ladder Sprint to Hurdle Sprint'),
    name: 'Ladder Sprint to Hurdle Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Pogo Hop to Ladder Sprint'),
    name: 'Pogo Hop to Ladder Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Triple Hurdle Step to Skater Hop'),
    name: 'Triple Hurdle Step to Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Single Step Speed Hurdle'),
    name: 'Single Step Speed Hurdle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crossover Speed Hurdle'),
    name: 'Crossover Speed Hurdle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('2 Step Speed Hurdle'),
    name: '2 Step Speed Hurdle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Double Hurdle Hop'),
    name: 'Double Hurdle Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Triple Hurdle Skater Hop'),
    name: 'Triple Hurdle Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Hurdle Hop to Slide'),
    name: 'Lateral Hurdle Hop to Slide',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Hurdle Hop to Lateral Step'),
    name: 'Hurdle Hop to Lateral Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Speed Skater'),
    name: 'Speed Skater',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crossover Hurdle Hop Speed Ladder'),
    name: 'Crossover Hurdle Hop Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Ickey Shuffle S/L Hop Speed Ladder'),
    name: 'Ickey Shuffle S/L Hop Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('S/L 2 Forward 1 Back Hop Speed Ladder'),
    name: 'S/L 2 Forward 1 Back Hop Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Quarter Turn Jump Speed Ladder'),
    name: 'Quarter Turn Jump Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Side Shuffle'),
    name: 'Side Shuffle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprint'),
    name: 'Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Hop Scotch Speed Ladder'),
    name: 'Hop Scotch Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('S/L High Knee Speed Ladder'),
    name: 'S/L High Knee Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Triple Hurdle Skater Hop'),
    name: 'Triple Hurdle Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Hurdle Hop to Slide'),
    name: 'Lateral Hurdle Hop to Slide',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Hurdle Hop to Lateral Step'),
    name: 'Hurdle Hop to Lateral Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Box Cone Drill'),
    name: 'Box Cone Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('10 Speed Ladder Drills V2'),
    name: '10 Speed Ladder Drills V2',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('10 Speed Ladder Drills V1'),
    name: '10 Speed Ladder Drills V1',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Crossover Speed Ladder'),
    name: 'Lateral Crossover Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral 2 Feet In Speed Ladder'),
    name: 'Lateral 2 Feet In Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Over/Under Speed Ladder'),
    name: 'Over/Under Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Icky Shuffle to Skater Hop Speed Ladder'),
    name: 'Icky Shuffle to Skater Hop Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('River Dance Speed Ladder'),
    name: 'River Dance Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('90 Degree Change of Direction Drill'),
    name: '90 Degree Change of Direction Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crossover/Sprint/Crossover/Sprint'),
    name: 'Crossover/Sprint/Crossover/Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Hurdle Hop'),
    name: 'Lateral Hurdle Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Single Step Speed Ladder'),
    name: 'Single Step Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('2 Feet Forward Speed Ladder'),
    name: '2 Feet Forward Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Pogo Hop Speed Ladder'),
    name: 'Pogo Hop Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('5 Hops + Run Speed Ladder'),
    name: '5 Hops + Run Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('2 Forward + 1 Back Speed Ladder'),
    name: '2 Forward + 1 Back Speed Ladder',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Bounding Hops'),
    name: 'Bounding Hops',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lay Down Sprint Drill'),
    name: 'Lay Down Sprint Drill',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('1-Leg Swing to Skater Hop'),
    name: '1-Leg Swing to Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Half Kneeling Skater Hop'),
    name: 'Half Kneeling Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinter Step to Double High Knee'),
    name: 'Sprinter Step to Double High Knee',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crossover Sprint'),
    name: 'Crossover Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Half Kneeling Lateral Start Sprint'),
    name: 'Half Kneeling Lateral Start Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Super Skater Hop'),
    name: 'Super Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Snap Down Skater Hop'),
    name: 'Snap Down Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Shuttle Sprints'),
    name: 'Shuttle Sprints',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Crossover Skater Hop'),
    name: 'Crossover Skater Hop',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Kneeling Sprint'),
    name: 'Kneeling Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Straight Leg Bounds'),
    name: 'Straight Leg Bounds',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinter Step to High Knee'),
    name: 'Sprinter Step to High Knee',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Weighted Skater Bounds'),
    name: 'Weighted Skater Bounds',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Iso Split Squat/Jump Lunge/Sprinter High Knee'),
    name: 'Iso Split Squat/Jump Lunge/Sprinter High Knee',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Wall Sprint'),
    name: 'Wall Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Pro Shuffle'),
    name: 'Lateral Pro Shuffle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Double High Knee + Reactive Sprint'),
    name: 'Double High Knee + Reactive Sprint',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Double Sprinter Step'),
    name: 'Double Sprinter Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Lateral Carioca (Hip Focus)'),
    name: 'Lateral Carioca (Hip Focus)',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Linear Carioca'),
    name: 'Linear Carioca',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('KB Sprinter Swing'),
    name: 'KB Sprinter Swing',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('The Sprinter'),
    name: 'The Sprinter',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Explosive Inverted Row + Sprinter Step'),
    name: 'Explosive Inverted Row + Sprinter Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Long Bridge Sprinter Step'),
    name: 'Long Bridge Sprinter Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Tempo Sprinter Sit Up'),
    name: 'Tempo Sprinter Sit Up',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Power Bounds'),
    name: 'Power Bounds',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinter Sit Ups'),
    name: 'Sprinter Sit Ups',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Pro Shuttle'),
    name: 'Pro Shuttle',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinters Step Up X High Knee'),
    name: 'Sprinters Step Up X High Knee',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinter Step'),
    name: 'Sprinter Step',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Kneeling Sprinter'),
    name: 'Kneeling Sprinter',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Standing sprint to up/downs'),
    name: 'Standing sprint to up/downs',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },
  {
    id: toId('Sprinter Step to Jump Lunge'),
    name: 'Sprinter Step to Jump Lunge',
    category: 'sprint',
    description: 'agility',
    tips: [
      'and creating angles.',
    ],
    musclesTargeted: {
      primary: ['and change of direction skills needed for breaking to bunkers'],
      secondary: ['evading opponents'],
    },
  },

  // ==================== SQUAT EXERCISES ====================
  {
    id: toId('KB Corkscrew Squat'),
    name: 'KB Corkscrew Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Plate Hold Bench Jump Squat'),
    name: 'Plate Hold Bench Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Banded Landmine Lateral Squat'),
    name: 'Banded Landmine Lateral Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Box Squat'),
    name: 'Box Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining an upright torso. Touch the box briefly without relaxing completely. Drive through your heels to return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart in front of a box or bench. Initiate the squat by sitting back onto the box'],
    },
  },
  {
    id: toId('Ipsilateral Kickstand Squat'),
    name: 'Ipsilateral Kickstand Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('BB Jumping Box Squat'),
    name: 'BB Jumping Box Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining an upright torso. Touch the box briefly without relaxing completely. Drive through your heels to return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart in front of a box or bench. Initiate the squat by sitting back onto the box'],
    },
  },
  {
    id: toId('Elevated Split Squat (ISO Hold)'),
    name: 'Elevated Split Squat (ISO Hold)',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Shin Box Switch to Squat'),
    name: 'Shin Box Switch to Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Front Squat'),
    name: 'Front Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'with elbows high. Stand with feet shoulder-width apart',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Position a barbell across your front shoulders in a front rack position'],
    },
  },
  {
    id: toId('Zercher Squat'),
    name: 'Zercher Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('TRX Jump Squat'),
    name: 'TRX Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Archer Squat to Inch Worm'),
    name: 'Archer Squat to Inch Worm',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('KB Front Rack 1 5 Split Squat'),
    name: 'KB Front Rack 1 5 Split Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Landmine Squat Hold'),
    name: 'Landmine Squat Hold',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Lumberjack Squat'),
    name: 'Lumberjack Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Anterior Loaded Jump Squat'),
    name: 'Anterior Loaded Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Mobility Drill'),
    name: 'Squat Mobility Drill',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Bulgarian Split Squat'),
    name: 'Bulgarian Split Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('OH Squat Assessment'),
    name: 'OH Squat Assessment',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Glute Band Squat Hold'),
    name: 'Glute Band Squat Hold',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Glute Band Hinge Squat'),
    name: 'Glute Band Hinge Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Resistance Band Squat'),
    name: 'Resistance Band Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Pull'),
    name: 'Squat Pull',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Rollout Jump Squat'),
    name: 'Rollout Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Hold Row'),
    name: 'Squat Hold Row',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Step Out Squat'),
    name: 'Step Out Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Walk Out + Spider-Man to Crab Reach'),
    name: 'Squat Walk Out + Spider-Man to Crab Reach',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Typewriter Jump Squat'),
    name: 'Typewriter Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Hold'),
    name: 'Squat Hold',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Jump Lunge X Squat'),
    name: 'Jump Lunge X Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Bulgarian Split Squat Iso Hold'),
    name: 'Bulgarian Split Squat Iso Hold',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Archer Squat'),
    name: 'Archer Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Split Jump Squat'),
    name: 'Split Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Landmine Zercher Bowler Squat'),
    name: 'Landmine Zercher Bowler Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Split Stance Lumberjack Squat'),
    name: 'Split Stance Lumberjack Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Back Squat'),
    name: 'Back Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Kang Squat'),
    name: 'Kang Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Internal Rotation'),
    name: 'Squat Internal Rotation',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Prisoner Squat Hold'),
    name: 'Prisoner Squat Hold',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Jump Squat'),
    name: 'Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Dual KB 1.5 Squat'),
    name: 'Dual KB 1.5 Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('KB Squat Prying'),
    name: 'KB Squat Prying',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Plate Press Squat'),
    name: 'Plate Press Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Elevated Landmine Sumo Squat'),
    name: 'Elevated Landmine Sumo Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Landmine Bulgarian Split Squat with Pause'),
    name: 'Landmine Bulgarian Split Squat with Pause',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Blast Off Squat'),
    name: 'Blast Off Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Zurcher Squat (Bottom/Up)'),
    name: 'Zurcher Squat (Bottom/Up)',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Hold KB Halo'),
    name: 'Squat Hold KB Halo',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Box Squat'),
    name: 'Box Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining an upright torso. Touch the box briefly without relaxing completely. Drive through your heels to return to standing',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart in front of a box or bench. Initiate the squat by sitting back onto the box'],
    },
  },
  {
    id: toId('Explosive KB Front Squat w/ Pause'),
    name: 'Explosive KB Front Squat w/ Pause',
    category: 'squat',
    description: 'diving',
    tips: [
      'with elbows high. Stand with feet shoulder-width apart',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Position a barbell across your front shoulders in a front rack position'],
    },
  },
  {
    id: toId('Cork Screw Squat'),
    name: 'Cork Screw Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squat Finisher'),
    name: 'Squat Finisher',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Bowler Squat'),
    name: 'Bowler Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Barbell Bulgarian Split Squat'),
    name: 'Barbell Bulgarian Split Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'maintaining balance. Keep your torso upright and core engaged. Lower your back knee toward the ground by bending both knees',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Assume a split stance with one foot forward and one foot back'],
    },
  },
  {
    id: toId('Heavy Goblet Squat w/ Pause'),
    name: 'Heavy Goblet Squat w/ Pause',
    category: 'squat',
    description: 'diving',
    tips: [
      'with both hands cupping the weight. Stand with feet slightly wider than shoulder-width',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Hold a kettlebell or dumbbell vertically at chest height'],
    },
  },
  {
    id: toId('Pause DB Squat Jump'),
    name: 'Pause DB Squat Jump',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Goblet Curl'),
    name: 'Goblet Curl',
    category: 'squat',
    description: 'diving',
    tips: [
      'with both hands cupping the weight. Stand with feet slightly wider than shoulder-width',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Hold a kettlebell or dumbbell vertically at chest height'],
    },
  },
  {
    id: toId('S/A DB 1/2 Jump Squats'),
    name: 'S/A DB 1/2 Jump Squats',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Landmine Squat (Heels Elevated)'),
    name: 'Landmine Squat (Heels Elevated)',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Bench Jump Squat'),
    name: 'Bench Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('1/2 Jump Squat'),
    name: '1/2 Jump Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('Squatting Thoracic Stretch'),
    name: 'Squatting Thoracic Stretch',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
  {
    id: toId('DB Explosive 1/2 Squat'),
    name: 'DB Explosive 1/2 Squat',
    category: 'squat',
    description: 'diving',
    tips: [
      'toes turned out slightly. Keep your chest up',
    ],
    musclesTargeted: {
      primary: ['and maintaining a low athletic stance. Essential for quick direction changes and absorbing impact.'],
      secondary: ['Stand with feet shoulder-width apart'],
    },
  },
];
