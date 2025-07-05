import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../components/ErrorMessage"
import axios, { isAxiosError } from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import type { LoginForm } from "../types"

export const LoginView = () => {

    const initialValues: LoginForm = {
        username: "",
        password: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate()
        const { dispatch } = useAuth()

    const handleLogin = async (formData: LoginForm) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)
            localStorage.setItem('TOKEN_BEARS', data)
            dispatch({ type: 'login' })
            navigate("/")
        } catch (error) {
            if (isAxiosError(error) && error.message) {
                toast.error(error.response?.data.error)
            }
        }

    }

    return (
        <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
            <div className="w-full bg-white/13 shadow-[0_0_5px_black] rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl text-center text-white font-bold leading-tight tracking-tight ">
                        Iniciar sesión
                    </h1>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-4 md:space-y-6">
                        <div>
                            <input
                                type="text"
                                id="user"
                                className="border text-white rounded-lg  placeholder:text-white/65 block w-full p-2.5 outline-0" placeholder="Usuario"
                                {...register('username', {
                                    required: "El usuario es obligatorio"
                                })}
                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                className="border text-white rounded-lg placeholder:text-white/65 block w-full p-2.5 outline-0"
                                {...register("password", {
                                    required: "La contraseña es obligatoria"
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                        <button type="submit" className="w-full bg-[#443b25] hover:bg-[#5b4b30] transition-colors duration-300 cursor-pointer text-white font-medium rounded-lg text-md px-5 py-2.5 ">Ingresar</button>
                        <p className="text-base text-center font-light text-white">
                            ¿No tienes una cuenta? <Link to="/sign-up" className="font-medium hover:underline">Registrarte</Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
