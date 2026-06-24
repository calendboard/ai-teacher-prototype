// פרוקסי ל-ElevenLabs (קול). המפתח נשמר כסוד בשרת (env.ELEVENLABS_KEY), לא בדפדפן.
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ELEVENLABS_KEY) {
      return new Response(JSON.stringify({ detail: { message: "Server missing ELEVENLABS_KEY" } }), { status: 500, headers: { "content-type": "application/json" } });
    }
    const { text, voice_id, model_id } = await request.json();
    const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + encodeURIComponent(voice_id), {
      method: "POST",
      headers: {
        "xi-api-key": env.ELEVENLABS_KEY,
        "content-type": "application/json",
        "accept": "audio/mpeg"
      },
      body: JSON.stringify({ text, model_id })
    });
    if (!r.ok) {
      return new Response(await r.text(), { status: r.status, headers: { "content-type": "application/json" } });
    }
    return new Response(r.body, { status: 200, headers: { "content-type": "audio/mpeg" } });
  } catch (e) {
    return new Response(JSON.stringify({ detail: { message: String(e) } }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
