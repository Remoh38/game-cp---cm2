import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemeBackground from "../components/ThemeBackground";
import GameButton from "../components/GameButton";

export default function ModeSelectScreen({ navigation, route }) {
  const { level, time, levelInfo } = route.params || {};

  const goToGame = (mode) => {
    navigation.navigate("TeamSetup", {
      mode,
      level,
      time,
      levelInfo,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground>
        <View style={styles.header}>
          <Text style={styles.badge}>{levelInfo?.emoji} {level}</Text>
          <Text style={styles.title}>Comment veux-tu jouer ?</Text>
          <Text style={styles.subtitle}>Choisis ta façon de jouer !</Text>
        </View>

        <View style={styles.modes}>
          <Pressable
            onPress={() => goToGame("local")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <LinearGradient
              colors={["#FF8A65", "#E64A19"]}
              style={styles.modeCard}
            >
              <Text style={styles.modeEmoji}>🗂️</Text>
              <Text style={styles.modeTitle}>Base de mots locale</Text>
              <Text style={styles.modeDesc}>
                Des centaines de cartes préparées pour ton niveau !
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => goToGame("ai")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <LinearGradient
              colors={["#BA68C8", "#6A1B9A"]}
              style={styles.modeCard}
            >
              <Text style={styles.modeEmoji}>🤖</Text>
              <Text style={styles.modeTitle}>Intelligence artificielle</Text>
              <Text style={styles.modeDesc}>
                L'IA crée des mots surprise à chaque tour !
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        <GameButton
          title="Retour"
          emoji="⬅️"
          colors={["#90A4AE", "#546E7A"]}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        />
      </ThemeBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    alignItems: "center",
    marginTop: 30,
    zIndex: 5,
  },
  badge: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1B5E20",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
    overflow: "hidden",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#fff",
    marginTop: 10,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF9C4",
    marginTop: 4,
  },
  modes: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    zIndex: 5,
  },
  pressed: { opacity: 0.85 },
  modeCard: {
    borderRadius: 24,
    padding: 22,
    marginVertical: 12,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modeEmoji: { fontSize: 52 },
  modeTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    marginTop: 8,
  },
  modeDesc: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.95)",
    marginTop: 6,
    textAlign: "center",
  },
  backBtn: { width: "60%", alignSelf: "center", marginBottom: 20, zIndex: 5 },
});