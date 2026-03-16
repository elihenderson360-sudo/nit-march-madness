export function ChampionSummary({ championName, saveStatus }) {
  return (
    <section className="champion-summary panel">
      <div>
        <p className="eyebrow">Current Champion Pick</p>
        <h2>{championName}</h2>
      </div>

      <div className="save-status">{saveStatus}</div>
    </section>
  );
}

