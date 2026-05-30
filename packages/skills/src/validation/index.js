// ─── ValidationSkill ─────────────────────────────────────────────────────────
// Validates character consistency against D&D 5e SRD rules.
import { rulesEngine } from "@frinosoft/harness";
export const validationSkill = {
    name: "Validation",
    async execute(ctx, input) {
        const character = ctx.character;
        if (!character)
            return { ok: false, error: "No character in context" };
        const report = { valid: true, errors: [], warnings: [] };
        // Validate ability scores
        const scoreResult = rulesEngine.validateAbilityScores(character.abilities, "standard_array");
        if (!scoreResult.valid) {
            report.errors.push(...scoreResult.errors);
        }
        // Validate multiclassing prerequisites
        for (const cls of character.classes) {
            const mcCheck = rulesEngine.canMulticlass(character, cls.id);
            if (!mcCheck.allowed) {
                report.errors.push(mcCheck.reason ?? "Multiclass not allowed");
            }
        }
        // Check HP
        if (character.currentHP > character.maxHP) {
            report.errors.push("Current HP cannot exceed max HP");
        }
        if (character.tempHP < 0) {
            report.errors.push("Temporary HP cannot be negative");
        }
        // Death saves
        if (character.deathSaves.successes > 3) {
            report.errors.push("Cannot have more than 3 death save successes");
        }
        if (character.deathSaves.failures > 3) {
            report.errors.push("Cannot have more than 3 death save failures");
        }
        report.valid = report.errors.length === 0;
        return { ok: true, data: report };
    },
};
