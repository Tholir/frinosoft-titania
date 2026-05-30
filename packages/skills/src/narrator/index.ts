// ─── NarratorSkill ──────────────────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export const narratorSkill: Skill = {
  name: "Narrator",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult> {
    const { request, characterName } = input as { request: string; characterName?: string };
    if (!request) return { ok: false, error: "Narrator request is required" };

    return {
      ok: true,
      data: {
        text: `[Narrator] ${characterName ? `Speaking as ${characterName}: ` : ""}${request} — (Narrator not yet connected to AI provider)`,
        type: "narration",
      },
    };
  },
};
