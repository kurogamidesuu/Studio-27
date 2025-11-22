import { CSSProperties } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';

const PaletteBox = ({ hex } : {
  hex: string,
}) => {
  const copyColor = async () => {
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
    <div
      className="w-12 h-50 rounded cursor-pointer border border-zinc-700 relative group transition "
      style={{
        background: hex
      }}
      onClick={() => copyColor()}
    >
      <span className="h-full w-full absolute left-1/2 -translate-x-1/2 text-[10px] bg-black/20 text-white flex items-center justify-center rounded opacity-0 group-hover:opacity-50 transition">{hex}</span>
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
    </div>
  )
}

export default PaletteBox