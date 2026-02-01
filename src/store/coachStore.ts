import { create } from 'zustand';
import {
  UserProfile,
  UserRole,
  CoachClient,
  CustomProgram,
  ProgramAssignment,
  Program,
  WorkoutDay,
  WorkoutSection,
  WorkoutExercise,
} from '../types';
import {
  ExtendedUserProfile,
  fetchUserProfile,
  fetchCoachClients,
  fetchCoachPrograms,
  fetchProgramAssignments,
  fetchClientAssignments,
  createCustomProgram,
  updateCustomProgram,
  deleteCustomProgram,
  assignProgramToClients,
  updateClientStatus,
  cancelAssignment,
} from '../lib/coachApi';

interface ProgramBuilderState {
  name: string;
  description: string;
  daysPerWeek: number;
  days: WorkoutDay[];
  currentDayIndex: number;
}

interface CoachState {
  // User info
  userProfile: ExtendedUserProfile | null;
  isCoach: boolean;

  // Coach data
  clients: CoachClient[];
  programs: CustomProgram[];
  assignments: ProgramAssignment[];

  // Client data (for clients viewing their assigned programs)
  clientAssignments: ProgramAssignment[];

  // Loading states
  isLoading: boolean;
  isLoadingClients: boolean;
  isLoadingPrograms: boolean;
  isLoadingAssignments: boolean;

  // Program builder state
  programBuilder: ProgramBuilderState;
  isEditingProgram: string | null; // programId if editing, null if creating new

  // Actions - Profile
  loadUserProfile: (userId: string) => Promise<void>;
  clearProfile: () => void;

  // Actions - Coach Data
  loadCoachData: (coachId: string) => Promise<void>;
  refreshClients: (coachId: string) => Promise<void>;
  refreshPrograms: (coachId: string) => Promise<void>;
  refreshAssignments: (coachId: string) => Promise<void>;

  // Actions - Client Management
  updateClient: (
    relationshipId: string,
    status: CoachClient['status'],
    notes?: string
  ) => Promise<boolean>;

  // Actions - Program Management
  createProgram: (coachId: string) => Promise<CustomProgram | null>;
  saveProgram: (programId: string) => Promise<boolean>;
  removeProgram: (programId: string) => Promise<boolean>;

  // Actions - Program Builder
  initNewProgram: (daysPerWeek: number) => void;
  editProgram: (program: CustomProgram) => void;
  setProgramName: (name: string) => void;
  setProgramDescription: (description: string) => void;
  setCurrentDayIndex: (index: number) => void;
  updateDay: (dayIndex: number, day: WorkoutDay) => void;
  addSection: (dayIndex: number, section: WorkoutSection) => void;
  updateSection: (dayIndex: number, sectionIndex: number, section: WorkoutSection) => void;
  removeSection: (dayIndex: number, sectionIndex: number) => void;
  addExerciseToSection: (
    dayIndex: number,
    sectionIndex: number,
    exercise: WorkoutExercise
  ) => void;
  updateExerciseInSection: (
    dayIndex: number,
    sectionIndex: number,
    exerciseIndex: number,
    exercise: WorkoutExercise
  ) => void;
  removeExerciseFromSection: (
    dayIndex: number,
    sectionIndex: number,
    exerciseIndex: number
  ) => void;
  setSupersetGroup: (
    dayIndex: number,
    sectionIndex: number,
    exerciseIndices: number[],
    groupId: string
  ) => void;
  clearProgramBuilder: () => void;

  // Actions - Assignments
  assignProgram: (
    coachId: string,
    programId: string,
    clientIds: string[],
    startDate?: string,
    notes?: string
  ) => Promise<boolean>;
  cancelClientAssignment: (assignmentId: string) => Promise<boolean>;

  // Actions - Client View
  loadClientAssignments: (clientId: string) => Promise<void>;
}

const createEmptyDay = (dayNumber: number): WorkoutDay => ({
  id: `day-${dayNumber}-${Date.now()}`,
  dayNumber,
  name: `Day ${dayNumber}`,
  focus: '',
  sections: [],
});

const createEmptyProgramBuilder = (daysPerWeek: number): ProgramBuilderState => ({
  name: '',
  description: '',
  daysPerWeek,
  days: Array.from({ length: daysPerWeek }, (_, i) => createEmptyDay(i + 1)),
  currentDayIndex: 0,
});

