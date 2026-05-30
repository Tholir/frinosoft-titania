"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@frinosoft/config";

const STEPS = [
  { id: 1, label: "Raza", path: "/character/new/race" },
  { id: 2, label: "Clase", path: "/character/new/class" },
  { id: 3, label: "Trasfondo", path: "/character/new/background" },
  { id: 4, label: "Estadísticas", path: "/character/new/abilities" },
  { id: 5, label: "Detalles", path: "/character/new/details" },
  { id: 6, label: "Revisar", path: "/character/new/review" },
];

export default function CharacterNewPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-parchment dark:bg-[#1a1209]">
      {/* Header */}
      <header className="border-b-4 border-ink dark:border-gold bg-parchment-dark dark:bg-[#2a1f10]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-ink-light dark:text-parchment-dark hover:text-gold dark:hover:text-gold-light transition-colors font-display"
          >
            ← Volver
          </button>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-parchment">
            Nuevo Personaje
          </h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Step indicator */}
      <div className="border-b border-border bg-card dark:bg-[#2a1f10]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors",
                      currentStep >= step.id
                        ? "bg-crimson text-parchment"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {step.id}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-body mt-1 hidden sm:block",
                      currentStep >= step.id
                        ? "text-ink dark:text-parchment"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-12 sm:w-20 h-0.5 mx-1",
                      currentStep > step.id
                        ? "bg-gold"
                        : "bg-border dark:bg-[#3a2a1a]"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === 1 && <StepRace onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <StepClass onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
        {currentStep === 3 && <StepBackground onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />}
        {currentStep === 4 && <StepAbilities onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />}
        {currentStep === 5 && <StepDetails onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} />}
        {currentStep === 6 && <StepReview onBack={() => setCurrentStep(5)} />}
      </main>
    </div>
  );
}

