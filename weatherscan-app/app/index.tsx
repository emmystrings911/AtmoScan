import {styles} from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Keyboard, 
  ActivityIndicator 
} from 'react-native';


export default function WeatherHome() {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Validation and Search Logic
  const handleSearch = () => {
    const trimmedCity = city.trim();

    if (trimmedCity.length === 0) {
      Alert.alert('Input Required', 'Please enter a city name to check the weather.');
      return;
    }

    if (trimmedCity.length < 3) {
      Alert.alert('Invalid Name', 'City name must be at least 3 characters long.');
      return;
    }

    // If valid, trigger the API flow
    startWeatherFetch(trimmedCity);
  };

  const startWeatherFetch = (cityName: string) => {
    Keyboard.dismiss(); // Closes the keyboard
    setIsLoading(true);

    console.log(`Valid input received: ${cityName}. Ready for API call.`);
    
    // Simulating API call for now
    setTimeout(() => {
      setIsLoading(false);
      // This is where you will call API
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>AtmoScan</Text>
          <Text style={styles.subtitle}>Enter a city to get started</Text>
        </View>

        {/* Search Field Section */}
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Lagos, Abuja..."
              placeholderTextColor="#999"
              value={city}
              onChangeText={setCity}
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={handleSearch} // Trigger search on keyboard 'Done/Search'
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.searchButton, isLoading && styles.buttonDisabled]} 
            onPress={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Search Weather</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}


