import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme';
import {
  HomeScreen,
  ProgramSelectScreen,
  ExerciseSelectionScreen,
  WorkoutDayScreen,
  ExerciseDetailScreen,
  ActiveWorkoutScreen,
  WorkoutSummaryScreen,
  ExerciseLibraryScreen,
  ProgramsScreen,
  ProgramOverviewScreen,
  WorkoutLogsScreen,
  CoachingScreen,
  ResourcesScreen,
  SettingsScreen,
  ConfirmProfileScreen,
  MessagesScreen,
} from '../screens';
import { BottomTabBar, TabName } from '../components';
import { Program, WorkoutDay, Exercise, WorkoutLog } from '../types';
import { useProgramStore, getWorkoutWithSelections } from '../store/programStore';
import { useWorkoutStore } from '../store/workoutStore';
import { usePlayerProfileStore } from '../store/playerProfileStore';
import { getExerciseById } from '../store/exerciseStore';
import { getStrengthProgramsByDaysPerWeek } from '../data/programs';
import { assembleWorkoutForPlayer, AssembledWorkout } from '../utils/paintballWorkoutAssembler';
import { generateWhyMessage, generateTaperStatus, WhyMessage } from '../utils/whyMessageGenerator';

type Screen =
  | 'home'
  | 'confirmProfile'
  | 'programSelect'
  | 'programOverview'
  | 'exerciseSelection'
  | 'workoutDay'
  | 'exerciseDetail'
  | 'activeWorkout'
  | 'workoutSummary'
  | 'exerciseLibrary'
  | 'programs'
  | 'workoutLogs'
  | 'coaching'
  | 'resources'
  | 'settings'
  | 'messages';

interface AppNavigatorProps {
  initialScreen?: 'home' | 'programOverview';
  showRecommendedProgram?: boolean;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  initialScreen = 'home',
  showRecommendedProgram = false,
}) => {
  const { profile } = usePlayerProfileStore();
  const { getCurrentProgram, currentProgramId, currentWeek, getExerciseForSlot } = useProgramStore();

  // Get recommended program based on profile - prioritize OTL programs
  const recommendedProgram = useMemo(() => {
    if (!profile?.trainingDaysPerWeek) return null;
    const programs = getStrengthProgramsByDaysPerWeek(profile.trainingDaysPerWeek);
    // Prioritize OTL programs (they start with 'otl-')
    const otlProgram = programs.find(p => p.id.startsWith('otl-'));
    return otlProgram || (programs.length > 0 ? programs[0] : null);
  }, [profile?.trainingDaysPerWeek]);

  const [currentScreen, setCurrentScreen] = useState<Screen>(initialScreen);

  // Debug: Log whenever currentScreen changes
  useEffect(() => {
    console.log('📍 currentScreen changed to:', currentScreen);
  }, [currentScreen]);
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(
    showRecommendedProgram ? recommendedProgram : null
  );
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedWorkout, setCompletedWorkout] = useState<WorkoutLog | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [returnToWorkout, setReturnToWorkout] = useState(false);
  const [isRecommendedProgram, setIsRecommendedProgram] = useState(showRecommendedProgram);

  // Set initial program for overview if coming from onboarding
  useEffect(() => {
    if (showRecommendedProgram && recommendedProgram && !selectedProgram) {
      setSelectedProgram(recommendedProgram);
    }
  }, [showRecommendedProgram, recommendedProgram]);

  const { activeWorkout } = useWorkoutStore();

  // Assemble workout based on player profile (position, side bias, phase, experience)
  // Also apply exercise selections from programStore
  const assembledWorkout: AssembledWorkout | null = useMemo(() => {
    if (!selectedDay || !profile) return null;
    const assembled = assembleWorkoutForPlayer(selectedDay, profile);

    // Get current program to look up exercise selections
    const program = getCurrentProgram();
    if (!program) return assembled;

    // Apply exercise selections to each exercise in the workout
    const sectionsWithSelections = assembled.sections.map((section) => ({
      ...section,
      exercises: section.exercises.map((exercise) => ({
        ...exercise,
        exerciseId: getExerciseForSlot(
          program.id,
          selectedDay.dayNumber,
          exercise.exerciseSlot,
          exercise.categorySlot
        ) || exercise.exerciseId,
      })),
    }));

    return {
      ...assembled,
      sections: sectionsWithSelections,
    };
  }, [selectedDay, profile, getCurrentProgram, getExerciseForSlot]);

  // Generate Why message for the assembled workout
  const whyMessage: WhyMessage | null = useMemo(() => {
    if (!assembledWorkout || !profile) return null;
    return generateWhyMessage(assembledWorkout, profile);
  }, [assembledWorkout, profile]);

  // Generate taper status if applicable
  const taperStatus = useMemo(() => {
    if (!profile) return null;
    return generateTaperStatus(profile);
  }, [profile]);

  // Track if we're in an active workout session
  const isWorkoutActive = !!activeWorkout;

  const handleTabPress = (tab: TabName) => {
    // If we're in an active workout and pressing home, return to the workout
    if (tab === 'home' && isWorkoutActive && returnToWorkout) {
      setCurrentScreen('activeWorkout');
      setActiveTab('home');
      setReturnToWorkout(false);
      return;
    }

    setActiveTab(tab);
    switch (tab) {
      case 'home':
        if (isWorkoutActive) {
          setCurrentScreen('activeWorkout');
        } else {
          setCurrentScreen('home');
        }
        break;
      case 'programs':
        setCurrentScreen('programs');
        break;
      case 'logs':
        setCurrentScreen('workoutLogs');
        break;
      case 'resources':
        setCurrentScreen('resources');
        break;
    }
  };

  const handleSelectNewProgram = () => {
    // Route to confirm profile screen where user can review/edit their profile
    // and then generate their personalized program
    setCurrentScreen('confirmProfile');
  };

  const handleProfileConfirmed = () => {
    // After confirming profile and starting new cycle, show the recommended program
    // Get fresh program based on current profile (don't rely on stale useMemo)
    const currentProfile = usePlayerProfileStore.getState().profile;
    const days = currentProfile?.trainingDaysPerWeek;

    console.log('🔍 Profile confirmed - days:', days);
    console.log('🔍 Current profile:', currentProfile);

    if (days) {
      const programs = getStrengthProgramsByDaysPerWeek(days);
      console.log('🔍 Found programs for', days, 'days:', programs.length);
      const otlProgram = programs.find(p => p.id.startsWith('otl-'));
      const program = otlProgram || programs[0];

      console.log('🔍 Selected program:', program?.id);

      if (program) {
        // Set all state at once and navigate directly
        setSelectedProgram(program);
        setIsRecommendedProgram(true);
        setCurrentScreen('programOverview');
        console.log('✅ Set program and navigated to programOverview:', program.id);
        return;
      }
    }

    // Fallback to program selection if no recommended program found
    console.log('⚠️ No program found, showing program select');
    setCurrentScreen('programSelect');
  };

  // This useEffect is no longer needed since we navigate directly in handleProfileConfirmed
  // Keeping it commented out for reference
  // useEffect(() => {
  //   if (selectedProgram && isRecommendedProgram && currentScreen === 'confirmProfile') {
  //     setCurrentScreen('programOverview');
  //   }
  // }, [selectedProgram, isRecommendedProgram, currentScreen]);

  const handleProgramSelected = (program: Program) => {
    setSelectedProgram(program);
    setCurrentScreen('exerciseSelection');
  };

  const handleExerciseSelectionComplete = () => {
    setSelectedProgram(null);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleSelectDay = (day: WorkoutDay) => {
    setSelectedDay(day);
    setCurrentScreen('workoutDay');
  };

  const handleViewExercise = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    if (exercise) {
      setSelectedExercise(exercise);
      setPreviousScreen(currentScreen);
      setCurrentScreen('exerciseDetail');
      // If viewing from active workout, enable return to workout
      if (currentScreen === 'activeWorkout') {
        setReturnToWorkout(true);
      }
    }
  };

  const handleEditExercises = () => {
    const program = getCurrentProgram();
    if (program) {
      setSelectedProgram(program);
      setCurrentScreen('exerciseSelection');
    }
  };

  const handleStartWorkout = () => {
    if (selectedDay) {
      setCurrentScreen('activeWorkout');
    }
  };

  const handleWorkoutComplete = () => {
    const { workoutHistory } = useWorkoutStore.getState();
    if (workoutHistory.length > 0) {
      setCompletedWorkout(workoutHistory[0]);
      setCurrentScreen('workoutSummary');
    } else {
      setCurrentScreen('home');
      setActiveTab('home');
    }
  };

  const handleWorkoutCancel = () => {
    setCurrentScreen('workoutDay');
  };

  const handleSummaryDone = () => {
    setSelectedDay(null);
    setCompletedWorkout(null);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleSelectExerciseFromLibrary = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setPreviousScreen(currentScreen);
    setCurrentScreen('exerciseDetail');
  };

  const handleSelectWorkoutLog = (workout: WorkoutLog) => {
    setCompletedWorkout(workout);
    setCurrentScreen('workoutSummary');
  };

  const handleSelectProgramFromList = (program: Program) => {
    setSelectedProgram(program);
    setIsRecommendedProgram(false);
    setCurrentScreen('programOverview');
  };

  const handleProgramOverviewStart = () => {
    setCurrentScreen('home');
    setActiveTab('home');
    setIsRecommendedProgram(false);
  };

  const handleSelectDifferentProgram = () => {
    setCurrentScreen('programs');
    setActiveTab('programs');
  };

  // Determine if we should show the tab bar
  const showTabBar = ![
    'activeWorkout',
    'workoutSummary',
    'confirmProfile',
    'programSelect',
    'programOverview',
    'exerciseSelection',
    'settings',
  ].includes(currentScreen);

  const renderScreen = () => {
    console.log('🎬 Rendering screen:', currentScreen, '| selectedProgram:', selectedProgram?.id);
    switch (currentScreen) {
      case 'confirmProfile':
        return (
          <ConfirmProfileScreen
            onGenerateProgram={() => {
              console.log('🔥 onGenerateProgram called');
              handleProfileConfirmed();
            }}
            onBack={() => {
              console.log('🔙 Back from confirmProfile');
              setCurrentScreen('home');
              setActiveTab('home');
            }}
          />
        );

      case 'programSelect':
        return (
          <ProgramSelectScreen
            onSelectProgram={handleProgramSelected}
            onBack={() => {
              setCurrentScreen('home');
              setActiveTab('home');
            }}
          />
        );

      case 'exerciseSelection':
        if (!selectedProgram) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        return (
          <ExerciseSelectionScreen
            program={selectedProgram}
            onComplete={handleExerciseSelectionComplete}
            onBack={() => {
              if (currentProgramId === selectedProgram.id) {
                setCurrentScreen('home');
                setActiveTab('home');
              } else {
                setCurrentScreen('programSelect');
              }
            }}
          />
        );

      case 'workoutDay':
        if (!selectedDay) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        const programForDay = getCurrentProgram();
        if (!programForDay) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        // Use assembled workout if profile exists, otherwise use raw day
        const dayToDisplay = assembledWorkout || selectedDay;
        return (
          <WorkoutDayScreen
            day={dayToDisplay}
            programId={programForDay.id}
            onStartWorkout={handleStartWorkout}
            onBack={() => {
              setSelectedDay(null);
              setCurrentScreen('home');
              setActiveTab('home');
            }}
            onViewExercise={handleViewExercise}
            whyMessage={whyMessage}
            taperStatus={taperStatus}
          />
        );

      case 'activeWorkout':
        if (!selectedDay) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        const programForWorkout = getCurrentProgram();
        if (!programForWorkout) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        // Use assembled workout if profile exists, otherwise use raw day
        const workoutToRun = assembledWorkout || selectedDay;
        return (
          <ActiveWorkoutScreen
            day={workoutToRun}
            programId={programForWorkout.id}
            weekNumber={currentWeek}
            onComplete={handleWorkoutComplete}
            onCancel={handleWorkoutCancel}
            onViewExercise={handleViewExercise}
          />
        );

      case 'workoutSummary':
        if (!completedWorkout) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        return (
          <WorkoutSummaryScreen
            workout={completedWorkout}
            onDone={handleSummaryDone}
          />
        );

      case 'exerciseDetail':
        if (!selectedExercise) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        return (
          <ExerciseDetailScreen
            exercise={selectedExercise}
            onBack={() => {
              setSelectedExercise(null);
              setCurrentScreen(previousScreen);
            }}
            showReturnToWorkout={returnToWorkout && isWorkoutActive}
            onReturnToWorkout={() => {
              setSelectedExercise(null);
              setCurrentScreen('activeWorkout');
              setReturnToWorkout(false);
            }}
          />
        );

      case 'exerciseLibrary':
        return (
          <ExerciseLibraryScreen onSelectExercise={handleSelectExerciseFromLibrary} />
        );

      case 'programs':
        return (
          <ProgramsScreen
            onSelectProgram={handleSelectProgramFromList}
          />
        );

      case 'programOverview':
        if (!selectedProgram) {
          console.log('❌ ProgramOverview: No selectedProgram, showing loading');
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          );
        }
        console.log('✅ ProgramOverview: Rendering with program:', selectedProgram.id);
        return (
          <ProgramOverviewScreen
            program={selectedProgram}
            isRecommended={isRecommendedProgram}
            onStartProgram={handleProgramOverviewStart}
            onSelectDay={handleSelectDay}
            onViewExercise={handleViewExercise}
            onSelectDifferentProgram={handleSelectDifferentProgram}
            onBack={isRecommendedProgram ? undefined : () => {
              setCurrentScreen('programs');
              setActiveTab('programs');
            }}
          />
        );

      case 'workoutLogs':
        return <WorkoutLogsScreen onSelectWorkout={handleSelectWorkoutLog} />;

      case 'coaching':
        return <CoachingScreen />;

      case 'resources':
        return (
          <ResourcesScreen
            onOpenExerciseLibrary={() => {
              setPreviousScreen('resources');
              setCurrentScreen('exerciseLibrary');
            }}
            onOpenCoaching={() => {
              setPreviousScreen('resources');
              setCurrentScreen('coaching');
            }}
            onOpenSupplements={() => {
              // Coming soon - no action
            }}
            onOpenStore={() => {
              // Coming soon - no action
            }}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => {
              setCurrentScreen('home');
              setActiveTab('home');
            }}
          />
        );

      case 'messages':
        return (
          <MessagesScreen
            onBack={() => {
              setCurrentScreen('home');
              setActiveTab('home');
            }}
          />
        );

      case 'home':
      default:
        return (
          <HomeScreen
            onSelectNewProgram={handleSelectNewProgram}
            onSelectDay={handleSelectDay}
            onEditExercises={handleEditExercises}
            onOpenSettings={() => setCurrentScreen('settings')}
            onOpenMessages={() => setCurrentScreen('messages')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>
      {showTabBar && (
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
          isWorkoutActive={isWorkoutActive && currentScreen !== 'activeWorkout'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  screenContainer: {
    flex: 1,
  },
});
