import { Program } from '../../types';
import { otl4DaySplit } from './otl-4day';
import { otl3DaySplit } from './otl-3day';
import { otl2DaySplit } from './otl-2day';
import { bwSpeedTraining } from './bw-speed-training';
import { mvt1SpeedTraining } from './mvt-1-speed';
import { mvt2Mvmnt } from './mvt-2-mvmnt';

// Export all individual programs
export {
  otl4DaySplit,
  otl3DaySplit,
  otl2DaySplit,
  bwSpeedTraining,
  mvt1SpeedTraining,
  mvt2Mvmnt,
};

// Combined array of all available programs
export const allPrograms: Program[] = [
  otl4DaySplit,
  otl3DaySplit,
  otl2DaySplit,
  bwSpeedTraining,
  mvt1SpeedTraining,
  mvt2Mvmnt,
];

// Helper function to get program by ID
export const getProgramById = (id: string): Program | undefined => {
  return allPrograms.find(program => program.id === id);
};

// Helper function to get programs by days per week
export const getProgramsByDaysPerWeek = (days: number): Program[] => {
  return allPrograms.filter(program => program.daysPerWeek === days);
};
