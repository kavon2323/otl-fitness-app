import { Program, ProgramType } from '../../types';
import { otl4DaySplit } from './otl-4day';
import { otl3DaySplit } from './otl-3day';
import { otl2DaySplit } from './otl-2day';
import { bwSpeedTraining } from './bw-speed-training';
import { mvt1SpeedTraining } from './mvt-1-speed';
import { mvt2Mvmnt } from './mvt-2-mvmnt';
import { mobilityDaily } from './mobility-daily';

// Export all individual programs
export {
  otl4DaySplit,
  otl3DaySplit,
  otl2DaySplit,
  bwSpeedTraining,
  mvt1SpeedTraining,
  mvt2Mvmnt,
  mobilityDaily,
};

// Combined array of all available programs
export const allPrograms: Program[] = [
  otl4DaySplit,
  otl3DaySplit,
  otl2DaySplit,
  bwSpeedTraining,
  mvt1SpeedTraining,
  mvt2Mvmnt,
  mobilityDaily,
];

// Helper function to get program by ID
export const getProgramById = (id: string): Program | undefined => {
  return allPrograms.find(program => program.id === id);
};

// Helper function to get programs by days per week
export const getProgramsByDaysPerWeek = (days: number): Program[] => {
  return allPrograms.filter(program => program.daysPerWeek === days);
};

// Helper function to get programs by type
export const getProgramsByType = (type: ProgramType): Program[] => {
  return allPrograms.filter(program => (program.programType || 'strength') === type);
};

// Helper function to get strength programs by days per week
export const getStrengthProgramsByDaysPerWeek = (days: number): Program[] => {
  return allPrograms.filter(
    program => program.daysPerWeek === days && (program.programType || 'strength') === 'strength'
  );
};

// Helper function to get mobility programs
export const getMobilityPrograms = (): Program[] => {
  return allPrograms.filter(program => program.programType === 'mobility');
};
