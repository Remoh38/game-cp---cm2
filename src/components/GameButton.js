import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GameButton({
  title,
  onPress,
  colors = ["#FFB300", "#F57C00"],
  emoji,
  big = false,
  style,
  disabled = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.wrap, style, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, big && styles.big]}
      >
        {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
        <Text style={[styles.text, big && styles.bigText]}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.6)",
  },
  big: {
    paddingVertical: 20,
    paddingHorizontal: 34,
  },
  emoji: {
    fontSize: 26,
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  bigText: {
    fontSize: 22,
  },
});