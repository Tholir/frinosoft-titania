// ─── MiniMaxIntegrationSkill ─────────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export interface MiniMaxResult {
  text?: string;
  imageUrl?: string;
  tokens?: number;
}

export const minimaxIntegrationSkill: Skill = {
  name: "MiniMaxIntegration",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult<MiniMaxResult>> {
    const { action, prompt, style } = input as { action: "text" | "image"; prompt: string; style?: string };

    if (!prompt) return { ok: false, error: "Prompt is required" };

    if (action === "text") {
      return {
        ok: true,
        data: { text: `[MiniMax abab6-chat-pro] ${prompt.substring(0, 100)}...` },
      };
    }
    if (action === "image") {
      return {
        ok: true,
        data: { imageUrl: `https://placeholder.minimax.io/generated/${Date.now()}.png` },
      };
    }
    return { ok: false, error: "Invalid action" };
  },
};
