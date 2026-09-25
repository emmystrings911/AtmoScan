<<<<<<< HEAD
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
=======
import { Redirect } from "expo-router";

export default function AppIndex() {
  return <Redirect href="/(tabs)" />;
}
>>>>>>> dbec667ded7fc921c2617d83235025fe25a13755
