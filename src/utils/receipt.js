function formatSectionReceipt(section) {
  return [
    `${section.name}`,
    `  First Round Winners: ${section.round1.map((game) => game.winner || "TBD").join(" | ")}`,
    `  Second Round Winners: ${section.round2.map((game) => game.winner || "TBD").join(" | ")}`,
    `  Quarterfinal Winner: ${section.round3[0].winner || "TBD"}`
  ].join("\n");
}

export function buildReceiptText(state) {
  return [
    "2026 NIT BRACKET CHALLENGE RECEIPT",
    "",
    `Name: ${state.entrant.name || "Not provided"}`,
    `Email: ${state.entrant.email || "Not provided"}`,
    `Handle: ${state.entrant.handle || "Not provided"}`,
    `Submitted At: ${state.submittedAt || "Not submitted yet"}`,
    "",
    formatSectionReceipt(state.leftTop),
    "",
    formatSectionReceipt(state.leftBottom),
    "",
    formatSectionReceipt(state.rightTop),
    "",
    formatSectionReceipt(state.rightBottom),
    "",
    `Semifinal 1 Winner: ${state.semifinals[0].winner || "TBD"}`,
    `Semifinal 2 Winner: ${state.semifinals[1].winner || "TBD"}`,
    `Champion: ${state.championship.winner || "TBD"}`,
    "",
    "Tiebreakers - Total 3s Made",
    `First Round: ${state.tiebreakers.firstRound || ""}`,
    `Second Round: ${state.tiebreakers.secondRound || ""}`,
    `Quarterfinals: ${state.tiebreakers.quarterfinals || ""}`,
    `Semifinals: ${state.tiebreakers.semifinals || ""}`,
    `Championship: ${state.tiebreakers.championship || ""}`,
    `Whole Tournament Total: ${state.tiebreakers.total || ""}`
  ].join("\n");
}

export function buildReceiptFilename(state) {
  const safeName = (state.entrant.name || "nit_bracket_entry")
    .replace(/[^a-z0-9]+/gi, "_")
    .toLowerCase()
    .replace(/^_+|_+$/g, "");

  return `${safeName || "nit_bracket_entry"}_2026_nit_bracket.txt`;
}
