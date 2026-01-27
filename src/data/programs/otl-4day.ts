import { Program } from '../../types';

export const otl4DaySplit: Program = {
  id: 'otl-4-day-split',
  name: 'OTL 4-Day Split',
  description: 'Off The Leash 4-day program with Lower/Upper Max Effort and Dynamic days',
  daysPerWeek: 4,
  days: [
    // Day 1: Lower Body Max Effort
    {
      id: 'otl-4day-day1',
      dayNumber: 1,
      name: 'Training Day 1',
      focus: 'Lower Body Max Effort',
      sections: [
        {
          name: 'ACTIVATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'A1',
              categorySlot: 'WALKING_RDL',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Walking RDL',
            },
            {
              exerciseId: '',
              exerciseSlot: 'A2',
              categorySlot: 'PLYO_JUMP',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'S/L Plyo Box Jumps',
            },
          ],
        },
        {
          name: 'STRENGTH',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '4RM', completed: false },
                { setNumber: 2, targetReps: '4RM', completed: false },
                { setNumber: 3, targetReps: '4RM', completed: false },
                { setNumber: 4, targetReps: '4RM', completed: false },
              ],
              notes: 'Heavy Hinge - Ramp to 4RM',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              isPerSide: true,
              notes: 'Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'SINGLE_LEG_HINGE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              isPerSide: true,
              notes: 'Single Leg Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'ACCESSORY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              notes: 'Accessory Squat',
            },
          ],
        },
        {
          name: 'CORE FINISHER',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '5A',
              categorySlot: 'ISO_HOLD',
              sets: [
                { setNumber: 1, targetReps: '25 seconds', completed: false },
                { setNumber: 2, targetReps: '25 seconds', completed: false },
                { setNumber: 3, targetReps: '25 seconds', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Plank ISO Hold',
            },
            {
              exerciseId: '',
              exerciseSlot: '5B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Core',
            },
          ],
        },
      ],
    },

    // Day 2: Upper Body Max Effort
    {
      id: 'otl-4day-day2',
      dayNumber: 2,
      name: 'Training Day 2',
      focus: 'Upper Body Max Effort',
      sections: [
        {
          name: 'ACTIVATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'A1',
              categorySlot: 'HIP_FLEXOR_PREP',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Hip Flexor Curls',
            },
            {
              exerciseId: '',
              exerciseSlot: 'A2',
              categorySlot: 'PLYO_PUSH',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Plyo Push Up',
            },
          ],
        },
        {
          name: 'STRENGTH',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_PRESS',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '4', completed: false },
                { setNumber: 4, targetReps: '4', completed: false },
              ],
              notes: 'Heavy Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Horizontal Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
                { setNumber: 4, targetReps: '8-10', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Horizontal Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'VERTICAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Vertical Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Vertical Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3C',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Core',
            },
          ],
        },
        {
          name: 'FITNESS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '6 min (20s work/20s rest)', completed: false },
              ],
              notes: 'Assault Bike, Row, Treadmill, etc.',
            },
          ],
        },
      ],
    },

    // Day 3: Lower Body Dynamic Effort
    {
      id: 'otl-4day-day3',
      dayNumber: 3,
      name: 'Training Day 3',
      focus: 'Lower Body Dynamic Effort',
      sections: [
        {
          name: 'ACTIVATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'A1',
              categorySlot: 'HIP_FLEXOR_PREP',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Hip Flexor Rock Back',
            },
            {
              exerciseId: '',
              exerciseSlot: 'A2',
              categorySlot: 'PLYO_JUMP',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Box Jumps',
            },
          ],
        },
        {
          name: 'STRENGTH',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'PRIMARY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '3', completed: false },
                { setNumber: 2, targetReps: '3', completed: false },
                { setNumber: 3, targetReps: '3', completed: false },
                { setNumber: 4, targetReps: '3', completed: false },
                { setNumber: 5, targetReps: '3', completed: false },
                { setNumber: 6, targetReps: '3', completed: false },
              ],
              notes: 'Squat - Velocity Focus',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              notes: 'Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'LATERAL_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
              ],
              isPerSide: true,
              notes: 'Lateral Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'ACCESSORY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Accessory Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'ACCESSORY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '4',
              isPerSide: true,
              notes: 'Accessory Hinge',
            },
          ],
        },
        {
          name: 'CORE FINISHER',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '5A',
              categorySlot: 'STABILIZATION_CORE',
              sets: [
                { setNumber: 1, targetReps: '35 seconds', completed: false },
                { setNumber: 2, targetReps: '35 seconds', completed: false },
                { setNumber: 3, targetReps: '35 seconds', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Side Plank',
            },
            {
              exerciseId: '',
              exerciseSlot: '5B',
              categorySlot: 'WEIGHTED_CORE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Weighted Core',
            },
          ],
        },
      ],
    },

    // Day 4: Upper Body Dynamic Effort
    {
      id: 'otl-4day-day4',
      dayNumber: 4,
      name: 'Training Day 4',
      focus: 'Upper Body Dynamic Effort',
      sections: [
        {
          name: 'ACTIVATION',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'A1',
              categorySlot: 'WALKING_RDL',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Walking RDL',
            },
            {
              exerciseId: '',
              exerciseSlot: 'A2',
              categorySlot: 'PLYO_PUSH',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
              ],
              supersetGroup: 'A',
              notes: 'Plyo Push Up',
            },
          ],
        },
        {
          name: 'STRENGTH',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'VERTICAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '4', completed: false },
                { setNumber: 2, targetReps: '4', completed: false },
                { setNumber: 3, targetReps: '4', completed: false },
                { setNumber: 4, targetReps: '4', completed: false },
                { setNumber: 5, targetReps: '4', completed: false },
                { setNumber: 6, targetReps: '4', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Vertical Press - Velocity Focus',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'ACCESSORY_PULL',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '6', completed: false },
                { setNumber: 4, targetReps: '6', completed: false },
                { setNumber: 5, targetReps: '6', completed: false },
                { setNumber: 6, targetReps: '6', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Upper Body Prep Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Horizontal Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
                { setNumber: 4, targetReps: '8-10', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Horizontal Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'SINGLE_ARM_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Single Arm Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'SINGLE_ARM_VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Single Arm Vertical Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3C',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Core',
            },
          ],
        },
        {
          name: 'FITNESS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '6 min @ 145-155 BPM', completed: false },
              ],
              notes: 'Assault Bike, Row, Treadmill, etc.',
            },
          ],
        },
      ],
    },
  ],
};
