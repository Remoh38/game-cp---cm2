import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import ThemeBackground from "../components/ThemeBackground";
import GameButton from "../components/GameButton";

const MASCOTS = ["🦁", "🐯", "🦊", "🐻", "🐸", "🦖", "🐧", "🦄", "🐰", "🐨"];

export default function TeamSetupScreen({ navigation, route }) {
  const { mode, level, time, levelInfo } = route.params || {};
  const [teamAName, setTeamAName] = useState("Équipe Rouge");
  const [teamBName, setTeamBName] = useState("Équipe Bleue");
  const [mascotA, setMascotA] = useState("🦁");
  const [mascotB, setMascotB] = useState("🐯");

  const startGame = () => {
    navigation.navigate("Game", {
      mode,
      level,
      time,
      levelInfo,
      teamA: { name: teamAName.trim() || "Équipe Rouge", mascot: mascotA },
      teamB: { name: teamBName.trim() || "Équipe Bleue", mascot: mascotB },
    });
  };

  const renderMascotPicker = (selected, onChange) => {
    return (
      <View style={styles.mascotRow}>
        {MASCOTS.map((m) => (
          <Pressable
            key={m}
            onPress={() => onChange(m)}
            style={[
              styles.mascot,
              selected === m && styles.mascotSelected,
            ]}
          >
            <Text style={{ fontSize: 26 }}>{m}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground ground={false}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>👥 Prépare tes équipes !</Text>
          <Text style={styles.subtitle}>
            {levelInfo?.emoji} Niveau {level} • {mode === "local" ? "🗂️ Mots locaux" : "🤖 Mode IA"}
          </Text>

          <View style={[styles.teamCard, { backgroundColor: "#FFCDD2" }]}>
            <Text style={styles.teamTitle}>🔴 ÉQUIPE 1</Text>
            <TextInput
              value={teamAName}
              onChangeText={setTeamAName}
              style={styles.input}
              placeholder="Nom de l'équipe 1"
              placeholderTextColor="#999"
              maxLength={18}
            />
            <Text style={styles.mascotLabel}>Choisis ta mascotte :</Text>
            {renderMascotPicker(mascotA, setMascotA)}
          </View>

          <View style={styles.vs}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={[styles.teamCard, { backgroundColor: "#BBDEFB" }]}>
            <Text style={[styles.teamTitle, { color: "#0D47A1" }]}>🔵 ÉQUIPE 2</Text>
            <TextInput
              value={teamBName}
              onChangeText={setTeamBName}
              style={styles.input}
              placeholder="Nom de l'équipe 2"
              placeholderTextColor="#999"
              maxLength={18}
            />
            <Text style={styles.mascotLabel}>Choisis ta mascotte :</Text>
            {renderMascotPicker(mascotB, setMascotB)}
          </View>

          <View style={styles.rulesCard}>
            <Text style={styles.rulesTitle}>📜 Comment jouer ?</Text>
            <Text style={styles.rulesText}>
              🃏 1 joueur de l'équipe fait deviner le mot sans dire les mots interdits !
            </Text>
            <Text style={styles.rulesText}>⏱️ {time} secondes par manche.</Text>
            <Text style={styles.rulesText}>
              ✅ Trouvé : +1 point • 🚫 Mot interdit : +1 point pour l'autre équipe
            </Text>
            <Text style={styles.rulesText}>🔀 À la fin du temps, l'autre équipe joue !</Text>
          </View>

          <GameButton
            title="C'est parti !"
            emoji="🚀"
            colors={["#66BB6A", "#2E7D32"]}
            big
            onPress={startGame}
            style={styles.startBtn}
          />
          <GameButton
            title="Retour"
            emoji="⬅️"
            colors={["#90A4AE", "#546E7A"]}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          />
        </ScrollView>
      </ThemeBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1B5E20",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#33691E",
    marginBottom: 14,
  },
  teamCard: {
    width: "94%",
    borderRadius: 20,
    padding: 16,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#B71C1C",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },
  mascotLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    marginTop: 12,
    marginBottom: 6,
  },
  mascotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mascot: {
    padding: 4,
    borderRadius: 12,
    margin: 3,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  mascotSelected: {
    backgroundColor: "#FFF176",
    borderWidth: 2,
    borderColor: "#F9A825",
  },
  vs: {
    marginVertical: 10,
  },
  vsText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#D32F2F",
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  rulesCard: {
    width: "94%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  rulesTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1565C0",
    marginBottom: 8,
  },
  rulesText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37474F",
    marginVertical: 2,
    lineHeight: 20,
  },
  startBtn: { width: "94%", marginTop: 16 },
  backBtn: { width: "60%", marginTop: 4 },
});