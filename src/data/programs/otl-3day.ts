import { Program } from '../../types';

export const otl3DaySplit: Program = {
  id: 'otl-3-day-split',
  name: 'OTL 3-Day Split',
  description: 'Off The Leash 3-day full body program',
  daysPerWeek: 3,
  days: [
    // Day 1 - Squat & Press Focus
    {
      id: 'otl-3day-day1',
      dayNumber: 1,
      name: 'Training Day 1',
      focus: 'Squat & Press Focus',
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
              categorySlot: 'PRIMARY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
                { setNumber: 4, targetReps: '5', completed: false },
                { setNumber: 5, targetReps: '5', completed: false },
              ],
              notes: 'Heavy Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_PRESS',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
                { setNumber: 4, targetReps: '8-10', completed: false },
              ],
              notes: 'Heavy Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Horizontal Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'SINGLE_LEG_HINGE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '4',
              isPerSide: true,
              notes: 'Single Leg Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'VERTICAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Vertical Press',
            },
          ],
        },
        {
          name: 'FITNESS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '5A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '5 cal', completed: false },
                { setNumber: 2, targetReps: '5 cal', completed: false },
                { setNumber: 3, targetReps: '5 cal', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Assault Bike, Row, etc.',
            },
            {
              exerciseId: '',
              exerciseSlot: '5B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Core',
            },
          ],
        },
      ],
    },

    // Day 2 - Hinge & Pull Focus
    {
      id: 'otl-3day-day2',
      dayNumber: 2,
      name: 'Training Day 2',
      focus: 'Hinge & Pull Focus',
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
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '5', completed: false },
                { setNumber: 2, targetReps: '5', completed: false },
                { setNumber: 3, targetReps: '5', completed: false },
                { setNumber: 4, targetReps: '5', completed: false },
                { setNumber: 5, targetReps: '5', completed: false },
              ],
              notes: 'Heavy Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
                { setNumber: 4, targetReps: '8-10', completed: false },
              ],
              notes: 'Vertical Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'SINGLE_LEG_HINGE',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
              ],
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Single Leg Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Horizontal Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '4A',
              categorySlot: 'LATERAL_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '4',
              isPerSide: true,
              notes: 'Lateral Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'HORIZONTAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Horizontal Press',
            },
          ],
        },
        {
          name: 'FITNESS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '5A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '5 cal', completed: false },
                { setNumber: 2, targetReps: '5 cal', completed: false },
                { setNumber: 3, targetReps: '5 cal', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Assault Bike, Row, etc.',
            },
            {
              exerciseId: '',
              exerciseSlot: '5B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Core',
            },
          ],
        },
      ],
    },

    // Day 3 - Lunge & Pull Focus
    {
      id: 'otl-3day-day3',
      dayNumber: 3,
      name: 'Training Day 3',
      focus: 'Lunge & Pull Focus',
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
              categorySlot: 'PRIMARY_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
                { setNumber: 2, targetReps: '8', completed: false },
                { setNumber: 3, targetReps: '8', completed: false },
                { setNumber: 4, targetReps: '8', completed: false },
              ],
              isPerSide: true,
              notes: 'Heavy Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'HORIZONTAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
                { setNumber: 4, targetReps: '8-10', completed: false },
              ],
              notes: 'Horizontal Pull',
            },
            {
              exerciseId: '',
              exerciseSlot: '3A',
              categorySlot: 'PRIMARY_HINGE',
              sets: [
                { setNumber: 1, targetReps: '8-10', completed: false },
                { setNumber: 2, targetReps: '8-10', completed: false },
                { setNumber: 3, targetReps: '8-10', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '3B',
              categorySlot: 'VERTICAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '3',
              notes: 'Vertical Press',
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
              categorySlot: 'ACCESSORY_PULL',
              sets: [
                { setNumber: 1, targetReps: '12-15', completed: false },
                { setNumber: 2, targetReps: '12-15', completed: false },
                { setNumber: 3, targetReps: '12-15', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Accessory Pull',
            },
          ],
        },
        {
          name: 'FITNESS',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '5A',
              categorySlot: 'ENERGY_SYSTEM',
              sets: [
                { setNumber: 1, targetReps: '5 cal', completed: false },
                { setNumber: 2, targetReps: '5 cal', completed: false },
                { setNumber: 3, targetReps: '5 cal', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Assault Bike, Row, etc.',
            },
            {
              exerciseId: '',
              exerciseSlot: '5B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '5',
              notes: 'Core',
            },
          ],
        },
      ],
    },
  ],
};
