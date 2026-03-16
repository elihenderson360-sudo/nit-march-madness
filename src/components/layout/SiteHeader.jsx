export function SiteHeader({ onReset, onDownloadReceipt, onCopyReceipt }) {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">College Front Office</p>
        <h1>2026 NIT Bracket Challenge</h1>
        <p className="site-header__subtitle">
          A full React rebuild of the original single-file bracket, now structured for a
          bigger website-style presentation and Netlify deployment.
        </p>
      </div>

      <div className="site-header__actions">
        <div className="season-pill">2026</div>
        <button type="button" className="button button--ghost" onClick={onReset}>
          Reset Bracket
        </button>
        <button type="button" className="button button--ghost" onClick={onDownloadReceipt}>
          Download Receipt
        </button>
        <button type="button" className="button button--primary" onClick={onCopyReceipt}>
          Copy Picks
        </button>
      </div>
    </header>
  );
}

