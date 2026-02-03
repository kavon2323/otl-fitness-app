import { Program } from '../../types';

export const bwSpeedTraining: Program = {
  id: 'bw-speed-training',
  name: 'BW Speed Training',
  description: 'Bodyweight speed training program focusing on acceleration and conditioning',
  daysPerWeek: 2,
  useStaticExercises: true, // Don't generate - use exercises as defined
  days: [
    // Session 1
    {
      id: 'bw-speed-session1',
      dayNumber: 1,
      name: 'Session 1',
      focus: 'Linear Speed',
      sections: [
        {
          name: 'DYNAMIC WARM UP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'D1',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'High Knees',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D2',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Bounding Skips',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D3',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Lateral Sprint',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D4',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Carioca',
            },
          ],
        },
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'SPEED_PREP',
              sets: [
                { setNumber: 1, targetReps: '6', completed: false },
                { setNumber: 2, targetReps: '6', completed: false },
                { setNumber: 3, targetReps: '6', completed: false },
              ],
              notes: 'Thigh Pop Wall Drill',
              isPerSide: true,
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'SPEED_PREP',
              sets: [
                { setNumber: 1, targetReps: '4', completed: false },
                { setNumber: 2, targetReps: '4', completed: false },
                { setNumber: 3, targetReps: '4', completed: false },
              ],
              notes: 'Double Pogo Hop to Broad Jump',
            },
          ],
        },
        {
          name: 'SPEED TECHNIQUE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'S1',
              categorySlot: 'SPRINT',
              sets: [
                { setNumber: 1, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 2, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 3, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 4, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
              ],
              notes: 'Roll In Sprint Start',
            },
            {
              exerciseId: '',
              exerciseSlot: 'S2',
              categorySlot: 'SPRINT',
              sets: [
                { setNumber: 1, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 2, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 3, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 4, targetReps: '10yrd Acceleration', completed: false },
              ],
              notes: 'Fall In Sprint Start',
            },
          ],
        },
        {
          name: 'STRENGTH',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: '1A',
              categorySlot: 'BW_SQUAT',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
              ],
              supersetGroup: '1',
              notes: '8 Minute Density Block - cycle through all exercises',
            },
            {
              exerciseId: '',
              exerciseSlot: '1B',
              categorySlot: 'BW_PRESS',
              sets: [
                { setNumber: 1, targetReps: '10-20 seconds', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Push Up Hold',
            },
            {
              exerciseId: '',
              exerciseSlot: '1C',
              categorySlot: 'BW_LUNGE',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
              ],
              supersetGroup: '1',
              isPerSide: true,
              notes: 'Alternating Lateral Lunge',
            },
            {
              exerciseId: '',
              exerciseSlot: '1D',
              categorySlot: 'CORE_VARIATION',
              sets: [
                { setNumber: 1, targetReps: '8', completed: false },
              ],
              supersetGroup: '1',
              notes: 'Reverse Crunch',
            },
          ],
        },
      ],
    },

    // Session 2
    {
      id: 'bw-speed-session2',
      dayNumber: 2,
      name: 'Session 2',
      focus: 'Lateral Speed & Conditioning',
      sections: [
        {
          name: 'DYNAMIC WARM UP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'D1',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Walking RDL',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D2',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Frankenstein Walk',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D3',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Linear Squat Hop',
            },
            {
              exerciseId: '',
              exerciseSlot: 'D4',
              categorySlot: 'DYNAMIC_WARMUP',
              sets: [
                { setNumber: 1, targetReps: '20 yards', completed: false },
                { setNumber: 2, targetReps: '20 yards', completed: false },
                { setNumber: 3, targetReps: '20 yards', completed: false },
              ],
              notes: 'Lateral Monster Step',
            },
          ],
        },
        {
          name: 'PREP',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'P1',
              categorySlot: 'SPEED_PREP',
              sets: [
                { setNumber: 1, targetReps: '15 seconds', completed: false },
                { setNumber: 2, targetReps: '15 seconds', completed: false },
                { setNumber: 3, targetReps: '15 seconds', completed: false },
              ],
              notes: 'Lateral High Knee',
            },
            {
              exerciseId: '',
              exerciseSlot: 'P2',
              categorySlot: 'SPEED_PREP',
              sets: [
                { setNumber: 1, targetReps: '4', completed: false },
                { setNumber: 2, targetReps: '4', completed: false },
                { setNumber: 3, targetReps: '4', completed: false },
              ],
              isPerSide: true,
              notes: 'Lateral Hop Reactive Prep',
            },
          ],
        },
        {
          name: 'SPEED TECHNIQUE',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'S1',
              categorySlot: 'SPRINT',
              sets: [
                { setNumber: 1, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 2, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 3, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
                { setNumber: 4, targetReps: '5yrd Roll In + 10yrd Accel', completed: false },
              ],
              notes: 'Lateral Roll In Sprint Start',
            },
            {
              exerciseId: '',
              exerciseSlot: 'S2',
              categorySlot: 'SPRINT',
              sets: [
                { setNumber: 1, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 2, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 3, targetReps: '10yrd Acceleration', completed: false },
                { setNumber: 4, targetReps: '10yrd Acceleration', completed: false },
              ],
              notes: 'Lateral Half Kneeling Sprint Start',
            },
          ],
        },
        {
          name: 'CONDITIONING',
          exercises: [
            {
              exerciseId: '',
              exerciseSlot: 'C1',
              categorySlot: 'CONDITIONING',
              sets: [
                { setNumber: 1, targetReps: '10x10', completed: false, restSeconds: 120 },
                { setNumber: 2, targetReps: '10x10', completed: false, restSeconds: 120 },
                { setNumber: 3, targetReps: '10x10', completed: false },
              ],
              notes: '10x10 Drill - 3 Rounds with 2 min rest between rounds',
            },
          ],
        },
      ],
    },
  ],
};
