import { Program } from '../../types';

export const mvt2Mvmnt: Program = {
  id: 'mvt-2-mvmnt-p2',
  name: 'MVT 2 - MVMNT P.2',
  description: 'Movement Training Phase 2 - 4-day program with Pull, Push, Lower and Upper focus',
  daysPerWeek: 4,
  useStaticExercises: true, // Don't generate - use exercises as defined
  days: [
    // Session 1: Pull Focus
    {
      id: 'mvt2-session1',
      dayNumber: 1,
      name: 'Session 1',
      focus: 'Pull Focus',
      sections: [
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
              ],
              isPerSide: true,
              notes: 'S/L Toe Touch + Alt High Knee',
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '6', completed: false },
              ],
              notes: 'KB Deadlift Hop',
            },
          ],
        },
        {
          name: 'PULL FOCUS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
                { setNumber: 4, targetReps: '8', completed: false },
              ],
              notes: 'Trap Bar RDL',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
              ],
              isPerSide: true,
              notes: 'Plyo Spiderman Lunge + Hamstring Curl',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              supersetGroup: '2',
              notes: 'DB Drop Lunge + Step Up',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '2',
              notes: 'DB 1.5 Bench Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'LATERAL_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Goblet Lateral Lunge w/ Slide',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '6', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Alt Hamstring ISO Bridge',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '6', completed: false },
              ],
              supersetGroup: '4',
              notes: 'DB Plank Row',
            },
            {
              exerciseId: '',
              exerciseSlot: '4C',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '4', completed: false },
                { setNumber: 2, targetReps: '4', completed: false },
                { setNumber: 3, targetReps: '4', completed: false },
              ],
              supersetGroup: '4',
              isPerSide: true,
              notes: 'Squat Hold + DB Snap Shot',
            },
          ],
        },
      ],
    },

    // Session 2: Push Focus
    {
      id: 'mvt2-session2',
      dayNumber: 2,
      name: 'Session 2',
      focus: 'Push Focus',
      sections: [
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
              ],
              notes: 'Double Pogo Hop + Broad Jump',
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              notes: 'Plyo Push Up',
            },
          ],
        },
        {
          name: 'PUSH FOCUS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
                { setNumber: 4, targetReps: '5', completed: false },
                { setNumber: 5, targetReps: '5', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Tempo Back Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
              ],
              supersetGroup: '1',
              notes: 'S/L Wall Thoracic Rotations',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              supersetGroup: '2',
              notes: 'KOT Lunge (Heel Elevated)',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '2',
              isPerSide: true,
              notes: 'S/A Neutral Grip DB Bench Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'ISO_HOLD',
              sets: [
                { setNumber: 1, targetReps: '35 seconds', completed: false },
                { setNumber: 2, targetReps: '35 seconds', completed: false },
                { setNumber: 3, targetReps: '35 seconds', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Push Up Hold',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'ACCESSORY_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '3',
              notes: 'DB 1.5 Lateral Raise',
            },
            {
              exerciseId: '',
              exerciseSlot: '3C',
              categorySlot: 'ACCESSORY_PULL',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Floating Heel S/S ISO + Face Pull w/ Plate',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '35 seconds', completed: false },
                { setNumber: 2, targetReps: '35 seconds', completed: false },
                { setNumber: 3, targetReps: '35 seconds', completed: false },
              ],
              supersetGroup: '4',
              isPerSide: true,
              notes: 'Rock In Spiderman Lunge + Lizard',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '35 seconds', completed: false },
                { setNumber: 2, targetReps: '35 seconds', completed: false },
                { setNumber: 3, targetReps: '35 seconds', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Bridge w/ Reach',
            },
            {
              exerciseId: '',
              exerciseSlot: '4C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '35 seconds', completed: false },
                { setNumber: 2, targetReps: '35 seconds', completed: false },
                { setNumber: 3, targetReps: '35 seconds', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Squat Pry + Archer',
            },
          ],
        },
      ],
    },

    // Session 3: Lower Body Dynamic
    {
      id: 'mvt2-session3',
      dayNumber: 3,
      name: 'Session 3',
      focus: 'Lower Body (Dynamic)',
      sections: [
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
              ],
              isPerSide: true,
              notes: 'Hip Flexor Rock Back',
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              notes: 'Tall Kneeling Slam',
            },
          ],
        },
        {
          name: 'LOWER BODY (DYNAMIC)',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
                { setNumber: 4, targetReps: '3', completed: false },
              ],
              supersetGroup: '1',
              isPerSide: true,
              notes: 'Staggered Stance Trap Bar DL (Velocity)',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'PLYOMETRIC',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
                { setNumber: 4, targetReps: '3', completed: false },
              ],
              supersetGroup: '1',
              isPerSide: true,
              notes: 'Half Kneeling Box Jump',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Bulgarian Split Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'ACCESSORY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '3',
              notes: 'BB Hip Thrust',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '25 seconds', completed: false },
                { setNumber: 2, targetReps: '25 seconds', completed: false },
                { setNumber: 3, targetReps: '25 seconds', completed: false },
              ],
              supersetGroup: '3',
              notes: 'KB Adductor Plank',
            },
            {
              exerciseId: '',
              exerciseSlot: '3C',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '12', completed: false },
                { setNumber: 2, targetReps: '12', completed: false },
                { setNumber: 3, targetReps: '12', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Med Ball Reverse Crunch',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '3 min AMCAP', completed: false },
              ],
              notes: 'Assault Bike - As Many Calories As Possible',
            },
          ],
        },
      ],
    },

    // Session 4: Upper Body Dynamic
    {
      id: 'mvt2-session4',
      dayNumber: 4,
      name: 'Session 4',
      focus: 'Upper Body (Dynamic)',
      sections: [
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '7 per movement', completed: false },
                { setNumber: 2, targetReps: '7 per movement', completed: false },
                { setNumber: 3, targetReps: '7 per movement', completed: false },
              ],
              notes: 'Shoulder Protocol',
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'PREP',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
              ],
              isPerSide: true,
              notes: 'Step Through Upper Cuts',
            },
          ],
        },
        {
          name: 'UPPER BODY (DYNAMIC)',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '4 (5 count max effort)', completed: false },
                { setNumber: 2, targetReps: '4 (5 count max effort)', completed: false },
                { setNumber: 3, targetReps: '4 (5 count max effort)', completed: false },
                { setNumber: 4, targetReps: '4 (5 count max effort)', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Overcoming Bench Press ISO',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
                { setNumber: 4, targetReps: '8', completed: false },
              ],
              supersetGroup: '1',
              notes: 'BB Explosive Inverted Row',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
              ],
              supersetGroup: '1',
              isPerSide: true,
              notes: 'Shoulder ER Abduction PAILS & RAILS',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'ROTATIONAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '2',
              isPerSide: true,
              notes: 'Landmine Rotational Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '12', completed: false },
                { setNumber: 2, targetReps: '12', completed: false },
                { setNumber: 3, targetReps: '12', completed: false },
              ],
              supersetGroup: '2',
              notes: 'DB Low/High Chop (Hip Restricted)',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '15', completed: false },
                { setNumber: 2, targetReps: '15', completed: false },
                { setNumber: 3, targetReps: '15', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Cable Lat Pulldown',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'ACCESSORY_PULL',
              sets: [
                { setNumber: 1, targetReps: '12', completed: false },
                { setNumber: 2, targetReps: '12', completed: false },
                { setNumber: 3, targetReps: '12', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Warbird Variation',
            },
            {
              exerciseId: '',
              exerciseSlot: '3C',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '7', completed: false },
                { setNumber: 2, targetReps: '7', completed: false },
                { setNumber: 3, targetReps: '7', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'BB Hang Deadbug',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'LOADED_CARRY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
                { setNumber: 2, targetReps: '45 seconds', completed: false },
                { setNumber: 3, targetReps: '45 seconds', completed: false },
              ],
              notes: 'S/A KB Front Rack Walk',
            },
          ],
        },
      ],
    },
  ],
};
