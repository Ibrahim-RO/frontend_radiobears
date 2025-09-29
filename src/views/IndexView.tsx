import { VideoCarousel } from "../components/CarruselVideos"
import { Chat } from "../components/Chat"

export const IndexView = () => {
  return (
    <>
      <section className="hero-image relative min-h-screen">

        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 w-7xl mx-auto mt-15 px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6">

          <div className="overflow-hidden">
            <Chat />
          </div>

          <div>
            <VideoCarousel />
          </div>

        </div>
      </section>

    </>
  )
}
