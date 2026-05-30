// ─── AnalyticsAndFeedbackSkill ─────────────────────────────────────────────

import type { Skill, SkillContext, SkillResult } from "@frinosoft/harness";

export const analyticsSkill: Skill = {
  name: "Analytics",
  async execute(ctx: SkillContext, input: unknown): Promise<SkillResult> {
    const { event, properties } = input as { event: string; properties?: Record<string, unknown> };
    // In production: send to analytics backend (PostHog, Plausible, etc.)
    console.log(`[Analytics] ${event}`, properties);
    return { ok: true, data: { tracked: true, event } };
  },
};
