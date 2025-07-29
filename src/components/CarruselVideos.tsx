import { useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Video = {
  id: number
  url: string
  title: string
  description?: string
  youtube_link: string
  short: boolean
}

type VideoCarouselProps = {
  youtubeVideos: Video[]
}

export const VideoCarousel = ({ youtubeVideos }: VideoCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToIndex = (index: number) => {
    const container = containerRef.current
    if (!container) return

    const children = container.children
    const target = children[index] as HTMLElement
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % youtubeVideos.length
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? youtubeVideos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  return (
    <section className='max-w-7xl mx-auto my-12 px-4 flex flex-col items-center gap-8'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-fredoka font-bold text-white'>
        Nuestros últimos videos
      </h2>

      <div className="relative w-full">
        {/* Botón Izquierda */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition"
          onClick={handlePrev}
        >
          <FaChevronLeft />
        </button>

        {/* Carrusel */}
        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth snap-x snap-mandatory w-full rounded-2xl"
        >
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="w-full flex-shrink-0 snap-start px-4"
            >
              <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-700">
                <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                  {video.short ? (
                    <div className='flex flex-col justify-center items-center p-4'>
                      <img src="/logo.png" alt="Logo" />
                      <p className='text-lg md:text-2xl font-bold text-white'>Para ver el short, da clic en el enlace</p>
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full rounded-t-2xl"
                      src={video.url}
                      title={`YouTube video player ${video.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  )}
                </div>

                <div className="p-6 space-y-3 text-center">
                  <h2 className="text-xl font-semibold text-white">{video.title}</h2>
                  <p className="text-sm text-zinc-300">{video.description}</p>
                  <a
                    href={video.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-amber-400 hover:text-amber-300 font-medium transition"
                  >
                    {video.short ? 'Ver el short en YouTube →' : 'Ver en YouTube →'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Derecha */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition"
          onClick={handleNext}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}
