import type { AbilityName, AbilityScores, Character, CharacterClass } from "./types.js";
export interface RulesEngineSkill {
    calculateModifier(score: number): number;
    calculateAC(character: Character): number;
    calculateHP(classes: CharacterClass[], level: number, conMod: number): number;
    calculateProficiencyBonus(level: number): number;
    calculateSkillBonus(skillName: string, character: Character): number;
    calculateSaveDC(spellcastingAbility: AbilityName, proficiencyBonus: number): number;
    canMulticlass(character: Character, newClassId: string): {
        allowed: boolean;
        reason?: string;
    };
    getSpellSlots(level: number, spellcastingAbility: AbilityName): Array<{
        level: number;
        total: number;
    }>;
    getAvailableFeats(level: number): string[];
    validateAbilityScores(abilities: AbilityScores, method: "standard_array" | "point_buy" | "roll", rolls?: number[]): {
        valid: boolean;
        errors: string[];
    };
}
export declare const rulesEngine: RulesEngineSkill;
//# sourceMappingURL=character-harness.d.ts.map