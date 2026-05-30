// ─── CharacterHarness ────────────────────────────────────────────────────────
// Central orchestrator for character creation and management.
// It delegates to specialized Skills, never doing domain logic itself.
export { abilityModifier } from "./types.js";
// ─── Harness Errors ─────────────────────────────────────────────────────────
export class HarnessError extends Error {
    skill;
    code;
    constructor(message, skill, code) {
        super(message);
        this.skill = skill;
        this.code = code;
        this.name = "HarnessError";
    }
}
export class SkillNotFoundError extends HarnessError {
    constructor(skill) {
        super(`Skill '${skill}' not found in registry`, skill, "SKILL_NOT_FOUND");
    }
}
export class ValidationError extends HarnessError {
    field;
    constructor(message, field) {
        super(message, "Validation", "VALIDATION_ERROR");
        this.field = field;
    }
}
// ─── Rules Engine ────────────────────────────────────────────────────────────
// Exported from character-harness.ts for convenience
export { rulesEngine } from "./character-harness.js";
