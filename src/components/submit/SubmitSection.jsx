export function SubmitSection({ isSubmitting, message, onSubmit }) {
  return (
    <section className="panel form-panel">
      <div className="panel__header">
        <p className="eyebrow">Submit</p>
        <h2>Send the bracket</h2>
      </div>

      <p className="panel-copy">
        This project is wired for Netlify deployment. The current submission route posts to a
        Netlify Function so it stays compatible with static hosting.
      </p>

      <button
        type="button"
        className="button button--primary button--full"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Bracket"}
      </button>

      {message ? (
        <div className={message.kind === "success" ? "message-box message-box--success" : "message-box"}>
          {message.text}
        </div>
      ) : null}
    </section>
  );
}

