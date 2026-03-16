import { TIEBREAKER_FIELDS } from "../../constants/bracket";

export function TiebreakerForm({ tiebreakers, onChange }) {
  return (
    <section className="panel form-panel">
      <div className="panel__header">
        <p className="eyebrow">Tiebreakers</p>
        <h2>Total 3-pointers made by round</h2>
      </div>

      <div className="form-grid form-grid--three">
        {TIEBREAKER_FIELDS.map((field) => (
          <label key={field.key} className="field">
            <span>{field.label}</span>
            <input
              type="number"
              min="0"
              value={tiebreakers[field.key]}
              placeholder={field.placeholder}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

