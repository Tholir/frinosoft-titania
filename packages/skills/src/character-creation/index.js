// ─── CharacterCreationSkill ─────────────────────────────────────────────────
// Step-by-step character creation wizard.
export const characterCreationSkill = {
    name: "CharacterCreation",
    async execute(ctx, input) {
        const opts = input;
        if (!opts.name || opts.name.length < 1 || opts.name.length > 50) {
            return { ok: false, error: "Name must be between 1 and 50 characters" };
        }
        if (!opts.raceId)
            return { ok: false, error: "Race is required" };
        if (!opts.classId)
            return { ok: false, error: "Class is required" };
        if (!opts.backgroundId)
            return { ok: false, error: "Background is required" };
        // Rule validation would call RulesEngineSkill here
        // For now return a valid draft structure
        const draft = {
            name: opts.name,
            race: { id: opts.raceId, name: opts.raceId, source: "srd", size: "Medium", speed: 30, abilityScoreIncrease: [], age: { maturity: 18, lifespan: 80 }, languages: ["Common"], traits: [] },
            classes: [{ id: opts.classId, name: opts.classId, level: 1, hitDice: { current: 8, max: 8 }, features: [] }],
            background: { id: opts.backgroundId, name: opts.backgroundId, source: "srd", skillProficiencies: [], toolProficiencies: [], languages: [], equipment: [], feature: { name: "", description: "" }, personalityTraits: [], ideals: [], bonds: [], flaws: [] },
            abilities: opts.abilities,
            level: 1,
            xp: 0,
            currentHP: 8,
            maxHP: 8,
            tempHP: 0,
            savingThrows: [],
            skills: [],
            inventory: [],
            currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
            features: [],
            conditions: [],
            deathSaves: { successes: 0, failures: 0 },
            allies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return { ok: true, data: draft };
    },
};
