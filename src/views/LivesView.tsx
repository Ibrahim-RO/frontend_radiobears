import Kick from "../assets/Kick"

export const LivesView = () => {
  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 md:px-10">
        <h2 className='text-2xl md:text-4xl lg:text-5xl font-fredoka text-center lg:text-left font-bold'>Estamos en vivo, ¿te lo vas a perder?</h2>
        <a 
          href="https://kick.com/radiobears" 
          target="_blank" title="Kick RadioBeard"
          className="bg-green-600  hover:bg-green-700 mx-auto lg:mx-0 text-sm md:text-base text-white p-2 md:p-3 rounded-lg flex justify-center items-center gap-2 cursor-pointer"
        >
          <Kick className="size-5 md:size-8"/>
          Meet RadioBears
        </a>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:items-center gap-4 md:px-10'>
        <p className='text-base md:text-lg text-yellow-100 text-center md:text-left'>
          Emitiendo desde <span className='block md:inline text-4xl md:text-6xl text-yellow-300 font-extrabold'>2024</span>
        </p>
        <p className='text-base md:text-lg'>¡Ya estamos EN VIVO en Kick! ¿Te lo vas a perder? Entra al stream, únete al chat y forma parte del desmadre Risas, juegos y buena vibra… ¡sólo faltas tú!</p>
      </div>
      <video src="/radio.mp4" controls width="600" height="320" autoPlay loop muted poster="imagen_portada.jpg" preload="auto">
        Tu navegador no soporta este video.
      </video>
    </section>
  )
}
