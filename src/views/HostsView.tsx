import { useQuery } from "@tanstack/react-query"
import { getHosts } from "../api";

export const HostsView = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["hosts"],
    queryFn: getHosts
  })

  if (isLoading) return 'Cargando...'

  return (
    <section className="mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-5">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold">
        Conoce nuestros hosts
      </h2>

      {data ?
        <div className="flex flex-col md:flex-row flex-wrap justify-center px-4 md:px-10 gap-8">
          {data.map((host) => (
            <div key={host.id} className="flex flex-col items-center">
              {/* Imagen con hover overlay en pantallas grandes */}
              <div className="w-60 h-40 sm:w-80 sm:h-60 lg:rounded-lg relative group overflow-hidden">
                <img
                  src={host.image || ""}
                  alt={host.name}
                  className="w-full h-full object-cover"
                />

                {/* Hover content solo visible en desktop */}
                <div className="hidden lg:block absolute top-0 -right-full w-full h-full bg-[#a18262]/60 p-5 text-neutral-900 
                text-start space-y-2 group-hover:right-0 duration-500 ease-linear">
                  <p className="text-3xl text-center font-bold">{host.name}</p>
                  <p className="text-base font-bold">Edad: {host.age}</p>
                  <p className="text-base">{host.description}</p>
                </div>
              </div>

              {/* Info debajo de la imagen en mobile/tablet (oculta en desktop) */}
              <div className="block lg:hidden bg-[#a18262]/30 w-60 sm:w-80 p-4 space-y-2">
                <p className="text-2xl text-center font-bold">{host.name}</p>
                <p className="text-sm font-bold">Edad: {host.age}</p>
                <p className="text-sm">{host.description}</p>
              </div>
            </div>
          ))}
        </div>
        : (
          <p className="text-gray-900">No hay hosts registrados, añade uno</p>
        )
      }

    </section>
  )
};