export const useCoachStore = create<CoachState>((set, get) => ({
  // Initial state
  userProfile: null,
  isCoach: false,
  clients: [],
  programs: [],
  assignments: [],
  clientAssignments: [],
  isLoading: false,
  isLoadingClients: false,
  isLoadingPrograms: false,
  isLoadingAssignments: false,
  programBuilder: createEmptyProgramBuilder(3),
  isEditingProgram: null,

  // Profile Actions
  loadUserProfile: async (userId: string) => {
    set({ isLoading: true });
    const profile = await fetchUserProfile(userId);
    set({
      userProfile: profile,
      isCoach: profile?.role === 'coach' || profile?.role === 'admin',
      isLoading: false,
    });
  },

  clearProfile: () => {
    set({
      userProfile: null,
      isCoach: false,
      clients: [],
      programs: [],
      assignments: [],
      clientAssignments: [],
    });
  },

  // Coach Data Actions
  loadCoachData: async (coachId: string) => {
    set({ isLoading: true });
    const [clients, programs, assignments] = await Promise.all([
      fetchCoachClients(coachId),
      fetchCoachPrograms(coachId),
      fetchProgramAssignments(coachId),
    ]);
    set({
      clients,
      programs,
      assignments,
      isLoading: false,
    });
  },

  refreshClients: async (coachId: string) => {
    set({ isLoadingClients: true });
    const clients = await fetchCoachClients(coachId);
    set({ clients, isLoadingClients: false });
  },

  refreshPrograms: async (coachId: string) => {
    set({ isLoadingPrograms: true });
    const programs = await fetchCoachPrograms(coachId);
    set({ programs, isLoadingPrograms: false });
  },

  refreshAssignments: async (coachId: string) => {
    set({ isLoadingAssignments: true });
    const assignments = await fetchProgramAssignments(coachId);
    set({ assignments, isLoadingAssignments: false });
  },

  // Client Management
  updateClient: async (relationshipId, status, notes) => {
    const success = await updateClientStatus(relationshipId, status, notes);
    if (success) {
      set((state) => ({
        clients: state.clients.map((c) =>
          c.id === relationshipId ? { ...c, status, notes } : c
        ),
      }));
    }
    return success;
  },

  // Program Management
  createProgram: async (coachId: string) => {
    const { programBuilder } = get();
    const programData: Program = {
      id: `custom-${Date.now()}`,
      name: programBuilder.name,
      description: programBuilder.description,
      daysPerWeek: programBuilder.daysPerWeek,
      days: programBuilder.days,
      createdAt: new Date().toISOString(),
    };

    const program = await createCustomProgram(
      coachId,
      programBuilder.name,
      programBuilder.description || undefined,
      programBuilder.daysPerWeek,
      programData,
      false
    );

    if (program) {
      set((state) => ({
        programs: [program, ...state.programs],
      }));
      get().clearProgramBuilder();
    }

    return program;
  },

  saveProgram: async (programId: string) => {
    const { programBuilder } = get();
    const programData: Program = {
      id: programId,
      name: programBuilder.name,
      description: programBuilder.description,
      daysPerWeek: programBuilder.daysPerWeek,
      days: programBuilder.days,
    };

    const success = await updateCustomProgram(programId, {
      name: programBuilder.name,
      description: programBuilder.description || undefined,
      daysPerWeek: programBuilder.daysPerWeek,
      programData,
    });

    if (success) {
      set((state) => ({
        programs: state.programs.map((p) =>
          p.id === programId
            ? {
                ...p,
                name: programBuilder.name,
                description: programBuilder.description,
                daysPerWeek: programBuilder.daysPerWeek,
                programData,
                updatedAt: new Date().toISOString(),
              }
            : p
        ),
      }));
    }

    return success;
  },

  removeProgram: async (programId: string) => {
    const success = await deleteCustomProgram(programId);
    if (success) {
      set((state) => ({
        programs: state.programs.filter((p) => p.id !== programId),
      }));
    }
    return success;
  },

  // Program Builder Actions
  initNewProgram: (daysPerWeek: number) => {
    set({
      programBuilder: createEmptyProgramBuilder(daysPerWeek),
      isEditingProgram: null,
    });
  },

  editProgram: (program: CustomProgram) => {
    // Safely access programData with fallback to empty structure
    const programData = program.programData || { days: [] };
    const days = programData.days || [];

    set({
      programBuilder: {
        name: program.name,
        description: program.description || '',
        daysPerWeek: program.daysPerWeek || days.length,
        days: days.length > 0 ? days : Array.from({ length: program.daysPerWeek || 3 }, (_, i) => createEmptyDay(i + 1)),
        currentDayIndex: 0,
      },
      isEditingProgram: program.id,
    });
  },

  setProgramName: (name: string) => {
    set((state) => ({
      programBuilder: { ...state.programBuilder, name },
    }));
  },

  setProgramDescription: (description: string) => {
    set((state) => ({
      programBuilder: { ...state.programBuilder, description },
    }));
  },

  setCurrentDayIndex: (index: number) => {
    set((state) => ({
      programBuilder: { ...state.programBuilder, currentDayIndex: index },
    }));
  },

  updateDay: (dayIndex: number, day: WorkoutDay) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      days[dayIndex] = day;
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  addSection: (dayIndex: number, section: WorkoutSection) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      days[dayIndex] = {
        ...days[dayIndex],
        sections: [...days[dayIndex].sections, section],
      };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  updateSection: (dayIndex: number, sectionIndex: number, section: WorkoutSection) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = [...days[dayIndex].sections];
      sections[sectionIndex] = section;
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  removeSection: (dayIndex: number, sectionIndex: number) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = days[dayIndex].sections.filter((_, i) => i !== sectionIndex);
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  addExerciseToSection: (dayIndex, sectionIndex, exercise) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = [...days[dayIndex].sections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        exercises: [...sections[sectionIndex].exercises, exercise],
      };
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  updateExerciseInSection: (dayIndex, sectionIndex, exerciseIndex, exercise) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = [...days[dayIndex].sections];
      const exercises = [...sections[sectionIndex].exercises];
      exercises[exerciseIndex] = exercise;
      sections[sectionIndex] = { ...sections[sectionIndex], exercises };
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  removeExerciseFromSection: (dayIndex, sectionIndex, exerciseIndex) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = [...days[dayIndex].sections];
      const exercises = sections[sectionIndex].exercises.filter(
        (_, i) => i !== exerciseIndex
      );
      sections[sectionIndex] = { ...sections[sectionIndex], exercises };
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  setSupersetGroup: (dayIndex, sectionIndex, exerciseIndices, groupId) => {
    set((state) => {
      const days = [...state.programBuilder.days];
      const sections = [...days[dayIndex].sections];
      const exercises = sections[sectionIndex].exercises.map((ex, i) => {
        if (exerciseIndices.includes(i)) {
          return { ...ex, supersetGroup: groupId };
        }
        return ex;
      });
      sections[sectionIndex] = { ...sections[sectionIndex], exercises };
      days[dayIndex] = { ...days[dayIndex], sections };
      return { programBuilder: { ...state.programBuilder, days } };
    });
  },

  clearProgramBuilder: () => {
    set({
      programBuilder: createEmptyProgramBuilder(3),
      isEditingProgram: null,
    });
  },

  // Assignment Actions
  assignProgram: async (coachId, programId, clientIds, startDate, notes) => {
    const newAssignments = await assignProgramToClients(
      coachId,
      programId,
      clientIds,
      startDate,
      notes
    );

    if (newAssignments.length > 0) {
      set((state) => ({
        assignments: [...newAssignments, ...state.assignments],
      }));
      return true;
    }

    return false;
  },

  cancelClientAssignment: async (assignmentId: string) => {
    const success = await cancelAssignment(assignmentId);
    if (success) {
      set((state) => ({
        assignments: state.assignments.map((a) =>
          a.id === assignmentId ? { ...a, status: 'cancelled' } : a
        ),
      }));
    }
    return success;
  },

  // Client View Actions
  loadClientAssignments: async (clientId: string) => {
    set({ isLoadingAssignments: true });
    const assignments = await fetchClientAssignments(clientId);
    set({ clientAssignments: assignments, isLoadingAssignments: false });
  },
}));
