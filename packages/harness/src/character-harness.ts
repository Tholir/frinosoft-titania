// ─── RulesEngineSkill ───────────────────────────────────────────────────────
// Central rule engine for D&D 5e SRD. All rule calculations go through here.

import type { AbilityName, AbilityScores, Character, CharacterClass } from "./types.js";
import { abilityModifier } from "./types.js";

export interface RulesEngineSkill {
  calculateModifier(score: number): number;
  calculateAC(character: Character): number;
  calculateHP(classes: CharacterClass[], level: number, conMod: number): number;
  calculateProficiencyBonus(level: number): number;
  calculateSkillBonus(skillName: string, character: Character): number;
  calculateSaveDC(spellcastingAbility: AbilityName, proficiencyBonus: number): number;
  canMulticlass(character: Character, newClassId: string): { allowed: boolean; reason?: string };
  getSpellSlots(level: number, spellcastingAbility: AbilityName): Array<{ level: number; total: number }>;
  getAvailableFeats(level: number): string[];
  validateAbilityScores(abilities: AbilityScores, method: "standard_array" | "point_buy" | "roll", rolls?: number[]): {
    valid: boolean;
    errors: string[];
  };
}

// ─── Stat Calculation Rules ─────────────────────────────────────────────────

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};

function classHitDie(className: string): number {
  const hitDice: Record<string, number> = {
    "Fighter": 10, "Rogue": 8, "Wizard": 6, "Cleric": 8,
    "Barbarian": 12, "Paladin": 10, "Ranger": 10,
    "Bard": 8, "Druid": 8, "Monk": 8,
    "Warlock": 8, "Sorcerer": 6,
  };
  return hitDice[className] ?? 8;
}

