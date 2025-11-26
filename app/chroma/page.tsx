'use client';

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Home, RefreshCcw, Upload } from 'lucide-react';
import { Vibrant } from 'node-vibrant/browser';
import PaletteBox from "@/components/PaletteBox";
import SavePaletteModal from "@/components/SavePaletteModal";
import Button from "@/components/Button";
import PaletteCard from "@/components/PaletteCard";

type Palette = {
  id: number;
  name: string;
  note: string;
  colors: string[];
}

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [palettes, setPalettes] = useState<Palette[]>([]);

  const handleImageUpload = (e : ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (ev : ProgressEvent<FileReader>) => {
        if(ev?.target?.result) {
          setImage(ev.target.result as string);
        }
      }
      
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const extractColors = async () => {
    if(!image) return;

    const extractedPalette = await Vibrant.from(image).getPalette();

    const extractedColors = Object.values(extractedPalette)
      .map(p => p?.hex)
      .filter((hex) : hex is string => typeof hex === 'string');
    if(extractedColors) {
      setColors(extractedColors);
    }
  }

  const fetchPalettes = async () => {
    try {
      const res = await fetch('/api/palette');
      const data = await res.json();
      
      if(data.success) {
        setPalettes(data.data || []);
      } else {
        console.error('Failed to fetch palettes:', data.error);
        setPalettes([]);
      }
    } catch (error) {
      console.error('Error fetching palettes:', error);
      setPalettes([]);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchPalettes();
    })();
  }, [])

  return (
    <>
      {/* Header */}
      <div className="m-5 space-y-3 text-zinc-200">
        <div className="w-full flex justify-between items-start">
          <Link href='/chroma'>
            <h1 className="text-5xl md:text-6xl font-bold w-fit bg-gradient-to-br from-amber-600 via-amber-500 to-amber-200 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(244,196,48,0.4)]">Chroma</h1>
          </Link>
          <nav className="mt-2 text-sm">
            <Link href='/' className="flex gap-2 items-center text-amber-400/90 hover:text-amber-300 transition-colors">
              <Home size={18} />
              <span>Back to Studio</span>
            </Link>
          </nav>
        </div>
        <p className="ml-1 text-sm md:text-base text-zinc-300">Turn our photos, models, and site shots into palettes you can design with.</p>
        <p className="ml-1 text-[11px] text-amber-400/80 italic">Secret: every palette here is another way I see the world with you, Teru.</p>
      </div>

      {/* Container */}
      <div className="w-[90%] md:w-[60%] h-150 md:h-120 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-yellow-500/25 block mx-auto mt-10 rounded-2xl flex flex-col md:flex-row gap-2 justify-between p-2 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
        {/* Uploader */}
        <div className="w-full md:w-[49%] h-full bg-black/60 flex items-center justify-center rounded-2xl border-r border-zinc-900/60">
          {image ? (
            <>
              <div className="flex flex-col justify-between w-60 h-60 md:h-70">
                <div className="w-full h-40 md:h-50 relative">
                  <Image 
                    src={image}
                    alt="preview"
                    fill
                    className="rounded-xl border-3 border-zinc-800 bg-zinc-950 object-contain overflow-none" 
                  />
                </div>
                <div className="w-full flex justify-evenly">
                  <Button w={30} text="Extract Colors" onClick={extractColors} />
                  <button
                    onClick={() => {
                      setImage(null);
                      setColors([]);
                    }}
                  >
                    <div className="cursor-pointer transform hover:rotate-[-60deg] transition transform duration-300 ease">
                      <RefreshCcw />
                    </div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <label className="w-50 h-10 bg-amber-400 flex items-center justify-center gap-3 rounded-full text-[#111111] cursor-pointer shadow-[0_0_18px_rgba(255,186,0,0.35)] hover:bg-amber-300 hover:shadow-[0_0_26px_rgba(255,210,48,0.55)] transition-colors transition-shadow ease-out duration-300">
                <div>
                  <Upload />
                </div>
                <span>Upload an image</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </>
          )}
        </div>
        
        {/* Preview */}
        <div className="w-full md:w-[49%] h-full bg-black/60 flex items-center justify-center rounded-2xl">
          {colors && colors.length > 0 ? (
            <div className="flex flex-col justify-between h-60 md:h-70">
              <div className="w-73 md:w-79 h-42 md:h-52 flex flex-row items-center justify-center gap-1 bg-zinc-800 rounded">
                {
                  colors.map((hex, index) => (
                    <PaletteBox key={index} hex={hex} />
                  ))
                }
              </div>
              <SavePaletteModal colors={colors} onSaveSuccess={() => fetchPalettes()} />
            </div>
          ) : (
            <>
              <div className="text-xs text-zinc-400">Your colors will appear here once you extract a palette.</div>
            </>
          )}
        </div>
      </div>

      {/* Saved Palettes */}
      <div className="mx-auto w-[90%] md:w-3/4 min-h-60 bg-gradient-to-b from-black to-zinc-950 flex flex-col items-center justify-between my-10 pb-5 rounded-2xl border border-zinc-800/80 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <h1 className="text-2xl md:text-3xl font-semibold bg-zinc-900/70 w-full text-center py-3 rounded-t-2xl text-zinc-100 border-b border-zinc-800">Saved Palettes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
          {palettes.map((p) => (
            <PaletteCard 
              key={p.id} 
              id={p.id} 
              name={p.name} 
              note={p.note} 
              colors={p.colors} 
              onDelete={async () => {
                setPalettes(prev => prev.filter(palette => palette.id !== p.id));
                
                try {
                  await fetchPalettes();
                } catch (error) {
                  setPalettes(prev => [...prev, p]);
                  console.error('Failed to refresh palettes after delete:', error);
                }
              }} 
            />
          ))}
        </div>
      </div>
    </>
  )
}
