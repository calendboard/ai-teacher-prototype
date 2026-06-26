// יצירת תמונה דרך Cloudflare Workers AI (flux). דורש binding בשם AI בהגדרות הפרויקט.
export async function onRequestPost({ request, env }) {
  try {
    if (!env.AI) {
      return new Response(JSON.stringify({ error: "Missing AI binding" }), { status: 500, headers: { "content-type": "application/json" } });
    }
    const { prompt } = await request.json();
    const out = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt: (prompt || "a simple colorful illustration").slice(0, 400) });
    return new Response(JSON.stringify({ image: out.image }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
