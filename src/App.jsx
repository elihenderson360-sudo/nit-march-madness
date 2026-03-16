import { useState } from "react";
import { SiteHeader } from "./components/layout/SiteHeader";
import { BracketTopBar } from "./components/bracket/BracketTopBar";
import { ChampionSummary } from "./components/layout/ChampionSummary";
import { BracketCanvas } from "./components/bracket/BracketCanvas";
import { EntryForm } from "./components/entry/EntryForm";
import { TiebreakerForm } from "./components/entry/TiebreakerForm";
import { SubmitSection } from "./components/submit/SubmitSection";
import { ReceiptSection } from "./components/receipt/ReceiptSection";
import { useBracketState } from "./hooks/useBracketState";
import { buildReceiptFilename, buildReceiptText } from "./utils/receipt";
import { validateBeforeSubmit } from "./utils/validation";
import { downloadTextFile } from "./utils/download";
import { submitBracket } from "./services/submission";

function App() {
  const {
    state,
    lastSavedAt,
    pickWinner,
    pickSemifinal,
    pickChampion,
    updateEntrant,
    updateTiebreaker,
    resetBracket,
    setSubmittedAt
  } = useBracketState();
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const receiptText = buildReceiptText(state);
  const championName = state.championship.winner || "No champion selected";
  const saveStatus = lastSavedAt
    ? `Autosaved locally - ${lastSavedAt.toLocaleTimeString()}`
    : "Autosaved locally";

  async function handleCopyReceipt() {
    try {
      await navigator.clipboard.writeText(receiptText);
      setSubmitMessage({ kind: "success", text: "Receipt copied to clipboard." });
    } catch (error) {
      setSubmitMessage({
        kind: "notice",
        text: "Clipboard access failed. You can still copy from the receipt box below."
      });
    }
  }

  function handleDownloadReceipt() {
    downloadTextFile(buildReceiptFilename(state), receiptText);
    setSubmitMessage({ kind: "success", text: "Receipt downloaded." });
  }

  function handleReset() {
    if (!window.confirm("Reset every pick on this bracket for this browser?")) {
      return;
    }

    resetBracket();
    setSubmitMessage({ kind: "success", text: "Bracket reset for this browser." });
  }

  async function handleSubmit() {
    const error = validateBeforeSubmit(state);
    if (error) {
      setSubmitMessage({ kind: "notice", text: error });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    const submittedAt = new Date().toISOString();
    const nextState = setSubmittedAt(submittedAt);

    try {
      const response = await submitBracket({
        entrant: nextState.entrant,
        submittedAt: nextState.submittedAt,
        champion: nextState.championship.winner,
        sections: {
          leftTop: nextState.leftTop,
          leftBottom: nextState.leftBottom,
          rightTop: nextState.rightTop,
          rightBottom: nextState.rightBottom
        },
        semifinals: nextState.semifinals,
        championship: nextState.championship,
        tiebreakers: nextState.tiebreakers,
        receipt: buildReceiptText(nextState)
      });

      setSubmitMessage({
        kind: "success",
        text: `Bracket submitted. Entry ID: ${response.entryId}.`
      });
    } catch (error) {
      setSubmitMessage({
        kind: "notice",
        text: "Submission failed. Your picks are still saved locally in this browser."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <SiteHeader
        onCopyReceipt={handleCopyReceipt}
        onDownloadReceipt={handleDownloadReceipt}
        onReset={handleReset}
      />

      <BracketTopBar />

      <main className="page-content">
        <ChampionSummary championName={championName} saveStatus={saveStatus} />

        <BracketCanvas
          state={state}
          championName={championName}
          onPickWinner={pickWinner}
          onPickSemifinal={pickSemifinal}
          onPickChampion={pickChampion}
        />

        <section className="support-grid">
          <EntryForm entrant={state.entrant} onChange={updateEntrant} />

          <TiebreakerForm
            tiebreakers={state.tiebreakers}
            onChange={updateTiebreaker}
          />

          <SubmitSection
            isSubmitting={isSubmitting}
            message={submitMessage}
            onSubmit={handleSubmit}
          />

          <ReceiptSection
            receiptText={receiptText}
            onCopy={handleCopyReceipt}
            onDownload={handleDownloadReceipt}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
