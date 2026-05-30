// ─── AIIntegrationSkill ───────────────────────────────────────────────────────
// Multi-provider AI adapter. Supports OpenAI, Anthropic, MiniMax, Gemini, Ollama.

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export type AIProvider = "openai" | "anthropic" | "minimax" | "gemini" | "ollama" | "openai-compatible";

export interface AIRequest {
  provider: AIProvider;
  model: string;
  prompt: string;
  system?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  tokens: number;
  finishReason: string;
}

export const aiIntegrationSkill: Skill = {
  name: "AIIntegration",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult<AIResponse>> {
    const req = input as AIRequest;

    if (!req.prompt) return { ok: false, error: "Prompt is required" };
    if (!req.provider) return { ok: false, error: "Provider is required" };

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
