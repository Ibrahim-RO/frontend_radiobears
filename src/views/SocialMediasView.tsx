import { useQuery } from "@tanstack/react-query"
import type { JSX } from "react"
import { getSocialMedias } from "../api"

export const SocialMediasView = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["socialMedias"],
    queryFn: getSocialMedias,
  })

  if (isLoading) return "Cargando..."

  // Mapa de íconos
  const iconMap: Record<string, JSX.Element> = {
    X: <i className="fa-brands fa-x-twitter text-2xl"></i>,
    Youtube: <i className="fa-brands fa-youtube text-3xl"></i>,
    Kick: <i className="fa-brands fa-kickstarter text-2xl"></i>,
    Discord: <i className="fa-brands fa-discord text-2xl"></i>,
    Tiktok: <i className="fa-brands fa-tiktok text-2xl"></i>,
    Instagram: <i className="fa-brands fa-instagram text-3xl"></i>,
  }

  // Mapa de colores
  const colorMap: Record<string, string> = {
    X: "bg-neutral-900 text-white",
    Youtube: "bg-[#FF0000] text-white",
    Kick: "bg-green-600 text-white",
    Discord: "bg-[#5865F2] text-white",
    Tiktok: "bg-neutral-900 text-white",
    Instagram:
      "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white",
  }

  const dataFilter = data?.filter( item => item.isActive )

  return (
    <div className="w-full mt-30 space-y-5">
      <h1 className="text-4xl font-extrabold uppercase">Redes sociales</h1>

      {data?.length ? (
        <div className="space-y-5">
          {dataFilter?.map((social) => (
            <>
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                className={`w-[300px] md:w-[350px] flex items-center gap-4 p-5 rounded-2xl ${colorMap[social.name]}`}
              >
                {iconMap[social.name]}
                <p className="text-lg">{social.name}</p>
              </a>
            </>

          ))}
        </div>
      ) : (
        <p className="text-gray-900">No hay redes sociales, añade uno</p>
      )}
    </div>
  )
}
