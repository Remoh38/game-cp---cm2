import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemeBackground from "../components/ThemeBackground";
import TabooCard from "../components/TabooCard";
import GameButton from "../components/GameButton";
import tabooWords from "../data/tabooWords";
import aiService from "../utils/aiService";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameScreen({ navigation, route }) {
  const { mode, level, time, teamA, teamB } = route.params || {};

  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [currentTeam, setCurrentTeam] = useState(1);
  const [timeLeft, setTimeLeft] = useState(time);
  const [card, setCard] = useState(null);
  const [cardIndex, setCardIndex] = useState(1);
  const [phase, setPhase] = useState("playing"); // playing | turnEnd
  const [deck, setDeck] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [cardsFound, setCardsFound] = useState(0);
  const [cardsBuzzed, setCardsBuzzed] = useState(0);
  const [cardsPassed, setCardsPassed] = useState(0);
  const [turnNumber, setTurnNumber] = useState(1);
  const [turnPoints, setTurnPoints] = useState(0);

  const deckRef = useRef([]);
  const aiModeRef = useRef(mode === "ai");
  const shouldRunTimer = phase === "playing";

  useEffect(() => {
    if (!shouldRunTimer) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [shouldRunTimer]);

  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      setPhase("turnEnd");
    }
  }, [timeLeft, phase]);

  const fetchCard = useCallback(async () => {
    if (aiModeRef.current) {
      if (deckRef.current.length === 0) {
        setAiLoading(true);
        try {
          const c = await aiService.generateTabooCard(level);
          const extra = await Promise.all(
            Array.from({ length: 4 }, () => aiService.generateTabooCard(level))
          );
          deckRef.current = [c].concat(extra);
          setDeck(deckRef.current);
        } finally {
          setAiLoading(false);
        }
        if (deckRef.current.length === 0) return null;
      }
      const nextCard = deckRef.current.shift();
      setDeck([...deckRef.current]);
      return nextCard;
    } else {
      if (deckRef.current.length === 0) {
        deckRef.current = shuffle(tabooWords[level] || tabooWords["CE2-CM1"]);
      }
      const nextCard = deckRef.current.shift();
      setDeck([...deckRef.current]);
      return nextCard;
    }
  }, [level]);

  const loadNextCard = useCallback(async () => {
    const c = await fetchCard();
    if (c) {
      setCard(c);
      setCardIndex((i) => i + 1);
    } else {
      setCard(null);
    }
  }, [fetchCard]);

  const beginTurn = useCallback(async () => {
    setTimeLeft(time);
    setPhase("playing");
    setTurnPoints(0);
    await loadNextCard();
  }, [time, loadNextCard]);

  useEffect(() => {
    let cancelled = false;
    beginTurn();
    return () => {
      cancelled = true;
    };
  }, [beginTurn]);

  const handleFound = () => {
    if (phase !== "playing") return;
    setScores((s) => ({ ...s, [currentTeam]: s[currentTeam] + 1 }));
    setCardsFound((c) => c + 1);
    setTurnPoints((p) => p + 1);
    loadNextCard();
  };

  const handleBuzz = () => {
    if (phase !== "playing") return;
    const other = currentTeam === 1 ? 2 : 1;
    setScores((s) => ({ ...s, [other]: s[other] + 1 }));
    setCardsBuzzed((c) => c + 1);
    setTurnPoints((p) => p - 1);
    loadNextCard();
  };

  const handlePass = () => {
    if (phase !== "playing") return;
    setCardsPassed((c) => c + 1);
    loadNextCard();
  };

  const nextTeam = () => {
    setCurrentTeam((t) => (t === 1 ? 2 : 1));
    setTurnNumber((n) => n + 1);
    beginTurn();
  };

  const endGame = () => {
    navigation.replace("GameOver", {
      teamA,
      teamB,
      scores,
      level,
      mode,
      time,
      levelInfo: route.params?.levelInfo,
      cardsFound,
      cardsBuzzed,
      cardsPassed,
      turnNumber,
    });
  };

  const confirmEndGame = () => {
    Alert.alert(
      "🏁 Terminer la partie ?",
      "Les scores seront affichés à la fin.",
      [
        { text: "Continuer", style: "cancel" },
        { text: "Terminer", onPress: endGame },
      ]
    );
  };

  const team = currentTeam === 1 ? teamA : teamB;
  const other = currentTeam === 1 ? teamB : teamA;

  return (
    <SafeAreaView style={styles.safe}>
      <ThemeBackground ground={false} decor={false}>
        <View style={styles.header}>
          <View style={[styles.teamScore, currentTeam === 1 && styles.activeTeam]}>
            <Text style={styles.mascot}>{teamA.mascot}</Text>
            <Text style={styles.teamName} numberOfLines={1}>{teamA.name}</Text>
            <Text style={styles.score}>{scores[1]}</Text>
          </View>
          <View style={styles.centerInfo}>
            <Text style={styles.turnLabel}>Manche {turnNumber}</Text>
            <Pressable onPress={confirmEndGame}>
              <Text style={styles.endBtn}>🏁 Terminer</Text>
            </Pressable>
          </View>
          <View style={[styles.teamScore, currentTeam === 2 && styles.activeTeam]}>
            <Text style={styles.mascot}>{teamB.mascot}</Text>
            <Text style={styles.teamName} numberOfLines={1}>{teamB.name}</Text>
            <Text style={styles.score}>{scores[2]}</Text>
          </View>
        </View>

        <LinearGradient
          colors={timeLeft <= 10 ? ["#FFCDD2", "#EF9A9A"] : ["#E8F5E9", "#C8E6C9"]}
          style={styles.timerBox}
        >
          <Text style={styles.timerText}>⏱️ {timeLeft}s</Text>
        </LinearGradient>

        <View style={styles.speakerBanner}>
          <Text style={styles.speakerText}>
            🎤 {team.mascot} {team.name} doit faire deviner !
          </Text>
          <Text style={styles.speakerSub}>
            L'équipe {other.name} surveille les mots interdits 👀
          </Text>
        </View>

        <View style={styles.cardArea}>
          {aiLoading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#6A1B9A" />
              <Text style={styles.loadingText}>🤖 L'IA prépare une carte...{'\n'}Devine ce qui vient !</Text>
            </View>
          ) : card ? (
            <TabooCard card={card} index={cardIndex} />
          ) : (
            <View style={styles.loadingBox}>
              <Text style={styles.loadingText}>Aucune carte disponible 😢</Text>
            </View>
          )}
        </View>

        {phase === "playing" && card && (
          <View style={styles.actions}>
            <View style={styles.actionRow}>
              <GameButton
                title="Trouvé !"
                emoji="✅"
                colors={["#66BB6A", "#2E7D32"]}
                onPress={handleFound}
                style={styles.actionBtn}
              />
              <GameButton
                title="Mot interdit !"
                emoji="🚫"
                colors={["#FF7043", "#D32F2F"]}
                onPress={handleBuzz}
                style={styles.actionBtn}
              />
            </View>
            <View style={styles.actionRow}>
              <GameButton
                title="Passer"
                emoji="⏭️"
                colors={["#FFA726", "#EF6C00"]}
                onPress={handlePass}
                style={styles.passBtn}
              />
              <GameButton
                title="Fin de manche"
                emoji="🔀"
                colors={["#42A5F5", "#1565C0"]}
                onPress={() => setPhase("turnEnd")}
                style={styles.passBtn}
              />
            </View>
          </View>
        )}

        {phase === "turnEnd" && (
          <View style={styles.turnEndOverlay}>
            <Text style={styles.turnEndTitle}>⏰ Manche terminée !</Text>
            <Text style={styles.turnEndScore}>
              {team.mascot} {team.name} : {turnPoints} point{turnPoints > 1 ? "s" : ""}
            </Text>
            <Text style={styles.turnEndScores}>
              {teamA.mascot} {teamA.name} : {scores[1]}  •  {teamB.mascot} {teamB.name} : {scores[2]}
            </Text>
            <GameButton
              title={`Au tour de ${currentTeam === 1 ? teamB.name : teamA.name} !`}
              emoji="🔀"
              colors={["#66BB6A", "#2E7D32"]}
              big
              onPress={nextTeam}
              style={styles.nextBtn}
            />
          </View>
        )}
      </ThemeBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    zIndex: 5,
  },
  teamScore: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    width: "30%",
    borderWidth: 3,
    borderColor: "transparent",
  },
  activeTeam: {
    borderColor: "#FFF176",
    backgroundColor: "#FFFDE7",
  },
  mascot: { fontSize: 26 },
  teamName: { fontSize: 11, fontWeight: "800", color: "#455A64" },
  score: { fontSize: 26, fontWeight: "900", color: "#D32F2F" },
  centerInfo: { alignItems: "center", flex: 1 },
  turnLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  endBtn: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
    overflow: "hidden",
  },
  timerBox: {
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 8,
    zIndex: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  timerText: { fontSize: 26, fontWeight: "900", color: "#37474F" },
  speakerBanner: {
    alignItems: "center",
    marginTop: 8,
    zIndex: 5,
  },
  speakerText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1B5E20",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  speakerSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#33691E",
    marginTop: 4,
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    zIndex: 5,
  },
  loadingBox: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#4E342E",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
  },
  actions: {
    paddingBottom: 14,
    paddingHorizontal: 12,
    zIndex: 5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionBtn: { flex: 1, marginHorizontal: 6 },
  passBtn: { flex: 1, marginHorizontal: 6 },
  turnEndOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 20,
  },
  turnEndTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#E65100",
  },
  turnEndScore: {
    fontSize: 20,
    fontWeight: "800",
    color: "#37474F",
    marginTop: 14,
    textAlign: "center",
  },
  turnEndScores: {
    fontSize: 16,
    fontWeight: "700",
    color: "#546E7A",
    marginTop: 6,
    textAlign: "center",
  },
  nextBtn: { width: "85%", marginTop: 20 },
});