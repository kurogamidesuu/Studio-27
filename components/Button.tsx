const Button = ({
  text,
  onClick,
  w,
} : {
  text: string,
  onClick?: () => void,
  w?: number
}) => {
  const widthClass = w ? `w-[${w}%]` : "w-40 md:w-50";

  return (
    <button
      className={`${widthClass} h-10 px-5 bg-amber-400 text-[#111111] flex items-center justify-center gap-3 rounded-full shadow-[0_0_18px_rgba(255,186,0,0.35)] border border-amber-500/80 cursor-pointer hover:bg-amber-300 hover:shadow-[0_0_26px_rgba(255,210,48,0.55)] active:bg-[#e5b620] transition-colors transition-shadow duration-300 ease-out`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
