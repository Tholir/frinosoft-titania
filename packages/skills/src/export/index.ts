// ─── ExportSkill ─────────────────────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export const exportSkill: Skill = {
  name: "Export",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult> {
    const { format } = input as { format: "pdf" | "json" | "foundry_vtt" | "roll20" | "markdown" | "png" };
    const character = ctx.character;

    if (!character) return { ok: false, error: "No character in context" };
    if (!format) return { ok: false, error: "Export format is required" };

    switch (format) {
      case "json":
        return { ok: true, data: JSON.stringify(character, null, 2) };
      case "markdown":
        return {
          ok: true,
          data: `# ${character.name}\n\n**Level ${character.level} ${character.classes[0]?.name ?? "Unknown"}**\n\n## Abilities\n\n| Ability | Score | Modifier |\n|---------|-------|----------|\n| STR | ${character.abilities.str} | ${Math.floor((character.abilities.str - 10) / 2)} |\n| DEX | ${character.abilities.dex} | ${Math.floor((character.abilities.dex - 10) / 2)} |\n| CON | ${character.abilities.con} | ${Math.floor((character.abilities.con - 10) / 2)} |\n| INT | ${character.abilities.int} | ${Math.floor((character.abilities.int - 10) / 2)} |\n| WIS | ${character.abilities.wis} | ${Math.floor((character.abilities.wis - 10) / 2)} |\n| CHA | ${character.abilities.cha} | ${Math.floor((character.abilities.cha - 10) / 2)} |\n`,
        };
      default:
        return { ok: false, error: `Format '${format}' not yet implemented` };
    }
  },
};
