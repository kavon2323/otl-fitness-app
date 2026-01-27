import { Program } from '../../types';

export const mobilityDaily: Program = {
  id: 'mobility-daily',
  name: 'Daily Mobility',
  description: 'A 15-20 minute daily mobility routine to improve range of motion, reduce injury risk, and enhance recovery. Perfect for mornings or post-workout.',
  daysPerWeek: 7,
  programType: 'mobility',
  days: [
    // Day 1: Lower Body Focus
    {
      id: 'mobility-day1',
      dayNumber: 1,
      name: 'Day 1',
      focus: 'Lower Body Mobility',
      sections: [
        {
          name: 'HIP MOBILITY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              isPerSide: true,
              notes: '90/90 Hip Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Hip CARs (Controlled Articular Rotations)',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Pigeon Stretch',
            },
          ],
        },
        {
          name: 'ANKLE & KNEE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Ankle CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Deep Squat Hold',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Half Kneeling Hip Flexor Stretch',
            },
          ],
        },
        {
          name: 'HAMSTRINGS & GLUTES',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Standing Hamstring Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              notes: 'Glute Bridge with Hold',
            },
          ],
        },
      ],
    },

    // Day 2: Upper Body Focus
    {
      id: 'mobility-day2',
      dayNumber: 2,
      name: 'Day 2',
      focus: 'Upper Body Mobility',
      sections: [
        {
          name: 'SHOULDER MOBILITY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Shoulder CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Doorway Pec Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              notes: 'Wall Slides',
            },
          ],
        },
        {
          name: 'THORACIC SPINE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Thread the Needle',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Cat-Cow Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Open Book Stretch',
            },
          ],
        },
        {
          name: 'NECK & TRAPS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
              ],
              notes: 'Neck CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '30 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Upper Trap Stretch',
            },
          ],
        },
      ],
    },

    // Day 3: Full Body Flow
    {
      id: 'mobility-day3',
      dayNumber: 3,
      name: 'Day 3',
      focus: 'Full Body Flow',
      sections: [
        {
          name: 'FLOW SEQUENCE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '5 cycles', completed: false },
              ],
              notes: 'Sun Salutation Flow',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'World\'s Greatest Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              notes: 'Inchworm',
            },
          ],
        },
        {
          name: 'SPINAL MOBILITY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Lying Spinal Twist',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Child\'s Pose',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              notes: 'Cobra Stretch',
            },
          ],
        },
        {
          name: 'ACTIVE RECOVERY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Frog Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '2 minutes', completed: false },
              ],
              notes: 'Diaphragmatic Breathing',
            },
          ],
        },
      ],
    },

    // Day 4: Paintball-Specific
    {
      id: 'mobility-day4',
      dayNumber: 4,
      name: 'Day 4',
      focus: 'Paintball Performance',
      sections: [
        {
          name: 'HIP INTERNAL ROTATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              isPerSide: true,
              notes: '90/90 Internal Rotation Bias',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Adductor Rock Back',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Tactical Frog Pulses',
            },
          ],
        },
        {
          name: 'LOW POSITION PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              notes: 'Deep Squat Pry',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Spiderman Lunge with Rotation',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Kneeling Hip Flexor with Reach',
            },
          ],
        },
        {
          name: 'ROTATION & SNAP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Standing Rotation Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Thoracic Rotation in Side Lying',
            },
          ],
        },
      ],
    },

    // Day 5: Recovery & Restoration
    {
      id: 'mobility-day5',
      dayNumber: 5,
      name: 'Day 5',
      focus: 'Recovery & Restoration',
      sections: [
        {
          name: 'GENTLE STRETCHING',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '90 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Figure 4 Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Lying Hamstring Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Quad Stretch (Side Lying)',
            },
          ],
        },
        {
          name: 'RELAXATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '90 seconds', completed: false },
              ],
              notes: 'Legs Up Wall',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '3 minutes', completed: false },
              ],
              notes: 'Savasana with Box Breathing',
            },
          ],
        },
      ],
    },

    // Day 6: Lower Body Focus (repeat)
    {
      id: 'mobility-day6',
      dayNumber: 6,
      name: 'Day 6',
      focus: 'Lower Body Mobility',
      sections: [
        {
          name: 'HIP MOBILITY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              isPerSide: true,
              notes: '90/90 Hip Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Hip CARs (Controlled Articular Rotations)',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Pigeon Stretch',
            },
          ],
        },
        {
          name: 'ANKLE & KNEE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Ankle CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Deep Squat Hold',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Half Kneeling Hip Flexor Stretch',
            },
          ],
        },
        {
          name: 'HAMSTRINGS & GLUTES',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Standing Hamstring Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              notes: 'Glute Bridge with Hold',
            },
          ],
        },
      ],
    },

    // Day 7: Upper Body Focus (repeat)
    {
      id: 'mobility-day7',
      dayNumber: 7,
      name: 'Day 7',
      focus: 'Upper Body Mobility',
      sections: [
        {
          name: 'SHOULDER MOBILITY',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Shoulder CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Doorway Pec Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              notes: 'Wall Slides',
            },
          ],
        },
        {
          name: 'THORACIC SPINE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
              ],
              isPerSide: true,
              notes: 'Thread the Needle',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '60 seconds', completed: false },
              ],
              notes: 'Cat-Cow Stretch',
            },
            {
              exerciseId: '',
              exerciseSlot: '2C',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '45 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Open Book Stretch',
            },
          ],
        },
        {
          name: 'NECK & TRAPS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
              ],
              notes: 'Neck CARs',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'MOBILITY',
              sets: [
                { setNumber: 1, targetReps: '30 seconds', completed: false },
              ],
              isPerSide: true,
              notes: 'Upper Trap Stretch',
            },
          ],
        },
      ],
    },
  ],
};
