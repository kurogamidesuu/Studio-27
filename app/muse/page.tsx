"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Feather, Home, Loader2, LucideHeart, LucideQuote, Sparkles, Trash } from "lucide-react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import SavedPoemCard from "@/components/SavedPoemCard";

type Poem = {
  id: number;
  poem: string;
}

export default function MusePage() {
  const [input, setInput] = useState("");
  const [poem, setPoem] = useState("");
  const [savedPoems, setSavedPoems] = useState<Poem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setPoem("");

    try {
      const res = await fetch("/api/muse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.success) {
        setPoem(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if(!poem.trim()) return;
    setIsSaving(true);

    try {
      const res = await fetch('/api/muse/poem', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poem),
      });

      const data = await res.json();
      if(data.success) {
        getPoems();
        setPoem("");
        setInput("");
        toast.success('Saved poem successfully');
      } else {
        toast.error('Failed to save poem');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const getPoems = async () => {
    try {
      const res = await fetch('/api/muse/poem');
      const data = await res.json();
      if(data.success) {
        setSavedPoems(data.data)
      }
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPoems();
  }, []);

  return (
    <main>
      {/* Header */}
      <div className="m-5 space-y-3 text-zinc-200">
        <div className="w-full flex justify-between items-start">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl md:text-6xl font-bold w-fit bg-gradient-to-br from-amber-500 via-amber-300 to-amber-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(244,196,48,0.4)]">Muse</h1>
            
          </div>
          <nav className="mt-2 text-sm">
            <Link href='/' className="flex gap-2 items-center text-amber-400/90 hover:text-amber-300 transition-colors">
              <Home size={18} />
              <span>Back to Studio</span>
            </Link>
          </nav>
        </div>
        <p className="max-w-150 ml-1 text-sm md:text-base text-zinc-300/80">Tell me your mood. I have trained this little intelligence to turn your feelings into poetry, using the vocabulary of our love.</p>
      </div>

      <div className="w-full max-w-lg mx-auto my-20 flex flex-col gap-5 z-10 p-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 rounded-sm shadow-2xl shadow-amber-800/20">
        {/* The Prompt Input */}
        <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-amber-500/70 mb-4">
                How does the world feel today?
            </h1>
            <p className="text-zinc-400/90 text-sm font-light">
                Tell me your mood, a color, or a thought.
            </p>
        </div>

        <form onSubmit={handleGenerate} className="w-full space-y-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Tired, Rainy, Missing you..."
              className="w-full bg-transparent border-b border-zinc-500 py-4 text-center text-xl font-serif text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-zinc-800 transition-colors"
              disabled={isLoading}
            />
          </div>
            
          <div className="flex justify-center">
            <button 
              disabled={isLoading || !input}
              className="h-10 px-5 bg-amber-400 text-[#111111] flex items-center justify-center gap-3 rounded-full shadow-[0_0_18px_rgba(255,186,0,0.35)] border border-amber-500/80 cursor-pointer hover:bg-amber-300 hover:shadow-[0_0_26px_rgba(255,210,48,0.55)] active:bg-[#e5b620] transition all duration-400 ease-out tracking-widest disabled:opacity-50 hover:scale-105"
            >
              {isLoading ? <Sparkles className="animate-spin w-4 h-4" /> : <Feather className="w-4 h-4" />}
              {isLoading ? "Ink is drying..." : "Write for me"}
            </button>
          </div>
        </form>

        {/* The Poem Output */}
        {poem && (
            <div className="mt-16 relative animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-10">
              <span className="absolute -top-5 -left-3 text-zinc-500 rotate-180 z-10"><LucideQuote /></span>
              
              <div className="bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 p-8 md:p-12 shadow-xl shadow-zinc-500/30 rounded-sm rotate-1 z-0">
                  <p className="font-serif text-lg md:text-xl leading-loose text-zinc-700 whitespace-pre-line text-center">
                      {poem}
                  </p>
              </div>

              <div className="mt-7 mx-auto w-fit flex items-center gap-4">
                <Button text="Save muse" onClick={handleSave} />
                {isSaving ? <Loader2 className="animate-spin" /> : <></>}
              </div>
            </div>
        )}
        <div className="mb-0 mt-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex gap-5 items-center block mx-auto w-fit">
            Generated with Love by Hime AI 
            <span className="w-fit h-fit">
              <LucideHeart fill="#d8364cff" color="" />
            </span>
          </span>
        </div>

      </div>

      {/* Saved Poems */}
        <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 mx-4 md:mx-10 mb-20 rounded-xl overflow-hidden shadow-2xl">
          <h1 className="h-16 px-6 md:px-10 flex items-center text-xl md:text-2xl font-bold text-zinc-300 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-700">
            My Collection
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-10">
            {savedPoems.map((p, i) => (  
              <SavedPoemCard
                key={`${p.id}-${i}`}
                poem={p.poem}
                id={p.id}
                getPoems={getPoems}
              />
            ))}
            
            {savedPoems.length === 0 && (
              <div className="col-span-full text-center text-zinc-500 py-10 italic">
                No poems saved yet. Ask the Muse for something...
              </div>
            )}
          </div>
        </div>
    </main>
  );
}