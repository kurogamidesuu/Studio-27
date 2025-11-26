import { Heart, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { SetStateAction, useState } from "react";

type Moment = {
  id: number;
  title: string;
  subtitle: string;
  dateLabel: string;
  image: string;
  fixed: boolean;
};

interface MomentCardProps {
  moment: Moment;
  setExpanded: (value: SetStateAction<Moment | null>) => void;
  isLeft: boolean;
  fav: boolean;
  toggleFavorite: (id: number) => void;
  handleRemove: (id: number) => Promise<void>;
}

const MemoryCard = ({
  moment,
  setExpanded,
  isLeft,
  fav,
  toggleFavorite,
  handleRemove,
} : MomentCardProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDelete = async (id: number) => {
    if(!id) return;
    setIsDeleting(true);

    try {
      await handleRemove(id);
    } catch(error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }
  
  return (
    <div
      className="relative flex md:items-stretch gap-4 md:gap-8 cursor-pointer"
      onClick={() => setExpanded(moment)}
    >
      {/* dot */}
      <div className="mt-3 md:mt-0 flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-300 shadow-[0_0_12px_rgba(244,196,48,0.6)]" />
        <span className="mt-2 text-[10px] uppercase tracking-wide text-amber-400/80 hidden md:inline-block">
          {moment.dateLabel}
        </span>
      </div>

      <div
        className={`flex-1 max-w-full md:max-w-[75%] hover:scale-103 transition transform duration-300 ${
          isLeft ? "md:ml-8" : "md:mr-8 md:ml-auto"
        }`}
      >
        <div className="rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 shadow-[0_0_26px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="relative h-52 md:h-64 w-full">
            <Image
              src={moment.image}
              alt={moment.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm md:text-base font-semibold text-amber-400 drop-shadow">
                  {moment.title}
                </h2>
                {moment.subtitle && (
                  <p className="text-[11px] md:text-xs text-zinc-200/80 drop-shadow">
                    {moment.subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(moment.id);
                  }}
                  className="p-1 rounded-full bg-black/40 border border-yellow-400/40 text-amber-400 hover:bg-yellow-400/10 transition-colors"
                  aria-label="Mark as favourite"
                >
                  <Heart size={16} className={fav ? "fill-amber-500 text-amber-600" : ""} />
                </button>
                {!moment.fixed && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(moment.id);
                    }}
                    className="p-1 rounded-full bg-black/40 border border-red-500/50 text-red-400 hover:bg-red-500/40 transition-colors"
                    aria-label="Remove memory"
                  >
                    {isDeleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-5 space-y-2">
            <p className="text-[11px] md:text-xs text-amber-500/90 uppercase tracking-wide">
              {moment.dateLabel}
            </p>
            {moment.fixed ? (
              <p className="text-[11px] text-zinc-500">
                One of our core memories. You can add more around it, but this one stays.
              </p>
            ) : (
              <p className="text-[11px] text-zinc-500">
                You can always change or remove this later. This is your timeline.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryCard