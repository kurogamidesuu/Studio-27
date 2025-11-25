import ServiceCard from "@/components/ServiceCard";
import { Box, CheckSquare, Palette, PenTool, Zap } from "lucide-react";

export default function Home() {
  const services = [
  {
    name: 'Chroma',
    description: 'Extract colors from our favorite moments. Turn our memories into your next masterpiece.',
    icon: Palette,
    url: '/chroma',
    color: '#ec4899',
    comingSoon: false
  },
  {
    name: 'Structure',
    description: 'Manage deadlines, submissions, and chaos. I provide the emotional support; this provides the plan.',
    icon: CheckSquare,
    url: '/structure',
    color: '#22c55e',
    comingSoon: true
  },
  {
    name: 'Blueprint',
    description: 'A digital scratchpad for your wildest ideas. Because every great building starts with a messy sketch.',
    icon: PenTool,
    url: '/blueprint',
    color: '#3b82f6',
    comingSoon: true
  },
  {
    name: 'Material',
    description: 'Concrete, wood, glass, and love. Your personal asset locker for every texture and render.',
    icon: Box,
    url: '/material',
    color: '#f97316',
    comingSoon: true
  }
]
  return (
    <main className="mb-10">
      {/* Hero Section */}
      <div className="w-full h-90 inline-flex flex-col items-center justify-center gap-3">
        <div className="text-9xl font-black bg-gradient-to-br from-amber-700 to-amber-300 text-transparent bg-clip-text">
          Studio 27
        </div>
        <p className="z-10 text-zinc-300">Your personal design suite. Powered by coffee and love.</p>
        <div className="w-50 h-50 absolute left-120 top-13 rounded-full bg-amber-400/20 blur-3xl z-0" />
        <div className="w-70 h-70 absolute right-110 top-20 rounded-full bg-amber-400/20 blur-3xl z-0" />
      </div>

      {/* Services */}
      <div className="px-15">
        <h1 className="mb-5 text-xl font-bold text-zinc-300">Your Suite:</h1>
        <div className="w-full grid grid-cols-3 gap-10">
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

      <div className="block mx-auto w-fit flex gap-3 text-amber-100 mt-10 bg-gradient-to-r from-amber-700 to-amber-600 p-2 rounded-3xl">
        <span><Zap /></span>
        <span>More services coming soon...</span>
      </div>
    </main>
  );
}
