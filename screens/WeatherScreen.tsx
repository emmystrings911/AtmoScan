import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  RefreshControl,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/Colors';

const API_KEY = '0615f1c364914d92807a6afb2b8dc3ea';
const DEFAULT_CITY = 'Lagos';

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [query, setQuery] = useState('');

  useEffect(() => {
    init();
  }, []);

  /* ---------------- INITIAL LOAD ---------------- */
  const init = async () => {
    await detectUserLocation();
  };

  /* ---------------- LOCATION ---------------- */
  const detectUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchWeatherByCity(DEFAULT_CITY);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      fetchWeatherByCoords(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch {
      fetchWeatherByCity(DEFAULT_CITY);
    }
  };

  /* ---------------- WEATHER FETCH ---------------- */
  const fetchWeatherByCity = async (cityName: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setWeather(data);
      setCity(data.name);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
      Keyboard.dismiss();
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      setWeather(data);
      setCity(data.name);
    } catch {
      fetchWeatherByCity(DEFAULT_CITY);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    detectUserLocation();
  };

  const onSearch = () => {
    if (query.trim()) {
      fetchWeatherByCity(query.trim());
      setQuery('');
    }
  };

  /* ---------------- HELPERS ---------------- */
  const getWeatherIcon = (main: string) => {
    switch (main) {
      case 'Clear': return 'sunny';
      case 'Clouds': return 'cloud';
      case 'Rain': return 'rainy';
      case 'Thunderstorm': return 'thunderstorm';
      case 'Snow': return 'snow';
      default: return 'partly-sunny';
    }
  };

  const formatTime = (unix: number) =>
    new Date(unix * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ---------------- LOADING ---------------- */
  if (loading && !weather) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primaryGreen} />
        <Text style={styles.loadingText}>Fetching Weather...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.location}>{weather?.name}</Text>
          <Ionicons name="person-circle-outline" size={32} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search city"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={onSearch}>
            <Ionicons name="search" size={20} color={Colors.primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Main Weather */}
        <View style={styles.main}>
          <Ionicons
            name={getWeatherIcon(weather.weather[0].main)}
            size={120}
            color={Colors.primaryGreen}
          />
          <Text style={styles.temp}>
            {Math.round(weather.main.temp)}°C
          </Text>
          <Text style={styles.desc}>
            {weather.weather[0].description}
          </Text>
          <Text style={styles.date}>{new Date().toDateString()}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Stat label="Air Quality" value="136" icon="leaf-outline" />
          <Stat label="Pressure" value={`${weather.main.pressure} hPa`} icon="speedometer-outline" />
          <Stat label="UV" value="2" icon="sunny-outline" />
          <Stat label="Rain" value={`${weather.rain?.['1h'] ?? 0} mm`} icon="water-outline" />
          <Stat label="Wind" value={`${weather.wind.speed} km/h`} icon="navigate-outline" />
          <Stat label="Visibility" value={`${weather.visibility / 1000} km`} icon="eye-outline" />
        </View>

        {/* Sunrise / Sunset */}
        <View style={styles.sunCard}>
          <View>
            <Text style={styles.sunLabel}>Sunrise</Text>
            <Text style={styles.sunValue}>
              {formatTime(weather.sys.sunrise)}
            </Text>
          </View>
          <View>
            <Text style={styles.sunLabel}>Sunset</Text>
            <Text style={styles.sunValue}>
              {formatTime(weather.sys.sunset)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Stat Component ---------- */
const Stat = ({ label, value, icon }: any) => (
  <View style={styles.statItem}>
    <Ionicons name={icon} size={22} color={Colors.primaryGreen} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF3F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: Colors.textGreen },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  location: { fontSize: 22, fontWeight: 'bold' },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchInput: { flex: 1, marginRight: 10 },

  main: { alignItems: 'center', marginTop: 30 },
  temp: { fontSize: 80, fontWeight: '200', color: Colors.primaryGreen },
  desc: { fontSize: 18, color: '#555', textTransform: 'capitalize' },
  date: { marginTop: 5, color: '#999' },

  statsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 25,
    paddingVertical: 20,
  },
  statItem: { width: '33%', alignItems: 'center', marginVertical: 15 },
  statValue: { fontWeight: 'bold', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#999' },

  sunCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 30,
  },
  sunLabel: { color: '#999', fontSize: 12 },
  sunValue: { fontSize: 18, fontWeight: '600' },
});
