class GameManager {
  constructor(teamAName = "Équipe 1", teamBName = "Équipe 2") {
    this.teams = [
      { id: 1, name: teamAName, score: 0 },
      { id: 2, name: teamBName, score: 0 },
    ];
    this.currentTeamId = 1;
    this.active = false;
  }

  get currentTeam() {
    return this.teams.find((t) => t.id === this.currentTeamId);
  }

  nextTeam() {
    this.currentTeamId = this.currentTeamId === 1 ? 2 : 1;
    return this.currentTeam;
  }

  addScore(teamId, points = 1) {
    const team = this.teams.find((t) => t.id === teamId);
    if (team) team.score += points;
  }

  reset() {
    this.teams.forEach((t) => (t.score = 0));
    this.currentTeamId = 1;
    this.active = false;
  }

  shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

export default GameManager;