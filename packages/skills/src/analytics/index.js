// ─── AnalyticsAndFeedbackSkill ─────────────────────────────────────────────
export const analyticsSkill = {
    name: "Analytics",
    async execute(ctx, input) {
        const { event, properties } = input;
        // In production: send to analytics backend (PostHog, Plausible, etc.)
        console.log(`[Analytics] ${event}`, properties);
        return { ok: true, data: { tracked: true, event } };
    },
};
