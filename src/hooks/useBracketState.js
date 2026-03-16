import { useEffect, useReducer, useState } from "react";
import { STORAGE_KEY } from "../constants/storage";
import {
  createInitialState,
  cloneState,
  hydrateState,
  rebuildFinals,
  rebuildSection
} from "../utils/bracketLogic";

function reducer(state, action) {
  switch (action.type) {
    case "pick-winner": {
      const next = cloneState(state);
      next[action.sectionKey][action.roundKey][action.gameIndex].winner = action.team;
      rebuildSection(next[action.sectionKey]);
      rebuildFinals(next);
      return next;
    }

    case "pick-semifinal": {
      const next = cloneState(state);
      next.semifinals[action.index].winner = action.team;
      rebuildFinals(next);
      return next;
    }

    case "pick-champion": {
      const next = cloneState(state);
      next.championship.winner = action.team;
      return next;
    }

    case "update-entrant": {
      return {
        ...state,
        entrant: {
          ...state.entrant,
          [action.field]: action.value
        }
      };
    }

    case "update-tiebreaker": {
      return {
        ...state,
        tiebreakers: {
          ...state.tiebreakers,
          [action.field]: action.value
        }
      };
    }

    case "set-submitted-at": {
      return {
        ...state,
        submittedAt: action.value
      };
    }

    case "reset": {
      return createInitialState();
    }

    default:
      return state;
  }
}

function loadInitialState() {
  if (typeof window === "undefined") {
    return createInitialState();
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createInitialState();
    }

    return hydrateState(JSON.parse(saved));
  } catch (error) {
    return createInitialState();
  }
}

export function useBracketState() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setLastSavedAt(new Date());
  }, [state]);

  function pickWinner(sectionKey, roundKey, gameIndex, team) {
    dispatch({ type: "pick-winner", sectionKey, roundKey, gameIndex, team });
  }

  function pickSemifinal(index, team) {
    dispatch({ type: "pick-semifinal", index, team });
  }

  function pickChampion(team) {
    dispatch({ type: "pick-champion", team });
  }

  function updateEntrant(field, value) {
    dispatch({ type: "update-entrant", field, value });
  }

  function updateTiebreaker(field, value) {
    dispatch({ type: "update-tiebreaker", field, value });
  }

  function resetBracket() {
    dispatch({ type: "reset" });
  }

  function setSubmittedAt(value) {
    const nextState = {
      ...state,
      submittedAt: value
    };
    dispatch({ type: "set-submitted-at", value });
    return nextState;
  }

  return {
    state,
    lastSavedAt,
    pickWinner,
    pickSemifinal,
    pickChampion,
    updateEntrant,
    updateTiebreaker,
    resetBracket,
    setSubmittedAt
  };
}

