import { useState } from "react";
import Modal from '@mui/material/Modal';
import { Backdrop, Fade, TextField } from "@mui/material";
import Button from "./Button";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const SavePaletteModal = ({
  colors,
  onSaveSuccess,
} : {
  colors: string[],
  onSaveSuccess: () => void,
}) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = async (formData: FormData) => {
    setIsSaving(true);

    if(colors && colors.length > 0) {
      const payload = {
        name: formData.get('name'),
        note: formData.get('note'),
        colors: colors
      };

      try {
        const res = await fetch('/api/palette', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if(data.success) {
          toast.success(`${data.data.name} saved successfully!`);
          onSaveSuccess();

          setOpen(false);
        } else {
          toast.error("Failed to save palette");
        }
      } catch (error) {
        console.error(error);
        toast.error("something went wrong");
      }
    }
    setIsSaving(false);
  }

  return (
    <div>
      <div className="mx-auto w-fit">
        <Button text="Save Palette" onClick={handleOpen} />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={open}>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 w-100 h-100 bg-zinc-900 text-gray-300 border-3 border-yellow-600 rounded-xl">
            <div id="transition-modal-title" className="h-full relative">
              <form action={handleSave} className="h-full flex flex-col items-center justify-evenly">
                <span className="absolute top-3 right-3 hover:text-red-400 transition background cursor-pointer">
                  <button onClick={handleClose} className="cursor-pointer">
                    <X />
                  </button>
                </span>
                <h1>Save Current Palette</h1>
                <TextField
                  name="name"
                  variant="filled"
                  label="Palette Name"
                  className="bg-gray-300 rounded-t-md"
                  required
                />
                <TextField
                  name="note"
                  variant="filled"
                  label="A cute note"
                  className="bg-gray-300 rounded-t-md"
                />
                <Button text={isSaving ? "Saving..." : "Save Palette"} />
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default SavePaletteModal