// ─── CharacterHarness ────────────────────────────────────────────────────────
// Central orchestrator for character creation and management.
// It delegates to specialized Skills, never doing domain logic itself.

import type { Character } from "./types.js";

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
  rolls?: number[]; // only required if statRollMethod === "roll"
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

// ─── Skill Interface Contract ───────────────────────────────────────────────
// All skills MUST conform to this contract.
// The Harness never talks to skills directly except through this interface.

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

// ─── Skill Registry ──────────────────────────────────────────────────────────
// Each domain task has exactly ONE skill responsible for it.

export type SkillName =
  | "CharacterCreation"
  | "RulesEngine"
  | "AIIntegration"
  | "MiniMaxIntegration"
  | "HomebrewCreation"
  | "Export"
  | "CampaignManager"
  | "Validation"
  | "Compendium"
  | "Narrator"
  | "AuthAndStorage"
  | "Analytics";

export interface Skill {
  readonly name: SkillName;
  execute<T>(ctx: SkillContext, input: unknown): Promise<SkillResult<T>>;
}

// ─── Harness Errors ─────────────────────────────────────────────────────────

export class HarnessError extends Error {
  constructor(
    message: string,
    public readonly skill?: SkillName,
    public readonly code?: string
  ) {
    super(message);
    this.name = "HarnessError";
  }
}

export class SkillNotFoundError extends HarnessError {
  constructor(skill: SkillName) {
    super(`Skill '${skill}' not found in registry`, skill, "SKILL_NOT_FOUND");
  }
}

export class ValidationError extends HarnessError {
  constructor(message: string, public readonly field?: string) {
    super(message, "Validation", "VALIDATION_ERROR");
  }
}
