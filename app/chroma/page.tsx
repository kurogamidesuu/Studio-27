'use client';

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Home, RefreshCcw, Upload } from 'lucide-react';
import { Vibrant } from 'node-vibrant/browser';
import PaletteBox from "@/components/PaletteBox";
import { savePalette } from "../actions";

type VibrantPalette = Awaited<
  ReturnType<ReturnType<typeof Vibrant.from>["getPalette"]>
>;

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<VibrantPalette | null>(null);

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
    setPalette(extractedPalette);
  }

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
              <div className="flex flex-col justify-between h-70">
                <Image src={image} alt="preview" width={300} height={100} className="rounded-xl border-5 border-zinc-800 " />
                <div className="w-full flex justify-evenly">
                  <button 
                    onClick={() => extractColors()}
                    className="w-30 h-10 bg-yellow-300 rounded-md text-orange-900 cursor-pointer hover:bg-orange-400 transition background ease-in-out duration-300"
                  >
                    Extract Colors
                  </button>
                  <button
                    onClick={() => {
                      setImage(null);
                      setPalette(null);
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
              <label className="w-50 h-10 bg-yellow-300 flex items-center justify-center gap-5 rounded-md text-orange-900 cursor-pointer">
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
          {palette ? (
            <div className="flex flex-col justify-between h-70">
              <div className="w-79 h-52 flex flex-row items-center justify-center gap-1 bg-zinc-800 rounded">
                <PaletteBox hex={palette.DarkMuted?.hex as string} />
                <PaletteBox hex={palette.DarkVibrant?.hex as string} />
                <PaletteBox hex={palette.LightMuted?.hex as string} />
                <PaletteBox hex={palette.LightVibrant?.hex as string} />
                <PaletteBox hex={palette.Muted?.hex as string} />
                <PaletteBox hex={palette.Vibrant?.hex as string} />
              </div>
              <button 
                className="relative bottom-0 block mx-auto w-30 h-10 bg-yellow-300 rounded-md text-orange-900 cursor-pointer hover:bg-orange-400 transition background ease-in-out duration-300"
                onClick={() => savePalette}
              >
                Save Palette
              </button>
            </div>
          ) : (
            <>
              <div>Color Palette will appear here</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}