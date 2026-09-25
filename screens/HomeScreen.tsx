import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Colors } from '../styles/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Generate the naturally changing date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const today = new Intl.DateTimeFormat('en-US', options).format(new Date());
    setCurrentDate(today);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* ScrollView ensures that if the screen is small or items are many, nothing is hidden */}
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>

        <View style={styles.headerSection}>
          <Text style={styles.dateLabel}>{currentDate}</Text>
          <Text style={styles.welcomeText}>Hello, Group 6!</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.icon}>☁️</Text>
          <Text style={styles.title}>AtmoScan</Text>
          <Text style={styles.subtitle}>Smart Weather Tracking</Text>

          {/* Primary Action */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Weather')}
          >
            <Ionicons name="partly-sunny" size={20} color={Colors.pureWhite} style={{marginRight: 8}} />
            <Text style={styles.buttonText}>Check Weather</Text>
          </TouchableOpacity>

          {/* Secondary Action */}
          <TouchableOpacity
            style={[styles.button, styles.settingsButton]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-sharp" size={20} color={Colors.primaryGreen} style={{marginRight: 8}} />
            <Text style={[styles.buttonText, styles.settingsButtonText]}>App Settings Page</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.0.4 | Android 16 Verified</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.pureWhite,
  },
  scrollContainer: {
    flexGrow: 1, // Vital for centering content within a ScrollView
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  headerSection: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  dateLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textGreen,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: Colors.primaryGreen,
    textAlign: 'center',
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textGreen,
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: Colors.primaryGreen,
    flexDirection: 'row',
    paddingVertical: 18,
    width: '85%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 6, // Keeps content visible on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4.5,
  },
  settingsButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    elevation: 0,
  },
  buttonText: {
    color: Colors.pureWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButtonText: {
    color: Colors.primaryGreen,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#CCC',
    fontWeight: 'bold',
  }
});