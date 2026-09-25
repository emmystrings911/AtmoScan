import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Switch, SafeAreaView,
  ScrollView, TextInput, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../styles/Colors';

export default function SettingsScreen() {
  // 1. Location State
  const [city, setCity] = useState('London');
  const [useGPS, setUseGPS] = useState(false);

  // 2. Units & Data State
  const [isMetric, setIsMetric] = useState(true);
  const [windUnit, setWindUnit] = useState('km/h');

  // 3. Notifications State
  const [dailySummary, setDailySummary] = useState(false);
  const [severeAlerts, setSevereAlerts] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedCity = await AsyncStorage.getItem('@default_city');
      if (savedCity) setCity(savedCity);
      // Add more loaders here as needed
    } catch (e) { console.error(e); }
  };

  const saveCity = async (text: string) => {
    setCity(text);
    await AsyncStorage.setItem('@default_city', text);
  };

  const handleClearCache = () => {
    Alert.alert("Clear Cache", "This will remove all stored weather data.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => Alert.alert("Cache Cleared!") }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Settings</Text>

        {/* SECTION 1: LOCATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOCATION</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Default City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={saveCity}
              placeholder="Enter city..."
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Use Current Location</Text>
            <Switch value={useGPS} onValueChange={setUseGPS} trackColor={{true: Colors.primaryGreen}} />
          </View>
        </View>

        {/* SECTION 2: UNITS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UNITS & DATA</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Temperature (°C)</Text>
            <Switch value={isMetric} onValueChange={setIsMetric} trackColor={{true: Colors.primaryGreen}} />
          </View>
          <TouchableOpacity style={styles.row} onPress={() => setWindUnit(windUnit === 'km/h' ? 'm/s' : 'km/h')}>
            <Text style={styles.label}>Wind Speed Unit</Text>
            <Text style={styles.valueText}>{windUnit}</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 3: NOTIFICATIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Daily Summary</Text>
            <Switch value={dailySummary} onValueChange={setDailySummary} trackColor={{true: Colors.primaryGreen}} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Severe Weather</Text>
            <Switch value={severeAlerts} onValueChange={setSevereAlerts} trackColor={{true: Colors.primaryGreen}} />
          </View>
        </View>

        {/* SECTION 4: ACCOUNT & SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT & SUPPORT</Text>
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert("AtmoScan v1.0", "Developed by Group 6\n\nMembers:\n- Hilosthone (Dev 1)\n- Developer 2\n- Developer 3")}>
            <Text style={styles.label}>About AtmoScan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleClearCache}>
            <Text style={[styles.label, {color: '#E63946'}]}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>AtmoScan v1.0 | 2026</Text>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.pureWhite },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: Colors.textGreen, marginVertical: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 10, letterSpacing: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  inputRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  label: { fontSize: 16, color: '#333', fontWeight: '500' },
  valueText: { fontSize: 16, color: Colors.primaryGreen, fontWeight: 'bold' },
  input: {
    height: 40,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 8,
    color: Colors.textGreen
  },
  footer: { textAlign: 'center', color: '#BBB', fontSize: 12, marginTop: 20 }
});