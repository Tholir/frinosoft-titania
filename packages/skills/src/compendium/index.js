// ─── CompendiumSkill ────────────────────────────────────────────────────────
// Compendium data would be loaded from SRD JSON or Open5e API
const SRD_SPELLS = [
    { id: "acid-arrow", name: "Acid Arrow", level: 2, school: "Evocation", source: "srd" },
    { id: "fireball", name: "Fireball", level: 3, school: "Evocation", source: "srd" },
    { id: "magic-missile", name: "Magic Missile", level: 1, school: "Evocation", source: "srd" },
    { id: "cure-wounds", name: "Cure Wounds", level: 1, school: "Evocation", source: "srd" },
    { id: "detect-magic", name: "Detect Magic", level: 1, school: "Divination", source: "srd" },
];
export const compendiumSkill = {
    name: "Compendium",
    async execute(ctx, input) {
        const { query, type } = input;
        let results = SRD_SPELLS;
        if (query) {
            results = results.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
        }
        if (type) {
            results = results.filter(s => s.source === type);
        }
        return { ok: true, data: results };
    },
};
