import { ArrowRightIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  url: string;
  color: string;
}

const ServiceCard = ({
  name,
  description,
  icon : Icon,
  comingSoon,
  url,
  color
} : ServiceCardProps) => {
  const card = (
    <div className="h-50 bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900 border border-amber-600/30 rounded-2xl z-20 flex flex-col gap-3 p-5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(244,196,48,0.18)] group transition-transform transition-shadow duration-300 ease-out">
      <span style={{color: color}}>
        <Icon className="h-7 md:h-12 w-7 md:w-12" opacity={0.9} />
      </span>
      <div>
        <h1 className={`text-2xl font-semibold text-zinc-50 transition-colors duration-300`} style={{'--dynamicColor': color} as CSSProperties}>{name}</h1>
        <style>
          {`
            .group:hover h1 {
              color: var(--dynamicColor);
            }
          `}
        </style>
        <p className="italic text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">{description}</p>
      </div>
      <div className="flex gap-2 items-center mt-auto">
        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-amber-400/80 text-sm">Open studio</p>
        <span className="relative -left-20 group-hover:left-0 text-amber-400/60 group-hover:text-amber-400/90 transition-all duration-200">
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  );

  if(comingSoon) {
    return (
      <div className="cursor-not-allowed">
        {card}
      </div>
    )
  }

  return (
    <Link href={url}>
      {card}
    </Link>
  )
}

export default ServiceCard