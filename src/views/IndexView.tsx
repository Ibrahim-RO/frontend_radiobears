import { Chat } from "../components/Chat"

export const IndexView = () => {
  return (
    <section className="hero-image relative min-h-screen">

      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-7xl mx-auto mt-15 px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
        
        <div className="h-[600px] overflow-hidden">
          <Chat />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://discord.com/widget?id=1282839904933646356&amp;theme=dark"
              width="100%"
              height="400"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="border-0"
              title="Discord Widget"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
