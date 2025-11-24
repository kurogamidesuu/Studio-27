import { ChevronDown, Copy, Loader2, Trash2 } from "lucide-react"
import { CSSProperties, useState } from "react";
import { Slide, toast } from "react-toastify";

const PaletteCard = ({
  id,
  name,
  note,
  colors,
  onDelete,
} : {
  id: number,
  name: string,
  note: string,
  colors: string[],
  onDelete: () => void | Promise<void>
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/palette', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
      });

      const data = await res.json();
      if(data.success) {
        toast.success(`Deleted ${data.data.name} successfully!`);
        await onDelete();
      } else {
        toast.error('Failed to delete palette');
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }
 
  const copyColor = async (hex: string) => {
    if(!hex) return;
    await navigator.clipboard.writeText(hex);

    toast('Copied to clipboard!', {
      toastId: 'replace-toast',
      updateId: 'replace-toast',
      style: {
        "--toastify-color-progress-light": hex
      } as CSSProperties,
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  }

  return (
    <div>
      <h1 className="font-bold">{name}</h1>
      <p className="text-gray-300">{note}</p>
      <div className="flex items-start">
        <div className={`w-60 flex flex-${isDropdown ? 'col' : 'row'} border-2 border-slate-300 rounded-md overflow-hidden`}>
          {colors.map((color, i) => (
            <div key={i} className="flex">
              <div className={`w-${isDropdown ? '50' : '10'} h-10`} style={{background: color}}></div>
              {isDropdown ? 
                <div className="relative">
                  <span className="absolute right-35 top-1/2 -translate-y-1/2 text-xs bg-black/30 text-white border border-gray-300 rounded-md p-1">{color}</span>
                  <button 
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-10 hover:text-zinc-700 transition text duration-200 ease"
                    onClick={() => copyColor(color)}
                  >
                    <Copy />
                  </button>
                </div>
                : 
                <></>}
            </div>
          ))}
        </div>
        <button
          className="h-10 w-10 text-center hover:text-zinc-700 transition text duration-150 ease"
          onClick={() => setIsDropdown(!isDropdown)}
          aria-label={`${isDropdown ? 'Collapse' : 'Expand'} palette colors`}
          aria-expanded={isDropdown}
        >
          <ChevronDown className={`${isDropdown ? 'rotate-90' : ''} transition rotate duration-400`} />
        </button>

        <button
          className="h-10 text-slate-300 cursor-pointer bg-red-800 rounded-md px-1 hover:bg-red-900 transition background duration-150 ease"
          onClick={handleDelete}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
        </button>
      </div>
    </div>
  )
}

export default PaletteCard