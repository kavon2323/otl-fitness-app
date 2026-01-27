import React, { useState } from 'react';
import {
  WelcomeScreen,
  PositionScreen,
  SideBiasScreen,
  ExperienceScreen,
  PhaseScreen,
  DaysPerWeekScreen,
  ReviewScreen,
} from '../screens/onboarding';

type OnboardingStep =
  | 'welcome'
  | 'position'
  | 'sideBias'
  | 'experience'
  | 'phase'
  | 'daysPerWeek'
  | 'review';

interface OnboardingNavigatorProps {
  onComplete: () => void;
}

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const handleComplete = () => {
    onComplete();
  };

  // Navigation helpers
  const goTo = (step: OnboardingStep) => setCurrentStep(step);

  switch (currentStep) {
    case 'welcome':
      return (
        <WelcomeScreen
          onNext={() => goTo('position')}
        />
      );

    case 'position':
      return (
        <PositionScreen
          onNext={() => goTo('sideBias')}
          onBack={() => goTo('welcome')}
        />
      );

    case 'sideBias':
      return (
        <SideBiasScreen
          onNext={() => goTo('experience')}
          onBack={() => goTo('position')}
        />
      );

    case 'experience':
      return (
        <ExperienceScreen
          onNext={() => goTo('phase')}
          onBack={() => goTo('sideBias')}
        />
      );

    case 'phase':
      return (
        <PhaseScreen
          onNext={() => goTo('daysPerWeek')}
          onBack={() => goTo('experience')}
        />
      );

    case 'daysPerWeek':
      return (
        <DaysPerWeekScreen
          onNext={() => goTo('review')}
          onBack={() => goTo('phase')}
        />
      );

    case 'review':
      return (
        <ReviewScreen
          onComplete={handleComplete}
          onBack={() => goTo('daysPerWeek')}
          onEditPosition={() => goTo('position')}
          onEditSideBias={() => goTo('sideBias')}
          onEditExperience={() => goTo('experience')}
          onEditPhase={() => goTo('phase')}
          onEditDaysPerWeek={() => goTo('daysPerWeek')}
        />
      );

    default:
      return (
        <WelcomeScreen
          onNext={() => goTo('position')}
        />
      );
  }
};
