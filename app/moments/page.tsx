"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Loader2, Sparkles, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import MemoryCard from "@/components/MemoryCard";
import { toast } from "react-toastify";

type Moment = {
  id: number;
  title: string;
  subtitle: string;
  dateLabel: string;
  image: string;
  fixed: boolean;
};

const initialMoments: Moment[] = [
  {
    id: -1,
    title: "Our first photo together",
    subtitle: "The first time the camera caught us the way I see us.",
    dateLabel: "First photo together",
    image: "/moments/first-photo.jpg",
    fixed: true,
  },
  {
    id: -2,
    title: "Our first date",
    subtitle: "Nervous laughs, soft eye contact, and a lot of tiny details.",
    dateLabel: "First date",
    image: "/moments/first-date.jpg",
    fixed: true,
  },
  {
    id: -3,
    title: "The picture",
    subtitle: "The one that still makes me stop and stare every single time.",
    dateLabel: "The picture",
    image: "/moments/the-picture.jpg",
    fixed: true,
  },
  {
    id: -4,
    title: "Our first ice-cream date",
    subtitle: "Cold hands, warm heart, and too much sweetness in one frame.",
    dateLabel: "First ice-cream date",
    image: "/moments/first-icecream.jpg",
    fixed: true,
  },
  {
    id: -5,
    title: "Our first Hill'ffair",
    subtitle: "Lights, noise, chaos—and you next to me the whole time.",
    dateLabel: "First Hill'ffair",
    image: "/moments/first-hillfair.jpg",
    fixed: true,
  },
  {
    id: -6,
    title: "Our first prom",
    subtitle: "You in soft lights, me wondering how I got this lucky.",
    dateLabel: "First prom",
    image: "/moments/first-prom.jpg",
    fixed: true,
  },
];

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<Moment | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/moments");
        const data: { success: boolean; data?: { id: number; title: string; subtitle: string | null; dateLabel: string; image: string; fixed: boolean }[] } = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const dbMoments: Moment[] = data.data.map((m) => ({
            id: m.id,
            title: m.title,
            subtitle: m.subtitle ?? "",
            dateLabel: m.dateLabel,
            image: m.image,
            fixed: !!m.fixed,
          }));
          setMoments([...initialMoments, ...dbMoments]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file ?? null);
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    setIsAdding(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      if (title.trim()) formData.append("title", title.trim());
      if (subtitle.trim()) formData.append("subtitle", subtitle.trim());

      const res = await fetch("/api/moments", {
        method: "POST",
        body: formData,
      });
      const data: { success: boolean; data?: { id: number; title: string; subtitle: string | null; dateLabel: string; image: string; fixed: boolean } } = await res.json();
      if (data.success && data.data) {
        const m = data.data;
        const newMoment: Moment = {
          id: m.id,
          title: m.title,
          subtitle: m.subtitle ?? "",
          dateLabel: m.dateLabel,
          image: m.image,
          fixed: !!m.fixed,
        };
        setMoments((prev) => [...prev, newMoment]);
        setTitle("");
        setSubtitle("");
        setImageFile(null);

        toast.success('Added memory successfully');
      } else {
        toast.error('Failed to add memory');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (id: number) => {
    const target = moments.find((m) => m.id === id);
    if (target?.fixed) return;

    try {
      const res = await fetch("/api/moments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setMoments((prev) => prev.filter((m) => m.id !== id));
        toast.success('Deleted memory (so sad ;-; )');
      } else {
        toast.error('Failed to delete memory');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <main className="min-h-screen pb-16">
      <div className="px-6 md:px-12 pt-8 flex items-center justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-amber-600 via-amber-500 to-amber-200 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(244,196,48,0.4)] flex items-center gap-2">
            Moments
            <Sparkles className="text-amber-500" size={18} />
          </h1>
          <p className="mt-3 text-zinc-300 max-w-xl text-sm md:text-base">
            A timeline of us. Some memories are fixed by me; the rest you can keep adding to whenever you like.
          </p>
        </div>
        <nav className="text-xs md:text-sm w-30 ml-3 text-center">
          <Link href='/' className="flex flex-col md:flex-row gap-2 items-center text-amber-400/90 hover:text-amber-300 transition-colors">
            <Home size={18} />
            <span>Back to Studio</span>
          </Link>
        </nav>
      </div>

      {/* Add memory form */}
      <section className="px-6 md:px-12 mt-8">
        <form
          onSubmit={handleAdd}
          className="max-w-3xl mx-auto rounded-2xl border border-zinc-800/80 bg-black/60 p-4 md:p-5 space-y-3 shadow-[0_0_24px_rgba(0,0,0,0.5)]"
        >
          <h2 className="text-sm font-semibold text-amber-400/90 uppercase tracking-wide mb-1">
            Add a memory to our timeline
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[160px]">
              <label className="text-[13px] text-zinc-500 block mb-1">Memory title (optional)</label>
              <input
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:border-yellow-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="eg. Studio all-nighter, rooftop chai, sunset walk"
              />
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="text-[13px] text-zinc-500 block mb-1">Small caption (optional)</label>
              <input
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:border-yellow-400"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="eg. After your first jury, at the canteen"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[160px]">
              <label className="text-[13px] text-zinc-500 block mb-1">Upload a photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-xs text-zinc-200 file:mr-3 file:py-2 file:px-6 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-400/90 file:text-black hover:file:bg-amber-300/90 file:cursor-pointer"
              />
              
            </div>
            <div className="mt-5 flex justify-center md:justify-end flex-1 min-w-[120px]">
              <span className="flex gap-5 items-center">
                <Button text="Add to timeline" />
                {isAdding ? <Loader2 className="text-amber-500 animate-spin" /> : <></>}
              </span>
            </div>
          </div>
        </form>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 mt-10">
        {isLoading && (
          <span className="w-fit flex mx-auto gap-3">
            <Loader2 className="text-amber-300 animate-spin" />
            <p className="text-center text-sm text-zinc-500 mb-6">Loading your timeline...</p>
          </span>
        )}
        <div className="relative max-w-3xl mx-auto">
          {/* timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500/60 via-yellow-500/20 to-yellow-500/0 pointer-events-none" />

          <div className="space-y-10">
            {moments.map((moment, index) => {
              const isLeft = index % 2 === 0;
              const fav = favorites[moment.id];

              return (
                <MemoryCard
                  key={`${moment.id}-${index}`}
                  moment={moment}
                  setExpanded={setExpanded}
                  isLeft={isLeft}
                  fav={fav}
                  toggleFavorite={toggleFavorite}
                  handleRemove={handleRemove}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded image view */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-zinc-700 bg-zinc-950/95 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 border border-zinc-700 text-zinc-200 hover:text-white hover:bg-black/80 p-1 transition-colors"
              aria-label="Close full image"
            >
              <X size={18} />
            </button>
            <div className="relative w-full h-[65vh] md:h-[70vh] bg-black">
              <Image
                src={expanded.image}
                alt={expanded.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 md:p-5 flex flex-col gap-1 border-t border-zinc-800 bg-gradient-to-r from-black via-zinc-950 to-black">
              <p className="text-[11px] md:text-xs text-yellow-300/90 uppercase tracking-wide">
                {expanded.dateLabel}
              </p>
              <h2 className="text-sm md:text-base font-semibold text-zinc-50">
                {expanded.title}
              </h2>
              {expanded.subtitle && (
                <p className="text-[11px] md:text-xs text-zinc-300">
                  {expanded.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
