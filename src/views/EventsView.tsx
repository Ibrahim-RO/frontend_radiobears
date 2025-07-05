import { events } from "../data"

export const EventsView = () => {
  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold'>Nuestros eventos</h2>
      <div className='flex flex-col md:flex-row justify-center items-center px-10 gap-5'>
        {events.map( event => (
          <div key={event.id} className="space-y-3">
            <img 
              src={event.url} 
              alt={event.name} 
              className="w-60"
            />
            <p className="text-xl text-center">Próximamente</p>
          </div>
        ) )}
      </div>
    </section>
  )
}
