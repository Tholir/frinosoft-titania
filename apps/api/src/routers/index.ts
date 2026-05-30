import { initTRPC } from "@trpc/server";
import { characterRouter } from "./character.js";
import { homebrewRouter } from "./homebrew.js";
import { aiRouter } from "./ai.js";
import { compendiumRouter } from "./compendium.js";
import { narratorRouter } from "./narrator.js";

const t = initTRPC.create();

export const appRouter = t.router({
  character: characterRouter,
  homebrew: homebrewRouter,
  ai: aiRouter,
  compendium: compendiumRouter,
  narrator: narratorRouter,
});

export type AppRouter = typeof appRouter;
