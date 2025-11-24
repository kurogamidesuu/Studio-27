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
import { Slide, ToastContainer } from "react-toastify";

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
      <div className="m-5 space-y-3 text-zinc-300">
        <div className="w-full flex justify-between">
          <Link href='/chroma'>
            <h1 className="text-6xl font-bold w-fit bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text">Chroma</h1>
          </Link>
          <nav className="mt-2">
            <Link href='/'><span className="flex gap-2 items-center"><Home />Return To Homepage</span></Link>
          </nav>
        </div>
        <p className="ml-2 text-lg">Turn any picture into a color palette.</p>
      </div>

      {/* Container */}
      <div className="w-[50%] h-120 bg-slate-500 block mx-auto mt-10 rounded-lg flex justify-between rounded-xl p-1">
        {/* Uploader */}
        <div className="w-[49%] h-full bg-slate-700 flex items-center justify-center rounded-l-xl">
          {image ? (
            <>
              <div className="flex flex-col justify-between w-60 h-70">
                <div className="w-full h-50 relative">
                  <Image 
                    src={image}
                    alt="preview"
                    fill
                    className="rounded-xl border-5 border-zinc-800 bg-zinc-950 object-contain" 
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
              <label className="w-50 h-10 bg-yellow-300 flex items-center justify-center gap-5 rounded-md text-orange-900 cursor-pointer hover:bg-orange-400 transition background ease-in-out duration-300">
                <div>
                  <Upload />
                </div>
                <span>Upload an Image</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </>
          )}
        </div>
        {/* Preview */}
        <div className="w-[49%] h-full bg-gray-700 flex items-center justify-center rounded-r-xl">
          {colors && colors.length > 0 ? (
            <div className="flex flex-col justify-between h-70">
              <div className="w-79 h-52 flex flex-row items-center justify-center gap-1 bg-zinc-800 rounded">
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
              <div>Color Palette will appear here</div>
            </>
          )}
        </div>
      </div>
      <div className="mx-auto w-3/4 min-h-60 bg-gray-500 flex flex-col items-center justify-between my-10 pb-5 rounded-xl">
        <h1 className="text-3xl font-bold bg-slate-700 w-full text-center py-3 rounded-t-xl">Saved Palettes</h1>
        
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
      <ToastContainer
        position="top-center"
        autoClose={2500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Slide}
      />
    </>
  )
}