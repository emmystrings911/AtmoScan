/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


import { StyleSheet } from 'react-native';
// import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
// import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  // },
  // text: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Very light professional grey
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#1e353bff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  searchContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 16,
    // Soft shadow for the input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#44c04aff', // Dark professional navy
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

