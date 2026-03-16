export function ReceiptSection({ receiptText, onCopy, onDownload }) {
  return (
    <section className="panel form-panel receipt-panel">
      <div className="panel__header">
        <p className="eyebrow">Receipt</p>
        <h2>Keep a copy of this entry</h2>
      </div>

      <textarea value={receiptText} readOnly />

      <div className="receipt-actions">
        <button type="button" className="button button--ghost" onClick={onCopy}>
          Copy Receipt
        </button>
        <button type="button" className="button button--ghost" onClick={onDownload}>
          Download Receipt
        </button>
      </div>
    </section>
  );
}

