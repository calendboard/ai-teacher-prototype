// פרוקסי ל-Claude (Anthropic). המפתח נשמר כסוד בשרת (env.ANTHROPIC_KEY), לא בדפדפן.
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ANTHROPIC_KEY) {
      return new Response(JSON.stringify({ error: { message: "Server missing ANTHROPIC_KEY" } }), { status: 500, headers: { "content-type": "application/json" } });
    }
    const body = await request.json();
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body)
    });
    return new Response(await r.text(), { status: r.status, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: { message: String(e) } }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
