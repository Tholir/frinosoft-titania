import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { appRouter } from "./routers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// tRPC setup
const t = initTRPC.create();

const appRouter = t.router({
  character: t.router({
    create: t.procedure
      .input(z.object({
        name: z.string().min(1).max(50),
        raceId: z.string(),
        classId: z.string(),
        backgroundId: z.string(),
        abilities: z.object({
          str: z.number().min(1).max(20),
          dex: z.number().min(1).max(20),
          con: z.number().min(1).max(20),
          int: z.number().min(1).max(20),
          wis: z.number().min(1).max(20),
          cha: z.number().min(1).max(20),
        }),
      }))
      .mutation(({ input }) => {
        return { id: "char_001", ...input, level: 1, currentHP: 10, maxHP: 10, tempHP: 0 };
      }),
    getById: t.procedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        return { id: input.id, name: "Demo Character", level: 1 };
      }),
    list: t.procedure.query(() => []),
    update: t.procedure.input(z.any()).mutation(() => ({})),
    delete: t.procedure.input(z.object({ id: z.string() })).mutation(() => true),
    levelUp: t.procedure.input(z.object({ id: z.string() })).mutation(() => ({})),
    applyDamage: t.procedure.input(z.object({ id: z.string(), amount: z.number() })).mutation(() => ({})),
    rest: t.procedure.input(z.object({ id: z.string(), type: z.enum(["short", "long"]) })).mutation(() => ({})),
    export: t.procedure.input(z.object({ id: z.string(), format: z.string() })).query(() => ""),
  }),
  homebrew: t.router({
    create: t.procedure.input(z.any()).mutation(() => ({ id: "hb_001" })),
    validate: t.procedure.input(z.any()).query(() => ({ valid: true, warnings: [] })),
    publish: t.procedure.input(z.object({ id: z.string() })).mutation(() => true),
    list: t.procedure.query(() => []),
  }),
  compendium: t.router({
    search: t.procedure
      .input(z.object({ query: z.string(), type: z.string().optional() }))
      .query(({ input }) => []),
  }),
  ai: t.router({
    validateKey: t.procedure
      .input(z.object({ provider: z.string(), apiKey: z.string() }))
      .mutation(() => ({ valid: true })),
    generate: t.procedure.input(z.any()).mutation(() => ({ text: "", tokens: 0 })),
    generateImage: t.procedure.input(z.any()).mutation(() => ({ url: "" })),
  }),
  narrator: t.router({
    generate: t.procedure.input(z.any()).mutation(() => ({ text: "" })),
  }),
});

export type AppRouter = typeof appRouter;

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`[Frinosoft:Titania API] listening on http://localhost:${PORT}`);
});
