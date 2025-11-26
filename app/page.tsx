import ServiceCard from "@/components/ServiceCard";
import { Box, CheckSquare, Feather, HeartHandshake, Palette, PenTool, Zap } from "lucide-react";

export default function Home() {
  const services = [
  {
    name: 'Chroma',
    description: 'Turn the colors of our photos, models, and site shots into palettes you can build worlds with.',
    icon: Palette,
    url: '/chroma',
    color: '#8f48a6ff',
    comingSoon: false
  },
  {
    name: 'Moments',
    description: 'A timeline of us. Add, reorder in your head, and quietly curate your favourite memories.',
    icon: HeartHandshake,
    url: '/moments',
    color: '#c8559cff',
    comingSoon: false
  },
  {
    name: 'Muse',
    description: 'Tell me your mood. I have trained this little intelligence to turn your feelings into poetry, using the vocabulary of our love.',
    icon: Feather,
    url: '/muse',
    color: '#a855f7',
    comingSoon: false
  },
  {
    name: 'Structure',
    description: 'Deadlines, submissions, crits. This will be our quiet structural system for the chaos.',
    icon: CheckSquare,
    url: '/structure',
    color: '#4c8744ff',
    comingSoon: true
  },
  {
    name: 'Blueprint',
    description: 'A digital scratchpad for wild sketches and half-ideas—because every project starts soft and messy.',
    icon: PenTool,
    url: '/blueprint',
    color: '#8284c3ff',
    comingSoon: true
  },
  {
    name: 'Material',
    description: 'Concrete, wood, glass—and you. A locker for textures, renders, and everything your studio heart collects.',
    icon: Box,
    url: '/material',
    color: '#906046ff',
    comingSoon: true
  }
]
  return (
    <main className="mb-10 relative overflow-hidden">
      {/* Hero Section */}
      <div className="w-full h-90 inline-flex flex-col items-center justify-center gap-4">
        <div className="px-4 text-8xl md:text-9xl font-extrabold tracking-tight bg-gradient-to-br from-amber-700 via-amber-300 to-amber-600 text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(244,196,48,0.35)]">
          Studio 27
        </div>
        <p className="z-10 text-zinc-300/90 text-center max-w-xl text-xs md:text-sm px-4">
          A tiny digital studio for my dear pullu. Minimal tools, soft chaos control, and lots of love.
        </p>
        <div className="w-60 h-60 absolute left-70 top-5 rounded-full bg-amber-600/10 blur-3xl z-0" />
        <div className="w-62 h-62 absolute right-120 top-25 rounded-full bg-amber-600/10 blur-3xl z-0" />
        <div className="w-40 h-40 absolute left-2/5 -translate-x-1/2 top-50 rounded-full bg-amber-500/10 blur-3xl z-0" />
      </div>

      {/* Services */}
      <div className="px-6 md:px-15 relative z-10">
        <div className="flex items-baseline justify-between mb-5">
          <h1 className="text-xl font-semibold text-zinc-200">Your Suite</h1>
          <span className="text-xs text-yellow-300/80 italic">Designed for one architect only: Teru.</span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              name={service.name}
              description={service.description}
              icon={service.icon}
              url={service.url}
              color={service.color}
              comingSoon={service.comingSoon}
            />
          ))}
        </div>
      </div>

      <div className="block mx-auto w-fit flex items-center gap-3 text-yellow-100 mt-10 bg-gradient-to-r from-yellow-600 to-yellow-500 px-4 py-2 mb-5 rounded-full text-sm shadow-[0_0_15px_rgba(244,196,48,0.4)]">
        <span className="text-yellow-100"><Zap size={16} /></span>
        <span>More tools coming soon . . .</span>
      </div>
    </main>
  );
}
