// ─── AIIntegrationSkill ───────────────────────────────────────────────────────
// Multi-provider AI adapter. Supports OpenAI, Anthropic, MiniMax, Gemini, Ollama.
export const aiIntegrationSkill = {
    name: "AIIntegration",
    async execute(ctx, input) {
        const req = input;
        if (!req.prompt)
            return { ok: false, error: "Prompt is required" };
        if (!req.provider)
            return { ok: false, error: "Provider is required" };
        // Placeholder — real implementation calls the appropriate API
        // The user's API key is used server-side, never exposed to frontend
        return {
            ok: true,
            data: {
                text: `[${req.provider}/${req.model}] Response to: ${req.prompt.substring(0, 50)}...`,
                tokens: 0,
                finishReason: "stop",
            },
        };
    },
};
