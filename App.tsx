import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './styles/Colors';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/WeatherScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const handleExit = () => {
    Alert.alert("Exit App", "Are you sure you want to close AtmoScan?", [
      { text: "Cancel", style: "cancel" },
      { text: "Exit", onPress: () => BackHandler.exitApp() }
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Profile Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>6</Text>
          </View>
          <Text style={styles.groupName}>Group 6</Text>
          <Text style={styles.appVersion}>AtmoScan v1.0.4</Text>
        </View>

        {/* Main Navigation Items */}
        <DrawerItemList {...props} />

        {/* Section Divider */}
        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>App Information</Text>
          <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert("AtmoScan", "Group 6 Engineering Project 2026")}>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
            <Text style={styles.infoText}>About AtmoScan</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Exit Section - Pinned to Bottom */}
      <View style={styles.exitSection}>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Ionicons name="log-out-outline" size={22} color="#E63946" />
          <Text style={styles.exitText}>Exit Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primaryGreen, elevation: 4 },
            headerTintColor: Colors.pureWhite,
            headerTitleAlign: 'center',
            drawerActiveTintColor: Colors.primaryGreen,
            drawerLabelStyle: { marginLeft: -10, fontWeight: '600' },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Dashboard',
              drawerIcon: ({color}) => <Ionicons name="home" size={22} color={color} />
            }}
          />
          <Drawer.Screen
            name="Weather"
            component={WeatherScreen}
            options={{
              title: 'Live Weather',
              drawerIcon: ({color}) => <Ionicons name="cloudy" size={22} color={color} />
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'App Settings',
              drawerIcon: ({color}) => <Ionicons name="settings" size={22} color={color} />
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: Colors.pureWhite },
  drawerHeader: {
    height: 150,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: -55, // Covers the very top of the screen
  },
  profileCircle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: Colors.pureWhite,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10, marginTop: 40,
  },
  profileInitial: { fontSize: 24, fontWeight: 'bold', color: Colors.primaryGreen },
  groupName: { color: Colors.pureWhite, fontSize: 18, fontWeight: 'bold' },
  appVersion: { color: Colors.pureWhite, fontSize: 12, opacity: 0.8 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10, width: '90%', alignSelf: 'center' },
  infoSection: { paddingHorizontal: 20, marginTop: 10 },
  infoLabel: { fontSize: 12, color: '#AAA', fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  infoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoText: { marginLeft: 15, fontSize: 15, color: '#666' },
  exitSection: { marginBottom: 20 },
  exitButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  exitText: { marginLeft: 15, fontSize: 16, fontWeight: 'bold', color: '#E63946' },
});