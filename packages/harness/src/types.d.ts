export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export interface AbilityScores {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}
export declare function abilityModifier(score: number): number;
export interface Race {
    id: string;
    name: string;
    source: "srd" | "homebrew";
    size: "Small" | "Medium" | "Large";
    speed: number;
    abilityScoreIncrease: Array<{
        ability: AbilityName;
        bonus: number;
    }>;
    age: {
        maturity: number;
        lifespan: number;
    };
    languages: string[];
    traits: RaceTrait[];
    imageUrl?: string;
}
export interface RaceTrait {
    name: string;
    description: string;
    type: "active" | "passive";
    usesPerRest?: number;
}
export interface CharacterClass {
    id: string;
    name: string;
    source: "srd" | "homebrew";
    hitDie: number;
    savingThrows: AbilityName[];
    proficiencies: {
        armor: string[];
        weapons: string[];
        tools: string[];
        skills: {
            count: number;
            choices: string[];
        };
    };
    featuresByLevel: ClassFeature[];
    spellcasting?: SpellcastingAbility;
}
export interface ClassFeature {
    name: string;
    level: number;
    description: string;
    usesPerRest?: "short" | "long" | "long_half";
    prerequisites?: {
        feature: string;
        level?: number;
    }[];
}
export type SpellcastingAbility = AbilityName;
export interface SpellSlots {
    [level: number]: {
        total: number;
        used: number;
    };
}
export interface Spellcasting {
    ability: SpellcastingAbility;
    spellSlots: SpellSlots;
    knownSpells: string[];
    preparedSpells: string[];
}
export interface Background {
    id: string;
    name: string;
    source: "srd" | "homebrew";
    skillProficiencies: string[];
    toolProficiencies: string[];
    languages: string[];
    equipment: string[];
    feature: {
        name: string;
        description: string;
    };
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
}
export interface ClassEntry {
    id: string;
    name: string;
    level: number;
    subclass?: string;
    hitDice: {
        current: number;
        max: number;
    };
    features: string[];
}
export interface SkillProficiency {
    name: string;
    ability: AbilityName;
    isExpertise: boolean;
}
export interface SavingThrow {
    ability: AbilityName;
    isProficient: boolean;
    modifier: number;
}
export interface InventoryItem {
    name: string;
    quantity: number;
    weight: number;
    description?: string;
    isAttuned?: boolean;
    isEquipped?: boolean;
}
export interface Currency {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
}
export interface DeathSaves {
    successes: number;
    failures: number;
}
export type Condition = "Blinded" | "Charmed" | "Deafened" | "Frightened" | "Grappled" | "Incapacitated" | "Invisible" | "Paralyzed" | "Petrified" | "Poisoned" | "Prone" | "Restrained" | "Stunned" | "Unconscious";
export interface Character {
    id: string;
    userId?: string;
    name: string;
    level: number;
    xp: number;
    currentHP: number;
    maxHP: number;
    tempHP: number;
    race: Race;
    classes: ClassEntry[];
    background: Background;
    abilities: AbilityScores;
    savingThrows: SavingThrow[];
    skills: SkillProficiency[];
    spellcasting?: Spellcasting;
    inventory: InventoryItem[];
    currency: Currency;
    features: Array<{
        name: string;
        source: string;
        description: string;
        usesPerRest?: string;
    }>;
    conditions: Condition[];
    deathSaves: DeathSaves;
    notes?: string;
    allies: string[];
    appearance?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type CharacterDraft = Omit<Character, "id" | "createdAt" | "updatedAt">;
//# sourceMappingURL=types.d.ts.map