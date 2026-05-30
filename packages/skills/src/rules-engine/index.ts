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
      case "validateAbilityScores": {
        const vp = params as { abilities: Parameters<typeof rulesEngine.validateAbilityScores>[0]; method: Parameters<typeof rulesEngine.validateAbilityScores>[1]; rolls?: Parameters<typeof rulesEngine.validateAbilityScores>[2] };
        return { ok: true, data: rulesEngine.validateAbilityScores(vp.abilities, vp.method, vp.rolls) };
      }
      case "canMulticlass":
        return { ok: true, data: rulesEngine.canMulticlass(ctx.character!, params as string) };
      default:
        return { ok: false, error: `Unknown action: ${action}` };
    }
  },
};
