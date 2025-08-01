import { VideoCarousel } from "../components/CarruselVideos"
import { Chat } from "../components/Chat"
import { youtubeVideos } from "../data"

export const IndexView = () => {
  return (
    <>
      <section className="hero-image relative min-h-screen">

        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 w-7xl mx-auto mt-15 px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6">

          <div className="overflow-hidden">
            <Chat />
          </div>

          <div className="flex justify-center flex-col items-center gap-4">
            <div className="w-full max-w-xl rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://canary.discord.com/widget?id=1302470720802263110&theme=dark"
                width="100%"
                height="550"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="border-0"
                title="Discord Widget"
              />
            </div>
          </div>


        </div>
      </section>

      <VideoCarousel 
        youtubeVideos={youtubeVideos}
      />


    </>
  )
}
