import { Link } from 'react-router'
import HeroScene from '@/components/scene/HeroScene'

export default function LandingPage() {
  return (
    <section className="grid grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[1.1fr_1fr] md:px-10 md:py-14">
      <div>
        <p className="font-mono text-xs text-muted">Smart India Hackathon 2026, Problem Statement SIH26011</p>
        <p className="font-mono text-xs text-muted">Ministry of Rural Development</p>

        <h1 className="mt-6 font-display text-3xl font-semibold leading-snug text-foreground md:text-4xl">
          A flat on the fifth floor and a shop below it share the same coordinates on paper.
        </h1>
        <p className="mt-4 max-w-lg text-muted">
          This project gives each unit in a structure its own verified place in three dimensions, generates a 3D
          ULPIN for it, and checks the model for boundary or underground conflicts before they become disputes.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            to="/property"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            Record a property
          </Link>
          <Link
            to="/viewer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            Open the sample map
          </Link>
        </div>


      </div>

      <div className="relative h-72 md:h-full md:min-h-[26rem]">
        <HeroScene />
      </div>
    </section>
  )
}
