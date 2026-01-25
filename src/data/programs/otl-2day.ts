import { Program } from '../../types';

export const otl2DaySplit: Program = {
  id: 'otl-2-day-split',
  name: 'OTL 2-Day Split',
  description: 'Off The Leash 2-day full body program for busy schedules',
  daysPerWeek: 2,
  days: [
    // Day 1 - matches OTLmatch PDF exactly
    {
      id: 'otl-2day-day1',
      dayNumber: 1,
      name: 'Training Day 1',
      focus: 'Hinge & Press Focus',
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
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Heavy Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'PRIMARY_PRESS',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Heavy Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '10', completed: false },
                { setNumber: 2, targetReps: '10', completed: false },
                { setNumber: 3, targetReps: '10', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Vertical Pull',
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
                { setNumber: 1, targetReps: '5 cal', completed: false },
                { setNumber: 2, targetReps: '5 cal', completed: false },
                { setNumber: 3, targetReps: '5 cal', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Assault Bike, Row, etc.',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Core',
            },
          ],
        },
      ],
    },

    // Day 2 - matches OTLmatch PDF exactly
    {
      id: 'otl-2day-day2',
      dayNumber: 2,
      name: 'Training Day 2',
      focus: 'Squat & Pull Focus',
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
              categorySlot: 'SINGLE_LEG_HINGE',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '1',
              isPerSide: true,
              notes: 'Single Leg Hinge',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'VERTICAL_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10-12', completed: false },
                { setNumber: 2, targetReps: '10-12', completed: false },
                { setNumber: 3, targetReps: '10-12', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Vertical Press',
            },
            {
              exerciseId: '',
              exerciseSlot: '2A',
              categorySlot: 'PRIMARY_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '2',
              notes: 'Heavy Squat',
            },
            {
              exerciseId: '',
              exerciseSlot: '2B',
              categorySlot: 'SINGLE_ARM_VERTICAL_PULL',
              sets: [
                { setNumber: 1, targetReps: '6-8', completed: false },
                { setNumber: 2, targetReps: '6-8', completed: false },
                { setNumber: 3, targetReps: '6-8', completed: false },
                { setNumber: 4, targetReps: '6-8', completed: false },
              ],
              supersetGroup: '2',
              isPerSide: true,
              notes: 'Single Arm Vertical Pull',
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
              supersetGroup: '3',
              isPerSide: true,
              notes: 'Lateral Lunge',
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
                { setNumber: 1, targetReps: '5 cal', completed: false },
                { setNumber: 2, targetReps: '5 cal', completed: false },
                { setNumber: 3, targetReps: '5 cal', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Assault Bike, Row, etc.',
            },
            {
              exerciseId: '',
              exerciseSlot: '4B',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '15-20', completed: false },
                { setNumber: 2, targetReps: '15-20', completed: false },
                { setNumber: 3, targetReps: '15-20', completed: false },
              ],
              supersetGroup: '4',
              notes: 'Core',
            },
          ],
        },
      ],
    },
  ],
};
