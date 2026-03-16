// Production: paste the deployed Google Apps Script web app URL here.
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxpkFcDADIldabG3I0H4WupmpT4TxpQPpe2_Yrdfc6iGyI7s5_H0gOQ1XoHGRCzMWT7/exec";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed." });
  }

  try {
    if (
      !GOOGLE_APPS_SCRIPT_WEB_APP_URL ||
      GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")
    ) {
      return jsonResponse(500, {
        ok: false,
        message: "Apps Script URL is not configured."
      });
    }

    const payload = JSON.parse(event.body || "{}");
    const entrant = payload.entrant || {};

    if (!entrant.name || !entrant.email || !payload.champion) {
      return jsonResponse(400, {
        ok: false,
        message: "Missing required bracket submission fields."
      });
    }

    const upstreamResponse = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const rawText = await upstreamResponse.text();
    let upstreamData = null;

    try {
      upstreamData = rawText ? JSON.parse(rawText) : null;
    } catch (error) {
      upstreamData = null;
    }

    if (!upstreamResponse.ok) {
      return jsonResponse(502, {
        ok: false,
        message: (upstreamData && (upstreamData.error || upstreamData.message)) || "Apps Script submission failed."
      });
    }

    if (upstreamData && upstreamData.ok === false) {
      return jsonResponse(502, {
        ok: false,
        message: upstreamData.error || upstreamData.message || "Apps Script submission failed."
      });
    }

    return jsonResponse(200, {
      ok: true,
      entryId: (upstreamData && upstreamData.entryId) || `nit-${Date.now()}`,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    return jsonResponse(400, {
      ok: false,
      message: error && error.message ? error.message : "Invalid submission payload."
    });
  }
};
