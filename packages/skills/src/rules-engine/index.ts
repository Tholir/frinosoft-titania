// ─── RulesEngine Skill Wrapper ───────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";
import { rulesEngine } from "@frinosoft/harness";

export const rulesEngineSkill: Skill = {
  name: "RulesEngine",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult> {
    const { action, params } = input as { action: string; params: unknown };
    switch (action) {
      case "calculateModifier":
        return { ok: true, data: rulesEngine.calculateModifier(params as number) };
      case "calculateProficiencyBonus":
        return { ok: true, data: rulesEngine.calculateProficiencyBonus(params as number) };
      case "validateAbilityScores":
        return { ok: true, data: rulesEngine.validateAbilityScores(params as any) };
      case "canMulticlass":
        return { ok: true, data: rulesEngine.canMulticlass(ctx.character!, params as string) };
      default:
        return { ok: false, error: `Unknown action: ${action}` };
    }
  },
};
