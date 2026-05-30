# Frinosoft:Titania

D&D 5e Character Builder & AI Homebrew Platform

## Arquitectura

El proyecto sigue el patrón **Harness Engineering**: un Harness central orquesta 12 Skills especializadas, cada una con responsabilidad única y bien delimitada.

### Harness Central
- **CharacterHarness** — Orquesta la creación y gestión de personajes
- **AIHarness** — Orquila la integración con modelos de IA del usuario

### Skills (12)
1. `CharacterCreationSkill` — Wizard de creación paso a paso
2. `RulesEngineSkill` — Motor de reglas D&D 5e SRD
3. `AIIntegrationSkill` — Adaptador multi-proveedor de IA
4. `MiniMaxIntegrationSkill` — Integración dedicada MiniMax.io
5. `HomebrewCreationSkill` — Generación asistida de contenido homebrew
6. `ExportSkill` — Exportación a PDF, JSON, Foundry VTT, Roll20
7. `CampaignManagerSkill` — Gestión de estado durante la campaña
8. `ValidationSkill` — Validación de consistencia contra reglas
9. `CompendiumSkill` — Acceso al compendio SRD + homebrew
10. `NarratorSkill` — IA narradora de aventuras
11. `AuthAndStorageSkill` — Autenticación y persistencia
12. `AnalyticsAndFeedbackSkill` — Telemetría y feedback

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14 (App Router) + shadcn/ui + Tailwind CSS |
| State | Zustand + TanStack Query |
| Backend | Node.js + tRPC + Express fallback |
| ORM | Prisma + PostgreSQL |
| Cache | Redis |
| Storage | S3 / MinIO |
| Testing | Vitest + Playwright + Testing Library |
| CI/CD | GitHub Actions + Docker Compose |
| Monorepo | Turborepo + pnpm workspaces |

## Primeros Pasos

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Tests
pnpm test
```

## Integración IA

El usuario provee su propia API Key. Proveedores soportados:
- OpenAI (GPT-4o, GPT-4 Turbo)
- Anthropic (Claude Sonnet/Opus)
- MiniMax.io Global (abab6-chat, abab6-chat-pro, imagen)
- Google Gemini
- Ollama (modelos locales)
- Cualquier endpoint compatible con OpenAI API

Las API Keys se encriptan con AES-256-GCM antes de almacenarse.
