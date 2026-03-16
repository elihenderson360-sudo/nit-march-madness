import { BRACKET_HEADER_ITEMS } from "../../constants/bracket";

export function BracketTopBar() {
  return (
    <section className="round-bar panel">
      <div className="round-bar__title-row">
        <div>
          <p className="eyebrow">Bracket Board</p>
          <h2>Pick each round and let the field advance</h2>
        </div>
      </div>

      <div className="round-bar__grid">
        {BRACKET_HEADER_ITEMS.map((item) => (
          <div key={`${item.title}-${item.subtitle}`} className="round-bar__item">
            <span>{item.title}</span>
            <small>{item.subtitle}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

