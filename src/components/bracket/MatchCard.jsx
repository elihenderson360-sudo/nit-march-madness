function TeamButton({ team, selected, onClick }) {
  return (
    <button
      type="button"
      className={`team-button ${selected ? "team-button--selected" : ""}`}
      aria-pressed={selected}
      disabled={!team}
      onClick={team ? () => onClick(team) : undefined}
    >
      <span className="team-button__badge">{team ? "Pick" : "TBD"}</span>
      <span className="team-button__name">{team || "TBD"}</span>
    </button>
  );
}

export function MatchCard({ title, detail, game, onPick, compact = false }) {
  return (
    <article className={`match-card ${compact ? "match-card--compact" : ""}`}>
      <div className="match-card__header">
        <span className="match-card__title">{title}</span>
        <span className="match-card__detail">{detail}</span>
      </div>

      <div className="match-card__teams">
        <TeamButton
          team={game.teams[0]}
          selected={game.winner === game.teams[0]}
          onClick={onPick}
        />
        <TeamButton
          team={game.teams[1]}
          selected={game.winner === game.teams[1]}
          onClick={onPick}
        />
      </div>
    </article>
  );
}
