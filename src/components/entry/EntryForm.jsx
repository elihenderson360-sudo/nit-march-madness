export function EntryForm({ entrant, onChange }) {
  return (
    <section className="panel form-panel">
      <div className="panel__header">
        <p className="eyebrow">Entry Info</p>
        <h2>Tell us who this bracket belongs to</h2>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={entrant.name}
            placeholder="Your name"
            onChange={(event) => onChange("name", event.target.value)}
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={entrant.email}
            placeholder="you@example.com"
            onChange={(event) => onChange("email", event.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Substack handle or social handle (optional)</span>
        <input
          type="text"
          value={entrant.handle}
          placeholder="@yourhandle"
          onChange={(event) => onChange("handle", event.target.value)}
        />
      </label>

      <div className="notice-box">
        Each bracket stays saved on this device through local browser storage, so users can
        leave and come back later without losing their picks.
      </div>
    </section>
  );
}

