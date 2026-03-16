import { MatchCard } from "./MatchCard";

export function FinalsStage({
  semifinals,
  championship,
  championName,
  onPickSemifinal,
  onPickChampion
}) {
  return (
    <aside className="finals-stage">
      <div className="finals-stage__promo">
        <p className="eyebrow">Finals Stage</p>
        <h3>Finish the bracket in the middle of the board.</h3>
        <p>
          Work through the left and right sides, then lock in the semifinals and
          championship pick here.
        </p>
      </div>

      <div className="finals-stage__games">
        <MatchCard
          title="Semifinal 1"
          detail="Left side winners"
          game={semifinals[0]}
          compact
          onPick={(team) => onPickSemifinal(0, team)}
        />
        <MatchCard
          title="Semifinal 2"
          detail="Right side winners"
          game={semifinals[1]}
          compact
          onPick={(team) => onPickSemifinal(1, team)}
        />
        <MatchCard
          title="Championship"
          detail="Choose your tournament winner"
          game={championship}
          compact
          onPick={onPickChampion}
        />
      </div>

      <div className="finals-stage__champion">
        <p className="eyebrow">Champion</p>
        <h3>{championName}</h3>
      </div>
    </aside>
  );
}

