import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { navigation } from "../data"
import { Player } from "./Player"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"


export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { state, dispatch } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem("TOKEN_BEARS")
        dispatch({ type: "logout" })
        toast.success("Sesión cerrada")
        navigate("/")
    }

    return (
        <header className="fixed top-0 left-0 w-full px-6 lg:p-0 bg-primary mx-auto z-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
                <div>
                    <Link to={'/'}>
                        <img
                            src="https://framerusercontent.com/images/G86SEp0QCremiXNsbHp2o3BdYQA.png?scale-down-to=512"
                            alt="Logo"
                            className="w-30 animate-float"
                        />
                    </Link>
                </div>

                <Player />

                <nav className="hidden lg:flex items-center text-white space-x-5">
                    {navigation.map(url => (
                        <NavLink
                            key={url.id}
                            to={url.to}
                            className={({ isActive }) =>
                                `font-fredoka lg:text-lg uppercase relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-200 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-yellow-200' : 'text:white'}`
                            }
                        >
                            {url.name}
                        </NavLink>
                    ))}

                    {state.isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="bg-yellow-400 hover:bg-yellow-500 px-2.5 py-1.5 rounded-xl font-fredoka lg:text-lg text-black uppercase cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <NavLink to="/login" className="bg-yellow-400 hover:bg-yellow-500 px-2.5 py-1.5 rounded-xl font-fredoka lg:text-lg text-black uppercase cursor-pointer">
                            Acceder
                        </NavLink>
                    )}
                </nav>

                <button
                    className="lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="open-menu"
                >
                    {menuOpen ? (
                        <XMarkIcon className="h-6 w-6 text-white" />
                    ) : (
                        <Bars3Icon className="h-6 w-6 text-white" />
                    )}
                </button>
            </div>

            {/* Navegación móvil */}
            {menuOpen && (
                <nav className="lg:hidden bg-primary px-4 pb-4 space-y-2 text-white flex flex-col">
                    <NavLink to='/' onClick={() => setMenuOpen(false)}>Inicio</NavLink>
                    <NavLink to='/lives' onClick={() => setMenuOpen(false)}>Lives</NavLink>
                    <NavLink to='/hosts' onClick={() => setMenuOpen(false)}>Hosts</NavLink>
                    <NavLink to='/events' onClick={() => setMenuOpen(false)}>Eventos</NavLink>
                    <NavLink to='/store' onClick={() => setMenuOpen(false)}>Tienda</NavLink>
                    <NavLink to='/social-medias' onClick={() => setMenuOpen(false)}>Redes sociales</NavLink>
                    <NavLink to='/associates' onClick={() => setMenuOpen(false)}>Asociados</NavLink>
                    {state.isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="bg-yellow-400 hover:bg-yellow-500 px-2.5 py-1.5 rounded-xl font-fredoka lg:text-lg text-black uppercase cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <NavLink to="/login" className="w-24 bg-yellow-400 hover:bg-yellow-500 px-2.5 py-1.5 rounded-xl font-fredoka lg:text-lg text-black uppercase cursor-pointer" onClick={() => setMenuOpen(false)}>
                            Acceder
                        </NavLink>
                    )}
                </nav>
            )}

        </header>
    )
}
