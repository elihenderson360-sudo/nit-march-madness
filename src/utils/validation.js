export function validateBeforeSubmit(state) {
  if (!state.entrant.name.trim()) {
    return "Please enter a name.";
  }

  if (!state.entrant.email.trim()) {
    return "Please enter an email.";
  }

  if (!/^\S+@\S+\.\S+$/.test(state.entrant.email.trim())) {
    return "Please enter a valid email.";
  }

  if (!state.championship.winner) {
    return "Please pick a champion before submitting.";
  }

  if (!state.tiebreakers.total) {
    return "Please enter the whole tournament 3-point tiebreaker total.";
  }

  return null;
}

