import { Link } from "react-router-dom"
import { navigation } from "../data"
import Kick from "../assets/Kick"
import X from "../assets/X"
import YouTube from "../assets/Youtube"
import Discord from "../assets/Discord"

export const Footer = () => {
    const socialMedias = [
        { name: "X", icon: <X />, url: "https://x.com/portal" },
        { name: "Youtube", icon: <YouTube className="size-8" />, url: "https://www.youtube.com/portal" },
        { name: "Discord", icon: <Discord className="size-8" />, url: "https://discord.com/invite/QqyjD6t3" },
        { name: "Kick", icon: <Kick className="size-10" />, url: "https://kick.com/portal" },
    ]

    return (
        <footer className='bg-primary text-white text-center p-10 mt-8'>
            <div className="max-w-7xl mx-auto space-y-5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <nav className="flex justify-center md:justify-start flex-wrap gap-4">
                        {navigation.map(url => (
                            <Link
                                key={url.id}
                                to={url.to}
                                className="hover:underline"
                            >
                                {url.name}
                            </Link>
                        ))}
                    </nav>
                    <div className='flex justify-center items-center gap-8'>
                        {socialMedias.map((socialMedia, index) => (
                            <a
                                key={index}
                                href={socialMedia.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="size-10 flex items-center justify-center">
                                    {/* Ícono con tamaño y color ajustados */}
                                    <div className="text-white text-2xl">
                                        {socialMedia.icon}
                                    </div>
                                </div>  
                            </a>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="space-y-5">
                    <p>© 2024 RadioBears. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
