import React from 'react';
import { NavigationContainer, DarkTheme, Theme as NavTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/context';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { Welcome } from '@/screens/Onboarding/Welcome';
import { PrivacyPolicyScreen } from '@/screens/Legal';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type WelcomeNav = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

interface AuthNavigatorProps {
  /** Called once the user leaves the welcome slides; the app opens as a guest. */
  onFinish: () => void;
}

/** Wraps the welcome slides: advancing marks onboarding done and opens the app. */
const WelcomeRoute: React.FC<AuthNavigatorProps> = ({ onFinish }) => {
  const navigation = useNavigation<WelcomeNav>();
  return (
    <Welcome
      onGetStarted={() => {
        void storage.setItem(STORAGE_KEYS.ONBOARDING_DONE, true);
        onFinish();
      }}
      onPrivacy={() => navigation.navigate('PrivacyPolicy')}
    />
  );
};

/**
 * First-launch navigation: the welcome slides and the policy they link to.
 * Its own NavigationContainer so it never coexists with the main app stack.
 */
export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onFinish }) => {
  const theme = useTheme();
  const navTheme: NavTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.colors.background,
      card: theme.colors.background,
      text: theme.colors.text,
      primary: theme.colors.primary,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome">{() => <WelcomeRoute onFinish={onFinish} />}</Stack.Screen>
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
