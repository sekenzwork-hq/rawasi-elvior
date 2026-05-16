// AI Concierge edge function — recommends perfumes and adds to cart via tool calls.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, catalog } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are the Elvior Concierge — a refined, warm, knowledgeable fragrance advisor for Rawasi Elvior, a niche Indian luxury perfume house in the spirit of Chanel, Creed and Maison Francis Kurkdjian.

Tone: elegant, concise, sensorial. Use evocative scent language (warm amber, smoky oud, crisp bergamot). Never robotic. Use **bold** for product names. Keep replies under 90 words.

All prices are in Indian Rupees (₹). When mentioning a price, always format with the ₹ symbol (e.g. ₹15,900).

Your catalog (only recommend from this list, prices in INR):
${JSON.stringify(catalog, null, 2)}

Rules:
- When you recommend products, ALWAYS call the "recommend" tool with their product_ids so the UI can show cards.
- When the user explicitly says to add something to the cart, build a bundle, "add it", "I'll take it", etc., call "add_to_cart" with the items.
- Style/bundle suggestions: pair complementary scents (e.g. one bold + one fresh), keep within any stated budget (in ₹).
- If asked something off-topic, gently steer back to fragrance.`;

    const tools = [
      {
        type: "function",
        function: {
          name: "recommend",
          description: "Show product recommendation cards in the chat UI.",
          parameters: {
            type: "object",
            properties: {
              product_ids: { type: "array", items: { type: "string" } },
            },
            required: ["product_ids"],
            additionalProperties: false,
          },
        },
      },
      {
        type: "function",
        function: {
          name: "add_to_cart",
          description: "Add one or more products directly to the user's cart.",
          parameters: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    product_id: { type: "string" },
                    qty: { type: "number" },
                  },
                  required: ["product_id"],
                  additionalProperties: false,
                },
              },
            },
            required: ["items"],
            additionalProperties: false,
          },
        },
      },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        tools,
        stream: true,
      }),
    });

    if (response.status === 429 || response.status === 402) {
      return new Response(
        JSON.stringify({
          error: response.status === 429 ? "Rate limited" : "Credits exhausted",
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("concierge error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