function StepRace({ onNext }: { onNext: () => void }) {
  const races = [
    { id: "human", name: "Humano", desc: "Versátil y adaptable", speed: 30, ability_bonus: "+2 a una característica" },
    { id: "elf", name: "Elfo", desc: "Agudo y grácil", speed: 30, ability_bonus: "+2 a Destreza" },
    { id: "dwarf", name: "Enano", desc: "Resistente y robusto", speed: 25, ability_bonus: "+2 a Constitución" },
    { id: "halfling", name: "Halfling", desc: "Afortunado y ágil", speed: 25, ability_bonus: "+2 a Destreza" },
    { id: "dragonborn", name: "Dragonborn", desc: "Heritage dracónico", speed: 30, ability_bonus: "+2 a Fuerza" },
    { id: "gnome", name: "Gnomo", desc: "Curioso e ingenioso", speed: 25, ability_bonus: "+2 a Inteligencia" },
    { id: "half-elf", name: "Half-Elfo", desc: "Lo mejor de ambos mundos", speed: 30, ability_bonus: "+2 a Carisma, +1 a otra" },
    { id: "half-orc", name: "Half-Orco", desc: "Fuerte y determinado", speed: 30, ability_bonus: "+2 a Fuerza, +1 a Constitución" },
    { id: "tiefling", name: "Tiefling", desc: "Linaje infernal", speed: 30, ability_bonus: "+2 a Carisma, +1 a Inteligencia" },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Elige tu Raza
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Tu raza define los rasgos físicos y capacidades innatas de tu personaje.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.map((race) => (
          <button
            key={race.id}
            onClick={() => setSelected(race.id)}
            className={cn(
              "p-4 rounded-lg border-2 text-left transition-all",
              selected === race.id
                ? "border-gold bg-gold/10 shadow-lg"
                : "border-border bg-card hover:border-gold/50 hover:shadow-md",
              "bg-card dark:bg-[#2a1f10] dark:border-[#3a2a1a]"
            )}
          >
            <h3 className="font-display text-lg font-bold text-ink dark:text-parchment">{race.name}</h3>
            <p className="text-sm text-muted-foreground font-body">{race.desc}</p>
            <div className="mt-2 flex gap-4 text-xs font-mono text-ink-light dark:text-parchment-dark">
              <span>Vel: {race.speed} pies</span>
              <span>{race.ability_bonus}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "px-8 py-3 font-display font-semibold rounded transition-colors",
            selected
              ? "bg-crimson text-parchment hover:bg-crimson-light"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Siguiente: Clase →
        </button>
      </div>
    </div>
  );
}

function StepClass({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const classes = [
    { id: "barbarian", name: "Bárbaro", desc: "Guerrero feroz que lucha con fury primal", hit_die: 12, primary_ability: "Fuerza", saving_throws: ["str", "con"], armor: "Ligera, Media, Escudo", weapons: "Simples, Marciales" },
    { id: "bard", name: "Bardo", desc: "Inspirador mago que usa música y magia", hit_die: 8, primary_ability: "Carisma", saving_throws: ["dex", "cha"], armor: "Ligera", weapons: "Simples, Espadas a dos manos, Rapier, Ballesta" },
    { id: "cleric", name: "Clérigo", desc: "Sacerdote que canaliza poder divino", hit_die: 8, primary_ability: "Sabiduría", saving_throws: ["wis", "cha"], armor: "Ligera, Media, Pesada, Escudo", weapons: "Simples" },
    { id: "druid", name: "Druida", desc: "Guardián de la naturaleza que cambia forma", hit_die: 8, primary_ability: "Sabiduría", saving_throws: ["int", "wis"], armor: "Ligera, Media, Escudo (no metal)", weapons: "Clubes, Dagas, Ballesta, Lanzas" },
    { id: "fighter", name: "Luchador", desc: "Maestro del combate y las armas", hit_die: 10, primary_ability: "Fuerza o Destreza", saving_throws: ["str", "con"], armor: "Todas, Escudos", weapons: "Simples, Marciales" },
    { id: "monk", name: "Monje", desc: "Artesano marcial que usa ki interior", hit_die: 8, primary_ability: "Destreza y Sabiduría", saving_throws: ["str", "dex"], armor: "Ninguna", weapons: "Simples, Espadas cortas" },
    { id: "paladin", name: "Paladín", desc: "Guerrero sagrado vinculado a un juramento", hit_die: 10, primary_ability: "Fuerza y Carisma", saving_throws: ["wis", "cha"], armor: "Todas, Escudos", weapons: "Simples, Marciales" },
    { id: "ranger", name: "Explorador", desc: "Guardián de territorios salvajes", hit_die: 10, primary_ability: "Destreza y Sabiduría", saving_throws: ["str", "dex"], armor: "Ligera, Media, Escudos", weapons: "Simples, Marciales" },
    { id: "rogue", name: "Pícaro", desc: "Embaucador que usa sigilo y trucos", hit_die: 8, primary_ability: "Destreza", saving_throws: ["dex", "int"], armor: "Ligera, Media", weapons: "Simples, Ballesta, Espadas cortas" },
    { id: "sorcerer", name: "Hechicero", desc: "Mago innato con poderarcano espontáneo", hit_die: 6, primary_ability: "Carisma", saving_throws: ["con", "cha"], armor: "Ninguna", weapons: "Dagas, Ballesta, Lanza" },
    { id: "warlock", name: "Brujo", desc: "Brujo con pacto infernal o feérico", hit_die: 8, primary_ability: "Carisma", saving_throws: ["wis", "cha"], armor: "Ligera, Media, Escudos", weapons: "Simples" },
    { id: "wizard", name: "Mago", desc: "Estudioso de magia arcana académica", hit_die: 6, primary_ability: "Inteligencia", saving_throws: ["int", "wis"], armor: "Ninguna", weapons: "Dagas, Ballesta, Lanza" },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Elige tu Clase
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Tu clase define tu rol, estilo de combate y habilidades principales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelected(cls.id)}
            className={cn(
              "p-4 rounded-lg border-2 text-left transition-all",
              selected === cls.id
                ? "border-gold bg-gold/10 shadow-lg"
                : "border-border bg-card hover:border-gold/50 hover:shadow-md",
              "bg-card dark:bg-[#2a1f10] dark:border-[#3a2a1a]"
            )}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-display text-lg font-bold text-ink dark:text-parchment">{cls.name}</h3>
              <span className="text-xs font-mono text-gold">d{cls.hit_die}</span>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-1">{cls.desc}</p>
            <div className="mt-2 flex flex-col gap-1 text-xs font-mono text-ink-light dark:text-parchment-dark">
              <span>Atributo principal: {cls.primary_ability}</span>
              <span>Tiradas de salvación: {cls.saving_throws.join(", ")}</span>
              <span>Armadura: {cls.armor}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-3 font-display text-ink-light hover:text-gold transition-colors">
          ← Anterior
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "px-8 py-3 font-display font-semibold rounded transition-colors",
            selected ? "bg-crimson text-parchment hover:bg-crimson-light" : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Siguiente: Trasfondo →
        </button>
      </div>
    </div>
  );
}

function StepBackground({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const backgrounds = [
    { id: "acolyte", name: "Acólito", desc: "Sirviente de un templo o religión", skill_proficiencies: ["Historia", "Religión"], gold: 15 },
    { id: "charlatan", name: "Charlatán", desc: "Embaucador profesional", skill_proficiencies: ["Engaño", "Juego"], gold: 15 },
    { id: "criminal", name: "Criminal", desc: "Miembro de un sindicato o guild criminal", skill_proficiencies: ["Engaño", "Sigilo"], gold: 15 },
    { id: "entertainer", name: "Artista", desc: "Artista performer ambulante", skill_proficiencies: ["Atletismo", "Engaño"], gold: 15 },
    { id: "folk_hero", name: "Héroe Popular", desc: "Figuras locales admiradas por el pueblo", skill_proficiencies: ["Animal Handling", "Supervivencia"], gold: 10 },
    { id: "guild_artisan", name: "Artesano de Guild", desc: "Miembro de una guild comercial", skill_proficiencies: ["Perspicacia", "Persuasión"], gold: 15 },
    { id: "hermit", name: "Ermitaño", desc: "Persona que ha vivido en aislamiento", skill_proficiencies: ["Medicina", "Religión"], gold: 10 },
    { id: "noble", name: "Noble", desc: "Miembro de una familia aristocrática", skill_proficiencies: ["Historia", "Persuasión"], gold: 25 },
    { id: "outlander", name: "Forastero", desc: "Sobreviviente de tierras lejanas", skill_proficiencies: ["Atletismo", "Supervivencia"], gold: 10 },
    { id: "sage", name: "Erudito", desc: "Estudioso de diversas disciplinas", skill_proficiencies: ["Arcano", "Historia"], gold: 15 },
    { id: "sailor", name: "Marinero", desc: "Tripulante de barco mercante o pirata", skill_proficiencies: ["Atletismo", "Percepción"], gold: 10 },
    { id: "soldier", name: "Soldado", desc: "Veterano de guerra o milicia", skill_proficiencies: ["Atletismo", "Intimidación"], gold: 10 },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Elige tu Trasfondo
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Tu trasfondo cuenta la historia de dónde vienes y qué hiciste antes de ser aventurero.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setSelected(bg.id)}
            className={cn(
              "p-4 rounded-lg border-2 text-left transition-all",
              selected === bg.id
                ? "border-gold bg-gold/10 shadow-lg"
                : "border-border bg-card hover:border-gold/50 hover:shadow-md",
              "bg-card dark:bg-[#2a1f10] dark:border-[#3a2a1a]"
            )}
          >
            <h3 className="font-display text-lg font-bold text-ink dark:text-parchment">{bg.name}</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">{bg.desc}</p>
            <div className="mt-2 flex flex-col gap-1 text-xs font-mono text-ink-light dark:text-parchment-dark">
              <span>Habilidades: {bg.skill_proficiencies.join(", ")}</span>
              <span>Oro inicial: {bg.gold} gp</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-3 font-display text-ink-light hover:text-gold transition-colors">
          ← Anterior
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "px-8 py-3 font-display font-semibold rounded transition-colors",
            selected ? "bg-crimson text-parchment hover:bg-crimson-light" : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Siguiente: Estadísticas →
        </button>
      </div>
    </div>
  );
}

function StepAbilities({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [method, setMethod] = useState<"pointbuy" | "standard">("pointbuy");
  const [scores, setScores] = useState({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
  const [points, setPoints] = useState(27);
  const abilities = ["str", "dex", "con", "int", "wis", "cha"] as const;
  const abilityLabels = { str: "Fuerza", dex: "Destreza", con: "Constitución", int: "Inteligencia", wis: "Sabiduría", cha: "Carisma" };

  const modify = (ability: keyof typeof scores, delta: number) => {
    const newVal = scores[ability] + delta;
    if (newVal < 8 || newVal > 15) return;
    if (delta > 0 && points <= 0) return;
    setScores({ ...scores, [ability]: newVal });
    setPoints(points - delta);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Define tus Estadísticas
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Las seis abilities determinan qué puede hacer tu personaje.
        </p>
      </div>

      {/* Method selector */}
      <div className="flex gap-4">
        <button
          onClick={() => { setMethod("pointbuy"); setScores({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 }); setPoints(27); }}
          className={cn("px-4 py-2 font-display rounded border-2 transition-colors", method === "pointbuy" ? "border-gold bg-gold/10" : "border-border bg-card dark:bg-[#2a1f10]")}
        >
          Compra de Puntos
        </button>
        <button
          onClick={() => setMethod("standard")}
          className={cn("px-4 py-2 font-display rounded border-2 transition-colors", method === "standard" ? "border-gold bg-gold/10" : "border-border bg-card dark:bg-[#2a1f10]")}
        >
          Arrojar 4d6, descartar el menor
        </button>
      </div>

      {/* Point buy */}
      {method === "pointbuy" && (
        <>
          <div className="text-sm font-mono text-gold">Puntos disponibles: {points}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {abilities.map((ab) => (
              <div key={ab} className="bg-card dark:bg-[#2a1f10] border border-border dark:border-[#3a2a1a] rounded-lg p-4 text-center">
                <div className="text-xs font-display text-muted-foreground uppercase mb-2">{abilityLabels[ab]}</div>
                <div className="flex items-center justify-center gap-3">
                  <button onClick={() => modify(ab, -1)} disabled={scores[ab] <= 8} className="w-8 h-8 rounded-full bg-secondary hover:bg-crimson hover:text-parchment disabled:opacity-30 font-bold transition-colors">−</button>
                  <span className="font-display text-3xl font-bold text-ink dark:text-parchment w-10">{scores[ab]}</span>
                  <button onClick={() => modify(ab, 1)} disabled={scores[ab] >= 15 || points <= 0} className="w-8 h-8 rounded-full bg-secondary hover:bg-gold hover:text-ink disabled:opacity-30 font-bold transition-colors">+</button>
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-1">Mod: {Math.floor((scores[ab] - 10) / 2) >= 0 ? "+" : ""}{Math.floor((scores[ab] - 10) / 2)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {method === "standard" && (
        <div className="bg-card dark:bg-[#2a1f10] border border-border dark:border-[#3a2a1a] rounded-lg p-6 text-center">
          <p className="font-body text-muted-foreground">En modo estándar, tira 4d6 y descarta el menor para cada attribute. Cada resultado mostrado abajo es ilustrativo.</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {abilities.map((ab) => (
              <div key={ab} className="text-center">
                <div className="text-xs font-display text-muted-foreground uppercase">{abilityLabels[ab]}</div>
                <div className="font-display text-2xl font-bold text-gold mt-1">{scores[ab]}</div>
                <div className="text-xs font-mono text-muted-foreground">({Math.floor((scores[ab] - 10) / 2) >= 0 ? "+" : ""}{Math.floor((scores[ab] - 10) / 2)})</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-3 font-display text-ink-light hover:text-gold transition-colors">← Anterior</button>
        <button onClick={onNext} className="px-8 py-3 bg-crimson text-parchment font-display font-semibold rounded hover:bg-crimson-light transition-colors">
          Siguiente: Detalles →
        </button>
      </div>
    </div>
  );
}

function StepDetails({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [name, setName] = useState("");
  const [alignment, setAlignment] = useState("");

  const alignments = [
    { id: "lg", label: "Legal Bueno" }, { id: "ng", label: "Neutral Bueno" }, { id: "cg", label: "Caótico Bueno" },
    { id: "ln", label: "Legal Neutral" }, { id: "tn", label: "Neutral" }, { id: "cn", label: "Caótico Neutral" },
    { id: "le", label: "Legal Malo" }, { id: "ne", label: "Neutral Malo" }, { id: "ce", label: "Caótico Malo" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Detalles Finales
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Dale un nombre y personaliza la backstory de tu personaje.
        </p>
      </div>

      <div className="space-y-6 max-w-xl">
        <div>
          <label className="font-display text-sm font-semibold text-ink dark:text-parchment block mb-2">Nombre del Personaje</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Aldric Voss"
            className="w-full px-4 py-3 rounded border-2 border-border bg-card dark:bg-[#2a1f10] dark:border-[#3a2a1a] font-body text-ink dark:text-parchment placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="font-display text-sm font-semibold text-ink dark:text-parchment block mb-2">Alineamiento</label>
          <div className="grid grid-cols-3 gap-2">
            {alignments.map((al) => (
              <button
                key={al.id}
                onClick={() => setAlignment(al.id)}
                className={cn(
                  "px-3 py-2 rounded text-sm font-display transition-colors",
                  alignment === al.id ? "bg-gold text-ink" : "bg-card dark:bg-[#2a1f10] border border-border dark:border-[#3a2a1a] text-ink-light dark:text-parchment-dark hover:border-gold"
                )}
              >
                {al.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-3 font-display text-ink-light hover:text-gold transition-colors">← Anterior</button>
        <button onClick={onNext} disabled={!name.trim()} className={cn("px-8 py-3 font-display font-semibold rounded transition-colors", name.trim() ? "bg-crimson text-parchment hover:bg-crimson-light" : "bg-muted text-muted-foreground cursor-not-allowed")}>
          Revisar Personaje →
        </button>
      </div>
    </div>
  );
}

function StepReview({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-ink dark:text-parchment mb-2">
          Revisa tu Personaje
        </h2>
        <p className="text-ink-light dark:text-parchment-dark font-body">
          Verifica que todo esté correcto antes de crear tu personaje.
        </p>
      </div>

      <div className="bg-card dark:bg-[#2a1f10] border-2 border-gold rounded-lg p-6 max-w-xl">
        <h3 className="font-display text-2xl font-bold text-gold mb-4">Nombre Pendiente</h3>
        <div className="space-y-2 font-body">
          <div className="flex justify-between"><span className="text-muted-foreground">Raza:</span> <span className="font-semibold text-ink dark:text-parchment">—</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Clase:</span> <span className="font-semibold text-ink dark:text-parchment">—</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Trasfondo:</span> <span className="font-semibold text-ink dark:text-parchment">—</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Alineamiento:</span> <span className="font-semibold text-ink dark:text-parchment">—</span></div>
          <hr className="border-border my-3" />
          <div className="grid grid-cols-6 gap-2 text-center">
            {["str", "dex", "con", "int", "wis", "cha"].map((ab) => (
              <div key={ab}>
                <div className="text-xs text-muted-foreground uppercase">{ab}</div>
                <div className="font-display font-bold text-ink dark:text-parchment">—</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-3 font-display text-ink-light hover:text-gold transition-colors">← Anterior</button>
        <button className="px-8 py-3 bg-gold text-ink font-display font-semibold rounded hover:bg-gold-light transition-colors">
          ✓ Crear Personaje
        </button>
      </div>
    </div>
  );
}