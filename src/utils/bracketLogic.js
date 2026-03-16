import { SECTION_KEYS } from "../constants/bracket";
import { INITIAL_STATE } from "../data/initialState";

export function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createInitialState() {
  return cloneState(INITIAL_STATE);
}

export function rebuildSection(section) {
  section.round2 = section.round2.map((game, index) => {
    const teams = [
      section.round1[index * 2]?.winner || null,
      section.round1[index * 2 + 1]?.winner || null
    ];

    return {
      ...game,
      teams,
      winner: teams.includes(game.winner) ? game.winner : null
    };
  });

  section.round3 = section.round3.map((game) => {
    const teams = [section.round2[0]?.winner || null, section.round2[1]?.winner || null];

    return {
      ...game,
      teams,
      winner: teams.includes(game.winner) ? game.winner : null
    };
  });
}

export function rebuildFinals(state) {
  state.semifinals[0].teams = [state.leftTop.round3[0].winner, state.leftBottom.round3[0].winner];
  if (!state.semifinals[0].teams.includes(state.semifinals[0].winner)) {
    state.semifinals[0].winner = null;
  }

  state.semifinals[1].teams = [state.rightTop.round3[0].winner, state.rightBottom.round3[0].winner];
  if (!state.semifinals[1].teams.includes(state.semifinals[1].winner)) {
    state.semifinals[1].winner = null;
  }

  state.championship.teams = [state.semifinals[0].winner, state.semifinals[1].winner];
  if (!state.championship.teams.includes(state.championship.winner)) {
    state.championship.winner = null;
  }
}

export function hydrateState(candidate) {
  const next = createInitialState();

  if (!candidate || typeof candidate !== "object") {
    return next;
  }

  if (candidate.entrant && typeof candidate.entrant === "object") {
    next.entrant.name = typeof candidate.entrant.name === "string" ? candidate.entrant.name : "";
    next.entrant.email = typeof candidate.entrant.email === "string" ? candidate.entrant.email : "";
    next.entrant.handle = typeof candidate.entrant.handle === "string" ? candidate.entrant.handle : "";
  }

  if (candidate.tiebreakers && typeof candidate.tiebreakers === "object") {
    Object.keys(next.tiebreakers).forEach((key) => {
      next.tiebreakers[key] =
        typeof candidate.tiebreakers[key] === "string" ? candidate.tiebreakers[key] : "";
    });
  }

  next.submittedAt =
    typeof candidate.submittedAt === "string" ? candidate.submittedAt : null;

  SECTION_KEYS.forEach((sectionKey) => {
    ["round1", "round2", "round3"].forEach((roundKey) => {
      const savedGames = candidate[sectionKey]?.[roundKey];

      if (!Array.isArray(savedGames)) {
        return;
      }

      next[sectionKey][roundKey] = next[sectionKey][roundKey].map((game, index) => ({
        ...game,
        winner:
          typeof savedGames[index]?.winner === "string" ? savedGames[index].winner : null
      }));
    });
  });

  if (Array.isArray(candidate.semifinals)) {
    next.semifinals = next.semifinals.map((game, index) => ({
      ...game,
      winner:
        typeof candidate.semifinals[index]?.winner === "string"
          ? candidate.semifinals[index].winner
          : null
    }));
  }

  if (candidate.championship && typeof candidate.championship === "object") {
    next.championship.winner =
      typeof candidate.championship.winner === "string" ? candidate.championship.winner : null;
  }

  SECTION_KEYS.forEach((sectionKey) => rebuildSection(next[sectionKey]));
  rebuildFinals(next);

  return next;
}

