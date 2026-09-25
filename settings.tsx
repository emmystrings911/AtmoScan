import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<"Celsius" | "Fahrenheit">("Celsius");

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </Pressable>
        <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
          Settings
        </Text>
      </View>

      {/* Temperature Unit */}
      <Pressable style={styles.item}>
        <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
          Temperature Unit
        </Text>
      </Pressable>

      <View style={styles.subItemContainer}>
        <Pressable
          style={[
            styles.subItem,
            temperatureUnit === "Celsius" && styles.activeItem,
          ]}
          onPress={() => setTemperatureUnit("Celsius")}
        >
          <Text style={styles.subItemText}>Celsius (°C)</Text>
        </Pressable>

        <Pressable
          style={[
            styles.subItem,
            temperatureUnit === "Fahrenheit" && styles.activeItem,
          ]}
          onPress={() => setTemperatureUnit("Fahrenheit")}
        >
          <Text style={styles.subItemText}>Fahrenheit (°F)</Text>
        </Pressable>
      </View>

      {/* Dark Mode */}
      <View style={styles.item}>
        <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
          Dark Theme
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      {/* User Agreement */}
      <Pressable style={styles.item} onPress={() => router.push("/user-agreement")}>
        <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
          User Agreement
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </Pressable>

      {/* Privacy Policy */}
      <Pressable style={styles.item} onPress={() => router.push("/privacy-policy")}>
        <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
          Privacy Policy
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  darkText: {
    color: "#fff",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  subItemContainer: {
    marginBottom: 20,
  },
  subItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: "#f2f2f2",
  },
  activeItem: {
    backgroundColor: "#008000",
  },
  subItemText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
});
