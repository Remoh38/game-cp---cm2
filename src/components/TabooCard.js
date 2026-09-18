import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabooCard({ card, index }) {
  if (!card) return null;

  return (
    <LinearGradient
      colors={["#FFF8E1", "#FFECB3", "#FFE082"]}
      style={styles.card}
    >
      <View style={styles.sticker}>
        <Text style={styles.stickerText}>
          {index != null ? `CARTE ${index}` : "TABOO"}
        </Text>
      </View>
      <Text style={styles.word}>{card.word}</Text>
      {card.theme ? <Text style={styles.theme}>{card.theme} 🌿</Text> : null}
      <View style={styles.divider} />
      <Text style={styles.forbiddenTitle}>🚫 MOTS INTERDITS</Text>
      <View style={styles.forbiddenList}>
        {card.forbidden.map((f, i) => (
          <View key={i} style={styles.forbiddenItem}>
            <Text style={styles.forbiddenBullet}>•</Text>
            <Text style={styles.forbiddenText}>{f}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "92%",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  sticker: {
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 10,
  },
  stickerText: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 2,
  },
  word: {
    fontSize: 30,
    fontWeight: "900",
    color: "#37474F",
    textAlign: "center",
  },
  theme: {
    marginTop: 4,
    fontSize: 15,
    color: "#558B2F",
    fontWeight: "700",
  },
  divider: {
    height: 3,
    width: "80%",
    backgroundColor: "#D7CCC8",
    marginVertical: 12,
    borderRadius: 3,
  },
  forbiddenTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D32F2F",
    letterSpacing: 1,
  },
  forbiddenList: {
    marginTop: 8,
    alignSelf: "stretch",
    paddingHorizontal: 12,
  },
  forbiddenItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  forbiddenBullet: {
    fontSize: 18,
    color: "#D32F2F",
    marginRight: 8,
    fontWeight: "900",
  },
  forbiddenText: {
    fontSize: 17,
    color: "#455A64",
    fontWeight: "700",
  },
});