// ─── NarratorSkill ──────────────────────────────────────────────────────────
export const narratorSkill = {
    name: "Narrator",
    async execute(ctx, input) {
        const { request, characterName } = input;
        if (!request)
            return { ok: false, error: "Narrator request is required" };
        return {
            ok: true,
            data: {
                text: `[Narrator] ${characterName ? `Speaking as ${characterName}: ` : ""}${request} — (Narrator not yet connected to AI provider)`,
                type: "narration",
            },
        };
    },
};
