import { MatchCard } from "./MatchCard";

const NORMAL_LINES = [
  [33, 23, 8, 1],
  [33, 40, 8, 1],
  [41, 23, 1, 18],
  [33, 56, 8, 1],
  [33, 73, 8, 1],
  [41, 56, 1, 18],
  [62, 33, 10, 1],
  [62, 64, 10, 1],
  [72, 33, 1, 32],
  [62, 54, 8, 1],
  [62, 86, 8, 1],
  [70, 54, 1, 33],
  [84, 49, 9, 1],
  [84, 80, 9, 1],
  [93, 49, 1, 32]
];

function ConnectorLines({ invert }) {
  const lines = invert
    ? [
        [18, 23, 8, 1],
        [18, 40, 8, 1],
        [26, 23, 1, 18],
        [18, 56, 8, 1],
        [18, 73, 8, 1],
        [26, 56, 1, 18],
        [48, 33, 10, 1],
        [48, 64, 10, 1],
        [58, 33, 1, 32],
        [48, 54, 8, 1],
        [48, 86, 8, 1],
        [56, 54, 1, 33],
        [73, 49, 9, 1],
        [73, 80, 9, 1],
        [82, 49, 1, 32]
      ]
    : NORMAL_LINES;

  return (
    <div className="connector-layer" aria-hidden="true">
      {lines.map(([left, top, width, height], index) => (
        <div
          key={`${left}-${top}-${index}`}
          className="connector-line"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: height === 1 ? `${width}%` : "2px",
            height: height === 1 ? "2px" : `${height}%`
          }}
        />
      ))}
    </div>
  );
}

function RoundColumn({
  title,
  roundKey,
  topSection,
  topSectionKey,
  bottomSection,
  bottomSectionKey,
  onPickWinner
}) {
  const topGames = topSection[roundKey];
  const bottomGames = bottomSection[roundKey];
  const roundClass =
    roundKey === "round1"
      ? "round-column round-column--round1"
      : roundKey === "round2"
        ? "round-column round-column--round2"
        : "round-column round-column--round3";

  return (
    <div className={roundClass}>
      <div className="round-column__title">{title}</div>

      <div className="round-column__groups">
        <div className="round-group">
          {topGames.map((game, index) => (
            <MatchCard
              key={game.id}
              title={`${topSection.name} - ${title} ${index + 1}`}
              game={game}
              detail={roundKey === "round1" ? "Choose one team to advance" : "Winner advances"}
              onPick={(team) => onPickWinner(topSectionKey, roundKey, index, team)}
            />
          ))}
        </div>

        <div className="round-group">
          {bottomGames.map((game, index) => (
            <MatchCard
              key={game.id}
              title={`${bottomSection.name} - ${title} ${index + 1}`}
              game={game}
              detail={roundKey === "round1" ? "Choose one team to advance" : "Winner advances"}
              onPick={(team) => onPickWinner(bottomSectionKey, roundKey, index, team)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HalfBracket({
  topSection,
  topSectionKey,
  bottomSection,
  bottomSectionKey,
  onPickWinner,
  invert = false
}) {
  const columns = [
    <RoundColumn
      key="round1"
      title="First Round"
      roundKey="round1"
      topSection={topSection}
      topSectionKey={topSectionKey}
      bottomSection={bottomSection}
      bottomSectionKey={bottomSectionKey}
      onPickWinner={onPickWinner}
    />,
    <RoundColumn
      key="round2"
      title="Second Round"
      roundKey="round2"
      topSection={topSection}
      topSectionKey={topSectionKey}
      bottomSection={bottomSection}
      bottomSectionKey={bottomSectionKey}
      onPickWinner={onPickWinner}
    />,
    <RoundColumn
      key="round3"
      title="Quarterfinal"
      roundKey="round3"
      topSection={topSection}
      topSectionKey={topSectionKey}
      bottomSection={bottomSection}
      bottomSectionKey={bottomSectionKey}
      onPickWinner={onPickWinner}
    />
  ];

  if (invert) {
    columns.reverse();
  }

  return (
    <div className={`half-bracket ${invert ? "half-bracket--invert" : ""}`}>
      <ConnectorLines invert={invert} />
      {columns}
    </div>
  );
}
