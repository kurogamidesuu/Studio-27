const Button = ({
  text,
  onClick,
  w,
} : {
  text: string,
  onClick?: () => void,
  w?: number
}) => {
  return (
    <button
      className={`w-${w ? w : 50} h-10 bg-yellow-300 flex items-center justify-center gap-5 text-orange-900 cursor-pointer rounded-md text-orange-900 cursor-pointer hover:bg-orange-400 transition background ease-in-out duration-300`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button