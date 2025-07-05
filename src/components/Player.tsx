import { useRef, useState } from "react"
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid"

export const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="bg-neutral-900 p-2 md:p-4 rounded-xl shadow-md w-50 md:w-55 lg:w-60 flex flex-col items-center gap-4" >
            <div className="flex items-center justify-center gap-3 w-full px-2 sm:flex-nowrap">
                <button
                    onClick={togglePlay}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition"
                >
                    {isPlaying ? (
                        <PauseIcon className="size-3 md:size-5 text-white" />
                    ) : (
                        <PlayIcon className="size-3 md:size-5 text-white" />
                    )}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <SpeakerWaveIcon className="size-3 md:size-5 text-white" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue="1"
                        onChange={(e) => {
                            if (audioRef.current) {
                                audioRef.current.volume = parseFloat(e.target.value)
                            }
                        }}
                        className="w-25 sm:w-28"
                    />
                </div>
            </div>

            <audio ref={audioRef} src="https://servidor30-1.brlogic.com:7128/live?source=website" />
        </div >
    )
}
