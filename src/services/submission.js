export async function submitBracket(payload) {
  try {
    const response = await fetch("/api/submit-bracket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Submission failed.");
    }

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.message || "Submission failed.");
    }

    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 350);
      });

      return {
        ok: true,
        entryId: `nit-local-${Date.now()}`,
        receivedAt: new Date().toISOString(),
        mode: "dev-fallback"
      };
    }

    throw error;
  }
}

