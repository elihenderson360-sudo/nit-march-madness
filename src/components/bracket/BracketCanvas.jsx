import { HalfBracket } from "./HalfBracket";
import { FinalsStage } from "./FinalsStage";

export function BracketCanvas({
  state,
  championName,
  onPickWinner,
  onPickSemifinal,
  onPickChampion
}) {
  return (
    <section className="bracket-shell">
      <div className="bracket-shell__header">
        <div className="bracket-region-label">Left Side</div>
        <div className="bracket-region-label bracket-region-label--center">Finals Stage</div>
        <div className="bracket-region-label bracket-region-label--right">Right Side</div>
      </div>

      <div className="bracket-scroll">
        <div className="bracket-board">
          <HalfBracket
            topSection={state.leftTop}
            topSectionKey="leftTop"
            bottomSection={state.leftBottom}
            bottomSectionKey="leftBottom"
            onPickWinner={onPickWinner}
          />

          <FinalsStage
            semifinals={state.semifinals}
            championship={state.championship}
            championName={championName}
            onPickSemifinal={onPickSemifinal}
            onPickChampion={onPickChampion}
          />

          <HalfBracket
            topSection={state.rightTop}
            topSectionKey="rightTop"
            bottomSection={state.rightBottom}
            bottomSectionKey="rightBottom"
            onPickWinner={onPickWinner}
            invert
          />
        </div>
      </div>
    </section>
  );
}
