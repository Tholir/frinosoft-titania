import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { appRouter } from "./routers/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "frinosoft-titania-api" });
});

app.listen(PORT, () => {
  console.log(`[Frinosoft:Titania API] listening on http://localhost:${PORT}`);
});

export type AppRouter = typeof appRouter;
