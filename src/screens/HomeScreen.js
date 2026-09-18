import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ThemeBackground from "../components/ThemeBackground";
import GameButton from "../components/GameButton";

const GAMES = [
  { id: "game", icon: "🧠", name: "Game CP - CM2", color: ["#FF5252", "#D32F2F"], available: true },
  { id: "pendu", icon: "✏️", name: "Pendu", color: ["#FF7043", "#E64A19"], available: false },
  { id: "mots", icon: "🔤", name: "Mots Mêlés", color: ["#66BB6A", "#2E7D32"], available: false },
  { id: "quiz", icon: "❓", name: "Quiz Planète", color: ["#42A5F5", "#1565C0"], available: false },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground>
        <View style={styles.content}>
          <Text style={styles.logo}>🌍</Text>
          <Text style={styles.title}>Les Aventuriers</Text>
          <Text style={styles.subtitle}>de la Planète !</Text>

          <View style={styles.sloganBubble}>
            <Text style={styles.slogan}>🌱 Je protege ma planète, 🌿</Text>
            <Text style={styles.slogan}>je m'amuse et j'apprends !</Text>
          </View>

          <Text style={styles.sectionTitle}>🎮 Mes jeux</Text>

          {GAMES.map((g) => (
            <GameButton
              key={g.id}
              title={g.available ? `${g.name}  ▶` : `${g.name}   (bientôt !)`}
              emoji={g.icon}
              colors={g.color}
              big={g.id === "game"}
              onPress={() => {
                if (g.available) navigation.navigate("LevelSelect");
              }}
              disabled={!g.available}
              style={styles.gameBtn}
            />
          ))}

          <Text style={styles.footer}>Fait pour les champions du CP au CM2 💪</Text>
        </View>
      </ThemeBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 5,
  },
  logo: { fontSize: 70 },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF59D",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  sloganBubble: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 8,
  },
  slogan: {
    fontSize: 15,
    fontWeight: "600",
    color: "#33691E",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
    marginBottom: 4,
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gameBtn: { width: "90%" },
  footer: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#E8F5E9",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});