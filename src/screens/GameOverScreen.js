import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemeBackground from "../components/ThemeBackground";
import GameButton from "../components/GameButton";

export default function GameOverScreen({ navigation, route }) {
  const {
    teamA,
    teamB,
    scores,
    level,
    mode,
    cardsFound,
    cardsBuzzed,
    cardsPassed,
    turnNumber,
  } = route.params || {};

  const winner = scores[1] === scores[2] ? null : scores[1] > scores[2] ? teamA : teamB;
  const draw = !winner;

  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground ground={false}>
        <View style={styles.content}>
          <Text style={styles.trophy}>🏆</Text>
          <Text style={styles.title}>
            {draw ? "Égalité parfaite !" : `${winner.mascot} ${winner.name} gagne !`}
          </Text>
          <Text style={styles.subtitle}>
            Niveau {level} • {mode === "local" ? "🗂️ Base locale" : "🤖 Mode IA"}
          </Text>

          <View style={styles.podium}>
            <LinearGradient
              colors={scores[1] >= scores[2] ? ["#FFF176", "#F9A825"] : ["#CFD8DC", "#90A4AE"]}
              style={styles.podiumCard}
            >
              <Text style={styles.podiumMascot}>{teamA.mascot}</Text>
              <Text style={styles.podiumName}>{teamA.name}</Text>
              <Text style={styles.podiumScore}>{scores[1]}</Text>
              <Text style={styles.podiumLabel}>pts</Text>
              {scores[1] === scores[2] ? (
                <Text style={styles.winnerCrown}>🤝</Text>
              ) : scores[1] > scores[2] ? (
                <Text style={styles.winnerCrown}>👑</Text>
              ) : null}
            </LinearGradient>

            <LinearGradient
              colors={scores[2] >= scores[1] ? ["#FFF176", "#F9A825"] : ["#CFD8DC", "#90A4AE"]}
              style={styles.podiumCard}
            >
              <Text style={styles.podiumMascot}>{teamB.mascot}</Text>
              <Text style={styles.podiumName}>{teamB.name}</Text>
              <Text style={styles.podiumScore}>{scores[2]}</Text>
              <Text style={styles.podiumLabel}>pts</Text>
              {scores[1] === scores[2] ? (
                <Text style={styles.winnerCrown}>🤝</Text>
              ) : scores[2] > scores[1] ? (
                <Text style={styles.winnerCrown}>👑</Text>
              ) : null}
            </LinearGradient>
          </View>

          <View style={styles.stats}>
            <Text style={styles.statsTitle}>📊 Statistiques</Text>
            <Text style={styles.stat}>✅ Mots trouvés : {cardsFound}</Text>
            <Text style={styles.stat}>🚫 Mots interdits dits : {cardsBuzzed}</Text>
            <Text style={styles.stat}>⏭️ Mots passés : {cardsPassed}</Text>
            <Text style={styles.stat}>🔀 Manches jouées : {turnNumber}</Text>
          </View>

          <GameButton
            title="Refaire une partie"
            emoji="🔁"
            colors={["#66BB6A", "#2E7D32"]}
            big
            onPress={() =>
              navigation.reset({
                index: 1,
                routes: [
                  { name: "Home" },
                  {
                    name: "TeamSetup",
                    params: {
                      mode,
                      level,
                      time: route.params?.time,
                      levelInfo: route.params?.levelInfo,
                    },
                  },
                ],
              })
            }
            style={styles.againBtn}
          />
          <GameButton
            title="Accueil"
            emoji="🏠"
            colors={["#FF7043", "#D32F2F"]}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: "Home" }] })
            }
            style={styles.homeBtn}
          />
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
    padding: 20,
  },
  trophy: { fontSize: 60, marginTop: 16 },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1B5E20",
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#33691E",
    marginTop: 4,
  },
  podium: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 18,
  },
  podiumCard: {
    alignItems: "center",
    borderRadius: 22,
    padding: 18,
    width: "44%",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  podiumMascot: { fontSize: 40 },
  podiumName: { fontSize: 15, fontWeight: "900", color: "#37474F", textAlign: "center", marginTop: 4 },
  podiumScore: { fontSize: 40, fontWeight: "900", color: "#D32F2F", marginTop: 4 },
  podiumLabel: { fontSize: 13, fontWeight: "800", color: "#757575" },
  winnerCrown: { fontSize: 30, position: "absolute", top: -18 },
  stats: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    padding: 18,
    width: "94%",
    marginTop: 20,
    alignSelf: "center",
  },
  statsTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1565C0",
    marginBottom: 8,
  },
  stat: {
    fontSize: 15,
    fontWeight: "700",
    color: "#37474F",
    marginVertical: 3,
  },
  againBtn: { width: "94%", marginTop: 20 },
  homeBtn: { width: "70%", marginTop: 6 },
});