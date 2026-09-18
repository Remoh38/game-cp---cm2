import config from "./config";

const AI_API_URL = "https://api.openai.com/v1/chat/completions";

class AIService {
  constructor() {
    this.apiKey = null;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  async generateTabooCard(level) {
    const prompt = this.buildPrompt(level);

    if (this.apiKey) {
      try {
        const res = await fetch(AI_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Tu es un générateur de cartes de jeu TABOO adapté aux enfants de 6 à 11 ans en France. Réponds UNIQUEMENT en JSON.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.8,
          }),
        });

        const data = await res.json();
        const content = data.choices?.[0]?.message?.content || "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (
            parsed.word &&
            Array.isArray(parsed.forbidden) &&
            parsed.forbidden.length >= 4
          ) {
            return {
              word: parsed.word,
              forbidden: parsed.forbidden.slice(0, 5),
              theme: parsed.theme || "IA",
              fromAI: true,
            };
          }
        }
      } catch (e) {
        console.warn("IA indisponible, bascule en local :", e.message);
      }
    }

    return this.heuristicCard(level);
  }

  buildPrompt(level) {
    return `Génère une carte TABOO (mot à deviner + 5 mots interdits) pour un enfant de niveau ${level} (France).
Contraintes :
- thème : nature, environnement, protection de la planète, animaux, école, quotidien de l'enfant
- vocabulaire adapté à l'âge (CP à CM2)
- les mots interdits ne doivent PAS contenir le mot à deviner ni ses racines
- le mot à deviner et les mots interdits doivent être des mots simples connus des enfants
Réponds ce JSON exact :
{ "word": "...", "forbidden": ["...", "...", "...", "...", "..."], "theme": "..." }`;
  }

  heuristicCard(level) {
    const bases = [
      {
        word: "Pingouin",
        forbidden: ["Oiseau", "Neige", "Glace", "Noir", "Blanc"],
        theme: "Animaux",
      },
      {
        word: "Récif",
        forbidden: ["Corail", "Poisson", "Mer", "Pierre", "Tropique"],
        theme: "Nature",
      },
      {
        word: "Hydroélectricité",
        forbidden: ["Eau", "Barrage", "Énergie", "Rivière", "Turbine"],
        theme: "Énergie",
      },
      {
        word: "Météorite",
        forbidden: ["Étoile", "Espace", "Chute", "Pierre", "Énorme"],
        theme: "Sciences",
      },
      {
        word: "Giboulée",
        forbidden: ["Pluie", "Printemps", "Nuage", "Froid", "Avril"],
        theme: "Météo",
      },
      {
        word: "Rorqual",
        forbidden: ["Baleine", "Mer", "Gros", "Mammifère", "Chante"],
        theme: "Animaux",
      },
      {
        word: "Éclipse",
        forbidden: ["Soleil", "Lune", "Ombre", "Noir", "Jour"],
        theme: "Sciences",
      },
      {
        word: "Foudre",
        forbidden: ["Orage", "Éclair", "Métal", "Ciel", "Électrique"],
        theme: "Météo",
      },
      {
        word: "Castor",
        forbidden: ["Barrage", "Bois", "Rivière", "Queue", "Dents"],
        theme: "Animaux",
      },
      {
        word: "Érable",
        forbidden: ["Grand", "Feuille", "Rouge", "Sirop", "Arbre"],
        theme: "Nature",
      },
    ];
    return bases[Math.floor(Math.random() * bases.length)];
  }
}

const aiService = new AIService();

try {
  if (config.OPENAI_API_KEY) {
    aiService.setApiKey(config.OPENAI_API_KEY);
  }
} catch (e) {
  // ignore
}

export default aiService;