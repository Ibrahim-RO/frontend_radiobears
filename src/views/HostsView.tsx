import { hosts } from "../data"

export const HostsView = () => {
  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold'>Conoce nuestros hosts</h2>
      <div className='flex flex-col md:flex-row flex-wrap justify-center px-10 gap-8'>
        {hosts.map(host => (
          <div key={host.id} className="w-70 flex flex-col bg-[#5C2F13] shadow-[0_0_10px_1px_black] rounded-4xl overflow-hidden">
            <div>
              <img
                src={host.img}
                alt={host.name}
                className="w-full h-40 md:h-50 object-cover overflow-hidden"
              />
            </div>
            <div className="p-5 space-y-2">
              <p className="text-2xl md:text-3xl text-center">{host.name}</p>
              <p className="text-sm md:text-base font-bold">Edad: {host.age}</p>
              <div>
                <p className="text-sm md:text-base font-bold">Descripción:</p>
                <p>{host.description}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
