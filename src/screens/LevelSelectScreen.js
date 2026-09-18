import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemeBackground from "../components/ThemeBackground";
import GameButton from "../components/GameButton";

const LEVELS = [
  {
    id: "CP-CE1",
    title: "CP - CE1",
    ages: "6-7 ans",
    emoji: "🐣",
    gradient: ["#FFD54F", "#FFA000"],
    desc: "Les petits explorateurs !",
    time: 90,
  },
  {
    id: "CE2-CM1",
    title: "CE2 - CM1",
    ages: "8-9 ans",
    emoji: "🦊",
    gradient: ["#81C784", "#2E7D32"],
    desc: "Les apprentis aventuriers !",
    time: 60,
  },
  {
    id: "CM1-CM2",
    title: "CM1 - CM2",
    ages: "10-11 ans",
    emoji: "🦉",
    gradient: ["#64B5F6", "#1565C0"],
    desc: "Les grands chefs !",
    time: 45,
  },
];

export default function LevelSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground>
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Choisis ton niveau</Text>
          <Text style={styles.subtitle}>Trouve ton aventure !</Text>
        </View>

        <View style={styles.list}>
          {LEVELS.map((l) => (
            <Pressable
              key={l.id}
              onPress={() =>
                navigation.navigate("ModeSelect", { level: l.id, time: l.time, levelInfo: l })
              }
              style={({ pressed }) => pressed && styles.pressed}
            >
              <LinearGradient
                colors={l.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <Text style={styles.cardEmoji}>{l.emoji}</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{l.title}</Text>
                  <Text style={styles.cardAge}>👶 {l.ages}</Text>
                  <Text style={styles.cardDesc}>{l.desc}</Text>
                </View>
                <Text style={styles.arrow}>▶</Text>
              </LinearGradient>
            </Pressable>
          ))}
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
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFF9C4",
    marginTop: 4,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    zIndex: 5,
  },
  pressed: { opacity: 0.85 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    padding: 18,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardEmoji: { fontSize: 42, marginRight: 14 },
  cardBody: { flex: 1 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
  },
  cardAge: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.95)",
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900",
  },
  backBtn: { width: "60%", alignSelf: "center", marginBottom: 20, zIndex: 5 },
});