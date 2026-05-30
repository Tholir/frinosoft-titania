// ─── Compendium tRPC Router ─────────────────────────────────────────────────

import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { compendiumSkill } from "@frinosoft/skills";

const t = initTRPC.create();

export const compendiumRouter = t.router({
  search: t.procedure
    .input(z.object({ query: z.string(), type: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await compendiumSkill.execute({}, { query: input.query, type: input.type });
      return result.data ?? [];
    }),
});
