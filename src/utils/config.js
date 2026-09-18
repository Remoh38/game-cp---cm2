import aiService from "./aiService";

// ⚠️ Pour activer le vrai mode IA, mets ta clé OpenAI ici (ex: "sk-...").
// Si vide, le mode IA utilise un générateur de cartes local intelligent.
const OPENAI_API_KEY = "";

try {
  if (OPENAI_API_KEY) {
    aiService.setApiKey(OPENAI_API_KEY);
  }
} catch (e) {
  // ignore
}

export default { OPENAI_API_KEY };