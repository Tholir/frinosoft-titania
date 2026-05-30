// ─── CampaignManagerSkill ──────────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export const campaignManagerSkill: Skill = {
  name: "CampaignManager",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult> {
    const { event } = input as { event: string; amount?: number };
    const character = ctx.character;
    if (!character) return { ok: false, error: "No character in context" };

    switch (event) {
      case "short_rest":
        return {
          ok: true,
          data: { ...character, currentHP: Math.min(character.currentHP + Math.max(1, Math.floor(character.maxHP / 4)), character.maxHP) },
          warnings: ["Short rest HP recovery not fully implemented"],
        };
      case "long_rest":
        return {
          ok: true,
          data: { ...character, currentHP: character.maxHP, tempHP: 0, conditions: [] },
        };
      case "level_up":
        return { ok: true, data: { ...character, level: character.level + 1 }, warnings: ["Level up features not yet handled"] };
      default:
        return { ok: false, error: `Unknown event: ${event}` };
    }
  },
};
