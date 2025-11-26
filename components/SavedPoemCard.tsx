import { Loader2, LucideQuote, Trash } from "lucide-react"
import { useState } from "react";
import { toast } from "react-toastify";

interface SavedPoemCardProps {
  poem: string;
  id: number;
  getPoems: () => Promise<void>
}

const SavedPoemCard = ({
  poem,
  id,
  getPoems
} : SavedPoemCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async (id: number) => {
    if(!id) return;
    setIsDeleting(true);

    try {
      const res = await fetch('/api/muse/poem', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
      });
      const data = await res.json();
      if(data.success) {
        getPoems();
        toast.success('Deleted poem successfully');
      } else {
        toast.error('Error deleting poem');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700">
          
      {/* Quote Icon */}
      <span className="absolute -top-4 -left-2 text-zinc-500/50 rotate-180 z-10">
        <LucideQuote size={32} />
      </span>
      
      {/* The Paper Card */}
      <div className="bg-[#f0f0f0] p-6 pt-8 pb-12 shadow-lg shadow-black/40 rounded-sm rotate-1 hover:rotate-0 transition-transform duration-300 min-h-[200px] flex flex-col justify-center relative">
          <p className="font-serif text-base leading-relaxed text-zinc-800 whitespace-pre-line text-center">
              {poem}
          </p>

          <button 
            onClick={() => handleDelete(id)}
            className="absolute bottom-3 right-3 text-zinc-400 hover:text-red-500 transition-colors p-2"
            title="Delete Poem"
          >
            {isDeleting ? <Loader2 className="animate-spin text-red-500" size={18} /> : <Trash size={18} />}
          </button>
      </div>
    </div>
  )
}

export default SavedPoemCard