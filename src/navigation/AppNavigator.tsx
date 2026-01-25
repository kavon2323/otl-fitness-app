import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  WorkoutLogsScreen,
  CoachingScreen,
  WorkoutGeneratorScreen,
} from '../screens';
import { BottomTabBar, TabName } from '../components';
import { Program, WorkoutDay, Exercise, WorkoutLog, GeneratedWorkout } from '../types';
import { useProgramStore } from '../store/programStore';
import { useWorkoutStore } from '../store/workoutStore';
import { getExerciseById } from '../data/exercises';

type Screen =
  | 'home'
  | 'programSelect'
  | 'exerciseSelection'
  | 'workoutDay'
  | 'exerciseDetail'
  | 'activeWorkout'
  | 'workoutSummary'
  | 'exerciseLibrary'
  | 'programs'
  | 'workoutLogs'
  | 'coaching'
  | 'workoutGenerator';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedWorkout, setCompletedWorkout] = useState<WorkoutLog | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [returnToWorkout, setReturnToWorkout] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<GeneratedWorkout | null>(null);

  const { getCurrentProgram, currentProgramId, currentWeek } = useProgramStore();
  const { activeWorkout } = useWorkoutStore();

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
      case 'exercises':
        setCurrentScreen('exerciseLibrary');
        break;
      case 'programs':
        setCurrentScreen('programs');
        break;
      case 'coaching':
        setCurrentScreen('coaching');
        break;
      case 'logs':
        setCurrentScreen('workoutLogs');
        break;
    }
  };

  const handleSelectNewProgram = () => {
    setCurrentScreen('programSelect');
  };

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
    setCurrentScreen('exerciseSelection');
  };

  const handleOpenGenerator = () => {
    setCurrentScreen('workoutGenerator');
  };

  const handleStartGeneratedWorkout = (workout: GeneratedWorkout) => {
    setGeneratedWorkout(workout);
    setSelectedDay(workout.day);
    setCurrentScreen('activeWorkout');
  };

  // Determine if we should show the tab bar
  const showTabBar = ![
    'activeWorkout',
    'workoutSummary',
    'programSelect',
    'exerciseSelection',
    'workoutGenerator',
  ].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
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
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
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
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
        }
        const programForDay = getCurrentProgram();
        if (!programForDay) {
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
        }
        return (
          <WorkoutDayScreen
            day={selectedDay}
            programId={programForDay.id}
            onStartWorkout={handleStartWorkout}
            onBack={() => {
              setSelectedDay(null);
              setCurrentScreen('home');
              setActiveTab('home');
            }}
            onViewExercise={handleViewExercise}
          />
        );

      case 'activeWorkout':
        if (!selectedDay) {
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
        }
        const programForWorkout = getCurrentProgram();
        if (!programForWorkout) {
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
        }
        return (
          <ActiveWorkoutScreen
            day={selectedDay}
            programId={programForWorkout.id}
            weekNumber={currentWeek}
            onComplete={handleWorkoutComplete}
            onCancel={handleWorkoutCancel}
            onViewExercise={handleViewExercise}
          />
        );

      case 'workoutSummary':
        if (!completedWorkout) {
          setCurrentScreen('home');
          setActiveTab('home');
          return null;
        }
        return (
          <WorkoutSummaryScreen
            workout={completedWorkout}
            onDone={handleSummaryDone}
          />
        );

      case 'exerciseDetail':
        if (!selectedExercise) {
          setCurrentScreen(previousScreen);
          return null;
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
            onOpenGenerator={handleOpenGenerator}
          />
        );

      case 'workoutLogs':
        return <WorkoutLogsScreen onSelectWorkout={handleSelectWorkoutLog} />;

      case 'coaching':
        return <CoachingScreen />;

      case 'workoutGenerator':
        return (
          <WorkoutGeneratorScreen
            onBack={() => {
              setCurrentScreen('programs');
              setActiveTab('programs');
            }}
            onStartWorkout={handleStartGeneratedWorkout}
            onViewExercise={handleViewExercise}
          />
        );

      case 'home':
      default:
        return (
          <HomeScreen
            onSelectNewProgram={handleSelectNewProgram}
            onSelectDay={handleSelectDay}
            onEditExercises={handleEditExercises}
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
