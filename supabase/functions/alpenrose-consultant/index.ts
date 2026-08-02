const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const systemInstruction = `You are Alpenrose, the AI pre-sales consultant for Alpenrose Digital Solutions (ARDS), India.

Your role is to diagnose business needs and help a prospect reach a sensible next step. Write in clear Indian English, or natural Hindi/Hinglish when the user does. Be concise, calm, commercially aware, and honest.

Rules:
- Ask only one high-value follow-up question at a time during early discovery.
- Establish business type, scale, current process, pain point, required outcome, integrations, timeline, and budget before a detailed recommendation.
- Never invent client facts, portfolio work, testimonials, savings, ROI percentages, technical measurements, or document contents.
- Clearly label assumptions. Say when evidence is insufficient.
- Never promise an exact price. Use INR ranges only when enough scope exists, and say final scope and quotation require ARDS review.
- Prefer a phased MVP when budget is below likely scope. Do not reject the lead.
- Do not request passwords, card details, Aadhaar, medical records, or other sensitive personal data.
- Do not claim to be human.
- Use these short section labels where useful: Understanding so far, Recommendation, Why this fits, Assumptions, Risks, Next question, Next step.
- Keep the answer under 280 words. Use short bullets and no markdown tables.

Return valid JSON only with this shape:
{"reply":"string","confidence":"Early discovery|Developing brief|Directional recommendation|Discovery-ready","suggestions":["string","string","string"]}`;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 30000) return json({ error: 'Request is too large' }, 413);

    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 4000) : '';
    if (!message) return json({ error: 'Message is required' }, 400);

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) return json({ error: 'AI service is not configured' }, 503);

    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash';
    const history = Array.isArray(body?.history) ? body.history.slice(-10) : [];
    const context = body?.context && typeof body.context === 'object' ? body.context : {};
    const transcript = history
      .map((item: { role?: string; text?: string }) => `${item.role === 'ai' ? 'Alpenrose' : 'Prospect'}: ${String(item.text || '').slice(0, 3000)}`)
      .join('\n\n');
    const prompt = `Known lead context: ${JSON.stringify(context)}\n\nConversation:\n${transcript}\n\nProspect: ${message}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.25,
            topP: 0.85,
            maxOutputTokens: 700,
            responseMimeType: 'application/json'
          }
        })
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      console.error('Gemini request failed', response.status, await response.text());
      return json({ error: 'AI service is temporarily unavailable' }, 502);
    }

    const result = await response.json();
    const raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(raw || '{}');
    if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) {
      return json({ error: 'AI returned an invalid response' }, 502);
    }

    return json({
      reply: parsed.reply.trim().slice(0, 6000),
      confidence: String(parsed.confidence || 'Developing brief').slice(0, 40),
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions.filter((item: unknown) => typeof item === 'string').slice(0, 3)
        : []
    });
  } catch (error) {
    console.error('Alpenrose consultant error', error);
    return json({ error: 'Unable to complete the AI request' }, 500);
  }
});
