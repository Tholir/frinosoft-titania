// ─── Narrator tRPC Router ──────────────────────────────────────────────────

import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { narratorSkill } from "@frinosoft/skills";

const t = initTRPC.create();

export const narratorRouter = t.router({
  generate: t.procedure
    .input(z.object({ request: z.string().min(1), characterName: z.string().optional() }))
    .mutation(async ({ input }) => {
      const result = await narratorSkill.execute({}, input);
      if (!result.ok) throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
      return result.data;
    }),
});
