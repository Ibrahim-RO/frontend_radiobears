import { useQuery } from "@tanstack/react-query"
import { getEvents } from "../api"

export const EventsView = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents
  })

  if (isLoading) return 'Cargando ...'

  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold'>Nuestros eventos</h2>
      {data ?
        <div className='flex flex-col md:flex-row justify-center items-center px-10 gap-5'>
          {data.map(event => (
            <div
              key={event.id}
              className="max-w-sm mx-auto bg-yellow-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={event.image || ""}
                alt={event.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  {event.name}
                </h2>
                <p className="text-gray-600 text-center">{event.description}</p>
                <p className="text-sm text-gray-500 text-center">
                  📅 {event.dateEvent}
                </p>
              </div>
            </div>

          ))}
        </div>
        : (
          <p>No hay eventos</p>
        )}

    </section>
  )
}
