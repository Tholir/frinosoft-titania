export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="font-display text-5xl font-bold tracking-tight text-gold">
          Frinosoft : Titania
        </h1>
        <p className="font-body text-xl text-ink-light dark:text-parchment-dark">
          Plataforma de creación de personajes D&D 5e con asistencia de IA y
          soporte completo para contenido Homebrew.
        </p>
        <div className="pt-4 flex flex-col gap-4 items-center">
          <a
            href="/character/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-parchment font-display font-semibold rounded shadow-lg hover:bg-crimson-light transition-colors text-lg"
          >
            Crear Personaje
          </a>
          <a
            href="/compendium"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-display font-semibold rounded hover:bg-gold hover:text-ink transition-colors"
          >
            Compendio SRD
          </a>
          <a
            href="/homebrew"
            className="inline-flex items-center gap-2 px-6 py-3 text-ink-light font-body hover:text-gold transition-colors"
          >
            Crear Homebrew
          </a>
        </div>
        <p className="pt-8 text-sm text-ink-light/60 dark:text-parchment-dark/60 font-mono">
          Powered by Harness Engineering — 12 Skills especializadas
        </p>
      </div>
    </main>
  );
}
