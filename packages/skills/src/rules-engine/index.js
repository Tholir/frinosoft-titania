// ─── RulesEngine Skill Wrapper ───────────────────────────────────────────────
import { rulesEngine } from "@frinosoft/harness";
export const rulesEngineSkill = {
    name: "RulesEngine",
    async execute(ctx, input) {
        const { action, params } = input;
        switch (action) {
            case "calculateModifier":
                return { ok: true, data: rulesEngine.calculateModifier(params) };
            case "calculateProficiencyBonus":
                return { ok: true, data: rulesEngine.calculateProficiencyBonus(params) };
            case "validateAbilityScores":
                return { ok: true, data: rulesEngine.validateAbilityScores(params) };
            case "canMulticlass":
                return { ok: true, data: rulesEngine.canMulticlass(ctx.character, params) };
            default:
                return { ok: false, error: `Unknown action: ${action}` };
        }
    },
};
