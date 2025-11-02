import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { ErrorMessage } from "../components/ErrorMessage"
import axios, { isAxiosError } from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import type { LoginForm } from "../types"
import { useState } from "react"

export const LoginView = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
        defaultValues: { username: "", password: "" }
    })

    const navigate = useNavigate()
    const { dispatch } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (formData: LoginForm) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                formData
            )

            // ✅ Verificar estructura esperada del token
            if (!data?.token) {
                toast.error("Respuesta inválida del servidor")
                return
            }

            localStorage.setItem("TOKEN_BEARS", data.token)
            dispatch({ type: "login" })
            toast.success("Inicio de sesión exitoso")
            navigate("/")
        } catch (error) {
            if (isAxiosError(error)) {
                const msg = error.response?.data?.error || "Error al iniciar sesión"
                toast.error(msg)
            } else {
                toast.error("Error inesperado. Intenta nuevamente.")
            }
        }
    }

    return (
        <section className="mt-30 w-full md:w-lg bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6">
            <div className="w-full bg-white/13 shadow-[0_0_5px_black] rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl text-center text-white font-bold leading-tight tracking-tight">
                        Iniciar sesión
                    </h1>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:space-y-6">
                        {/* Usuario */}
                        <div>
                            <input
                                type="text"
                                id="username"
                                className="border text-white rounded-lg placeholder:text-white/65 block w-full p-2.5 outline-0"
                                placeholder="Usuario"
                                {...register("username", {
                                    required: "El usuario es obligatorio",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                })}
                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Contraseña"
                                className="border text-white rounded-lg placeholder:text-white/65 block w-full p-2.5 outline-0 pr-10"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-[#443b25] hover:bg-[#5b4b30] transition-colors duration-300 cursor-pointer text-white font-medium rounded-lg text-md px-5 py-2.5 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
                        </button>

                        <p className="text-base text-center font-light text-white">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/sign-up" className="font-medium hover:underline">
                                Regístrate
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </section>
    )
}
