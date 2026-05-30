// ─── Character tRPC Router ──────────────────────────────────────────────────

import { initTRPC,TRPCError } from "@trpc/server";
import { z } from "zod";
import { characterCreationSkill } from "@frinosoft/skills";

const t = initTRPC.create();

export const characterRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(50),
        raceId: z.string().min(1, "Race is required"),
        classId: z.string().min(1, "Class is required"),
        backgroundId: z.string().min(1, "Background is required"),
        abilities: z.object({
          str: z.number().int().min(1).max(20),
          dex: z.number().int().min(1).max(20),
          con: z.number().int().min(1).max(20),
          int: z.number().int().min(1).max(20),
          wis: z.number().int().min(1).max(20),
          cha: z.number().int().min(1).max(20),
        }),
        statRollMethod: z.enum(["standard_array", "point_buy", "roll"]).default("standard_array"),
      })
    )
    .mutation(async ({ input }) => {
      const result = await characterCreationSkill.execute(
        {},
        { ...input }
      );
      if (!result.ok) throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
      return { id: `char_${Date.now()}`, character: result.data };
    }),

  getById: t.procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return { id: input.id, name: "Demo", level: 1 };
  }),

  list: t.procedure.query(() => []),

  update: t.procedure.input(z.object({ id: z.string(), patch: z.any() })).mutation(() => ({})),

  delete: t.procedure.input(z.object({ id: z.string() })).mutation(() => true),

  levelUp: t.procedure.input(z.object({ id: z.string() })).mutation(() => ({})),

  applyDamage: t.procedure
    .input(z.object({ id: z.string(), amount: z.number() }))
    .mutation(({ input }) => ({ id: input.id, damage: input.amount })),

  rest: t.procedure
    .input(z.object({ id: z.string(), type: z.enum(["short", "long"]) }))
    .mutation(({ input }) => ({ id: input.id, restType: input.type })),

  export: t.procedure
    .input(z.object({ id: z.string(), format: z.string() }))
    .query(() => ""),
});
