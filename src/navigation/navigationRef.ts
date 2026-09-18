import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

/**
 * The main app's navigation container ref. Lets root-level UI that sits outside
 * the container (the sign-in prompt) open a route.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
