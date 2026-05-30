// ─── AI tRPC Router ────────────────────────────────────────────────────────

import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { aiIntegrationSkill } from "@frinosoft/skills";
import { minimaxIntegrationSkill } from "@frinosoft/skills";

const t = initTRPC.create();

export const aiRouter = t.router({
  validateKey: t.procedure
    .input(z.object({ provider: z.string(), apiKey: z.string().max(200) }))
    .mutation(async ({ input }) => {
      return { valid: true, provider: input.provider };
    }),

  generate: t.procedure
    .input(
      z.object({
        provider: z.string(),
        model: z.string(),
        prompt: z.string().max(10000),
        system: z.string().optional(),
        temperature: z.number().min(0).max(2).optional(),
        maxTokens: z.number().min(1).max(4000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await aiIntegrationSkill.execute({}, {
        provider: input.provider,
        model: input.model,
        prompt: input.prompt,
        system: input.system,
        temperature: input.temperature,
        maxTokens: input.maxTokens,
      });
      if (!result.ok) throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
      return result.data;
    }),

  generateImage: t.procedure
    .input(z.object({ prompt: z.string().max(1000), style: z.string().optional() }))
    .mutation(async ({ input }) => {
      const result = await minimaxIntegrationSkill.execute({}, {
        action: "image",
        prompt: input.prompt,
        style: input.style,
      });
      if (!result.ok) throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
      return result.data;
    }),
});
