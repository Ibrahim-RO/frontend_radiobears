import Kick from "../assets/Kick"
import X from "../assets/X"

export const SocialMediasView = () => {
  const socialMedias = [
    { name: "X", icon: <X />, url: "https://x.com/TheRadioBear" },
    { name: "Youtube", icon: <i className="fa-brands fa-youtube text-3xl"></i>, url: "https://www.youtube.com/channel/UCB2WkR_4U9Gn-2NmwB7Clpg" },
    { name: "Kick", icon: <Kick className="size-10" />, url: "https://kick.com/radiobearss" },
    { name: "Tiktok", icon: <i className="fa-brands fa-tiktok"></i>, url: "http://tiktok.com/@radiobearss" },
    { name: "Instagram", icon: <i className="fa-brands fa-instagram text-3xl"></i>, url: "#" },
  ]

  const colorMap: Record<string, string> = {
    X: "bg-neutral-900 text-white hover:bg-neutral-800",
    Youtube: "bg-[#FF0000] text-white hover:bg-[#cc0000]", 
    Kick: "bg-green-600 text-black hover:bg-green-700 ", 
    Tiktok: "bg-neutral-900 text-white hover:bg-neutral-800",
    Instagram: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:brightness-90",
  };


  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold'>Síguenos en Redes Sociales</h2>
      <div className='flex flex-col justify-center items-center px-10 gap-5'>
        {socialMedias.map((socialMedia, index) => (
          <a
            key={index}
            href={socialMedia.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-60 md:w-80 flex items-center p-3 md:p-5 shadow-md rounded-2xl transition ${colorMap[socialMedia.name]}`}
          >
            <div className="size-10 flex items-center justify-center mr-4 px-7">
              {/* Ícono con tamaño y color ajustados */}
              <div className="text-white text-2xl">
                {socialMedia.icon}
              </div>
            </div>
            <div className="w-full font-medium text-center text-base md:text-lg text-white -ml-8">
              {socialMedia.name}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

