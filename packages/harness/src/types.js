// ─── Character Types ─────────────────────────────────────────────────────────
// Core domain types for D&D 5e characters.
export function abilityModifier(score) {
    return Math.floor((score - 10) / 2);
}
