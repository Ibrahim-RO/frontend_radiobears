import { associates } from "../data"

export const Associates = () => {
  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold'>Nuestros asociados</h2>
      <div className='flex flex-col md:flex-row justify-center items-center px-10 gap-5'>
        {associates.map(associate => (
          <div key={associate.id} className="space-y-3">
            <img
              src={associate.img}
              alt={associate.id.toString()}
              className="w-60"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