export const rulesEngine: RulesEngineSkill = {
  calculateModifier(score: number): number {
    return abilityModifier(score);
  },

  calculateAC(character: Character): number {
    const dexMod = abilityModifier(character.abilities.dex);
    let ac = 10 + dexMod;
    // Check for armor in inventory
    const armor = character.inventory.find(i => i.isEquipped && i.name.toLowerCase().includes("armor"));
    if (armor) {
      const armorAc: Record<string, number> = {
        "leather": 11, "chain shirt": 13, "scale mail": 14,
        "chain mail": 16, "plate": 18, "shield": 2,
      };
      const base = armorAc[armor.name.toLowerCase()] ?? 10;
      ac = armor.name.toLowerCase().includes("shield")
        ? 10 + dexMod + 2
        : base + Math.min(dexMod, armor.name.toLowerCase().includes("heavy") ? 0 : dexMod);
    }
    return ac;
  },

  calculateHP(classes: CharacterClass[], totalLevel: number, conMod: number): number {
    const firstClass = classes[0];
    if (!firstClass) return 10 + conMod;

    const firstLevelHP = classHitDie(firstClass.name) + conMod;
    let hp = firstLevelHP;

    for (let l = 1; l < totalLevel; l++) {
      const cls = classes.find(c => c.level <= l) ?? firstClass;
      hp += Math.max(1, Math.floor(classHitDie(cls.name) / 2) + 1 + conMod);
    }
    return hp;
  },

  calculateProficiencyBonus(level: number): number {
    if (level < 5) return 2;
    if (level < 9) return 3;
    if (level < 13) return 4;
    if (level < 17) return 5;
    return 6;
  },

  calculateSkillBonus(skillName: string, character: Character): number {
    const proficiencyBonus = rulesEngine.calculateProficiencyBonus(character.level);
    const skill = character.skills.find(s => s.name === skillName);
    if (!skill) return 0;
    const abilityMod = abilityModifier(character.abilities[skill.ability]);
    const profBonus = skill.isExpertise ? proficiencyBonus * 2 : (proficiencyBonus * (skill ? 1 : 0));
    return abilityMod + (character.skills.find(s => s.name === skillName) ? proficiencyBonus : 0);
  },

  calculateSaveDC(spellcastingAbility: AbilityName, proficiencyBonus: number): number {
    // 8 + proficiency + ability mod + any flat bonuses
    return 8 + proficiencyBonus; // ability mod added by caller
  },

  canMulticlass(character: Character, newClassId: string): { allowed: boolean; reason?: string } {
    // Basic multiclass validation — full implementation would check SRD requirements
    const requiredStats: Record<string, AbilityName> = {
      "Barbarian": "str", "Fighter": "str", "Paladin": "str",
      "Rogue": "dex", "Ranger": "dex",
      "Cleric": "wis", "Druid": "int", "Monk": "dex",
      "Bard": "cha", "Sorcerer": "cha", "Warlock": "cha",
      "Wizard": "int",
    };
    const required = requiredStats[newClassId];
    if (!required) return { allowed: true };
    const score = character.abilities[required];
    return score >= 13
      ? { allowed: true }
      : { allowed: false, reason: `Requires ${required.toUpperCase()} 13 or higher (current: ${score})` };
  },

  getSpellSlots(level: number, spellcastingAbility: AbilityName): Array<{ level: number; total: number }> {
    // Simplified spell slot table for full casters
    const slotTable: Record<number, Array<{ level: number; total: number }>> = {
      1: [{ level: 1, total: 2 }],
      2: [{ level: 1, total: 3 }],
      3: [{ level: 1, total: 4 }, { level: 2, total: 2 }],
      4: [{ level: 1, total: 4 }, { level: 2, total: 3 }],
      5: [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 2 }],
      // ... abbreviated for brevity, full table in implementation
    };
    return slotTable[level] ?? [];
  },

  getAvailableFeats(level: number): string[] {
    if (level < 4) return [];
    if (level < 6) return ["Actor", "Alert", "Athlete", "Defensive Duelist", "Dual Wielder", "Dungeon Delver",
      "Durable", "Elemental Adept", "Great Weapon Master", "Healer", "Inspiring Leader",
      "Keen Mind", "Lightly Armored", "Linguist", "Lucky", "Mage Slayer", "Magic Initiate",
      "Martial Adept", "Medium Armor Master", "Mounted Combatant", "Observant", "Piercer",
      "Resilient", "Ritual Caster", "Savage Attacker", "Sentinel", "Sharpshooter",
      "Shield Master", "Skilled", "Skulker", "Spell Sniper", "Tavern Brawler",
      "Tough", "War Caster", "Weapon Master"];
    return ["Lucky", "Observant", "War Caster", "Tough"]; // ASI levels
  },

  validateAbilityScores(abilities: AbilityScores, method: "standard_array" | "point_buy" | "roll", rolls?: number[]): {
    valid: boolean;
    errors: string[];
  } {
    const scores = [abilities.str, abilities.dex, abilities.con, abilities.int, abilities.wis, abilities.cha];
    const errors: string[] = [];

    for (const score of scores) {
      if (score < 1 || score > 20) {
        errors.push(`Ability score ${score} is outside valid range (1-20)`);
      }
    }

    if (method === "standard_array") {
      const sorted = [...scores].sort((a, b) => b - a);
      const match = STANDARD_ARRAY.every((v, i) => v === sorted[i]);
      if (!match) errors.push("Scores don't match the Standard Array");
    } else if (method === "point_buy") {
      let cost = 0;
      for (const score of scores) {
        if (score < 8 || score > 15) {
          errors.push(`Point buy scores must be between 8 and 15 (got ${score})`);
        }
        cost += POINT_BUY_COSTS[score] ?? 0;
      }
      if (cost > 27) errors.push(`Point buy cost ${cost} exceeds maximum of 27`);
    } else if (method === "roll" && rolls) {
      if (rolls.length !== 6) errors.push("Must provide exactly 6 rolls");
      for (const r of rolls) {
        if (r < 3 || r > 18) errors.push(`Roll ${r} is outside valid range (3-18 for 3d6)`);
      }
    }

    return { valid: errors.length === 0, errors };
  },
};
