import { ArrowRightIcon, LucideIcon } from "lucide-react";
import Link from "next/link";

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
    <div className="h-50 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900  border border-amber-400/30 rounded-xl z-20 flex flex-col gap-3 p-5 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/10 group transition duration-300">
      <span className={`group-hover:text-[${color}]`}>{<Icon size={50} opacity={0.8} style={{color: color}} />}</span>
      <div>
        <h1 className="text-2xl font-bold group-hover:text-amber-600 transition color duration-300">{name}</h1>
        <p className="italic text-sm text-zinc-400">{description}</p>
      </div>
      <div className="flex gap-2">
        <p className="opacity-0 group-hover:opacity-100 transition opacity duration-200 text-amber-600/60">Go to app</p>
        <span className="relative -left-20 group-hover:text-amber-600/60 group-hover:translate-x-20 transition transform duration-200">
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