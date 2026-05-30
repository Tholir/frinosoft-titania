import type { Character } from "./types.js";
export type { Character, CharacterDraft, AbilityScores, AbilityName, Race, CharacterClass, ClassEntry, Spellcasting, Background, SkillProficiency, SavingThrow, InventoryItem, Currency, DeathSaves, Condition } from "./types.js";
export { abilityModifier } from "./types.js";
export interface CharacterHarness {
    createCharacter(options: CharacterCreationOptions): Promise<Character>;
    getCharacter(id: string): Promise<Character | null>;
    updateCharacter(id: string, patch: Partial<Character>): Promise<Character>;
    deleteCharacter(id: string): Promise<void>;
    levelUp(id: string): Promise<Character>;
    applyDamage(id: string, amount: number): Promise<Character>;
    rest(id: string, type: "short" | "long"): Promise<Character>;
    exportCharacter(id: string, format: ExportFormat): Promise<string>;
}
export interface CharacterCreationOptions {
    name: string;
    raceId: string;
    classId: string;
    backgroundId: string;
    abilities: Abilities;
    statRollMethod: "standard_array" | "point_buy" | "roll";
    rolls?: number[];
}
export interface Abilities {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}
export type ExportFormat = "pdf" | "json" | "foundry_vtt" | "roll20" | "markdown" | "png";
export interface SkillContext {
    userId?: string;
    characterId?: string;
    character?: Character;
}
export interface SkillResult<T = unknown> {
    ok: boolean;
    data?: T;
    error?: string;
    warnings?: string[];
}
export type SkillName = "CharacterCreation" | "RulesEngine" | "AIIntegration" | "MiniMaxIntegration" | "HomebrewCreation" | "Export" | "CampaignManager" | "Validation" | "Compendium" | "Narrator" | "AuthAndStorage" | "Analytics";
export interface Skill {
    readonly name: SkillName;
    execute<T>(ctx: SkillContext, input: unknown): Promise<SkillResult<T>>;
}
export declare class HarnessError extends Error {
    readonly skill?: SkillName | undefined;
    readonly code?: string | undefined;
    constructor(message: string, skill?: SkillName | undefined, code?: string | undefined);
}
export declare class SkillNotFoundError extends HarnessError {
    constructor(skill: SkillName);
}
export declare class ValidationError extends HarnessError {
    readonly field?: string | undefined;
    constructor(message: string, field?: string | undefined);
}
export { rulesEngine, type RulesEngineSkill } from "./character-harness.js";
//# sourceMappingURL=index.d.ts.map