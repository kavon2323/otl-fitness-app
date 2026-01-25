import React, { useState } from 'react';
import { SignInScreen, SignUpScreen, ForgotPasswordScreen } from '../screens/auth';

type AuthScreen = 'signIn' | 'signUp' | 'forgotPassword';

export const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('signIn');

  switch (currentScreen) {
    case 'signUp':
      return (
        <SignUpScreen
          onNavigateToSignIn={() => setCurrentScreen('signIn')}
        />
      );
    case 'forgotPassword':
      return (
        <ForgotPasswordScreen
          onNavigateToSignIn={() => setCurrentScreen('signIn')}
        />
      );
    case 'signIn':
    default:
      return (
        <SignInScreen
          onNavigateToSignUp={() => setCurrentScreen('signUp')}
          onNavigateToForgotPassword={() => setCurrentScreen('forgotPassword')}
        />
      );
  }
};
