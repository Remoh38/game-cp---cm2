import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DECOR = [
  { emoji: "🌤️", top: "6%", left: "70%", size: 44 },
  { emoji: "☁️", top: "2%", left: "38%", size: 40 },
  { emoji: "🕊️", top: "8%", left: "88%", size: 32 },
  { emoji: "🌳", bottom: "4%", left: "4%", size: 60 },
  { emoji: "🌳", bottom: "6%", left: "16%", size: 42 },
  { emoji: "🌱", bottom: "3%", left: "28%", size: 30 },
  { emoji: "🌻", bottom: "8%", left: "46%", size: 40 },
  { emoji: "🦋", bottom: "15%", left: "36%", size: 34 },
  { emoji: "🐞", bottom: "7%", left: "60%", size: 32 },
  { emoji: "🌊", bottom: "0%", left: "72%", size: 42 },
  { emoji: "🌸", bottom: "17%", left: "6%", size: 32 },
  { emoji: "🌍", top: "22%", left: "8%", size: 40 },
  { emoji: "🐝", bottom: "22%", left: "76%", size: 32 },
  { emoji: "🍃", top: "28%", left: "82%", size: 34 },
  { emoji: "🐢", bottom: "3%", left: "86%", size: 44 },
  { emoji: "🎈", top: "14%", left: "6%", size: 40 },
  { emoji: "🌈", top: "18%", left: "42%", size: 52 },
];

export default function ThemeBackground({ children, decor = true, ground = true }) {
  return (
    <LinearGradient
      colors={["#AEEAFF", "#7ED5F7", "#4FC3F7", "#81C784"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {decor && (
        <>
          <View style={styles.sun} pointerEvents="none">
            <Text style={{ fontSize: 60 }}>🌞</Text>
          </View>
          {DECOR.map((d, i) => (
            <View
              key={i}
              style={[
                styles.decor,
                {
                  top: d.top,
                  bottom: d.bottom,
                  left: d.left,
                },
              ]}
              pointerEvents="none"
            >
              <Text style={{ fontSize: d.size }}>{d.emoji}</Text>
            </View>
          ))}
        </>
      )}

      {ground && (
        <LinearGradient
          colors={["#7CB342", "#33691E"]}
          style={styles.grass}
          pointerEvents="none"
        />
      )}

      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decor: {
    position: "absolute",
    zIndex: 1,
  },
  sun: {
    position: "absolute",
    top: "4%",
    left: "6%",
    zIndex: 2,
  },
  grass: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "14%",
    borderRadius: 40,
    zIndex: 1,
  },
});