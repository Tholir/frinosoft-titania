// ─── Homebrew tRPC Router ───────────────────────────────────────────────────

import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { homebrewCreationSkill } from "@frinosoft/skills";

const t = initTRPC.create();

export const homebrewRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        type: z.enum(["race", "class", "spell", "monster", "magic-item", "background"]),
        name: z.string().min(1),
        concept: z.string().optional(),
        inspiration: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await homebrewCreationSkill.execute({}, { type: input.type, params: input });
      if (!result.ok) throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
      return result.data;
    }),

  validate: t.procedure.input(z.any()).query(() => ({ valid: true, warnings: [] })),

  publish: t.procedure.input(z.object({ id: z.string() })).mutation(() => true),

  list: t.procedure.query(() => []),
});
