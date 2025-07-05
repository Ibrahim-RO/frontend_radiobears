import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios, { isAxiosError } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { ErrorMessage } from '../components/ErrorMessage'
import type { RegisterForm } from '../types'

export const SignUpView = () => {

  const initialValue: RegisterForm = {
    username: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValue })

  const password = watch('password')

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData)
      toast.success(data)
      reset()
    } catch (error) {
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <section className='mt-30 bg-yellow-100/15 rounded-2xl p-8 flex flex-col justify-between items-center gap-6'>
      <div className="w-full bg-white/13 shadow-[0_0_5px_black] rounded-2xl sm:max-w-md">
        <div className="p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-white">
            Registro
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            <div>
              <input
                type="text"
                id="username"
                placeholder="Usuario"

                className="w-full p-2.5 rounded-lg border bg-transparent text-white placeholder-white/70 outline-none focus:ring focus:ring-[#8e734f]"
                {...register('username', {
                  required: "Tu nombre es obligatorio"
                })}
              />
              {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            </div>

            <div>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="w-full p-2.5 rounded-lg border bg-transparent text-white placeholder-white/70 outline-none focus:ring focus:ring-[#8e734f]"
                {...register('password', {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe ser mínimo de 8 caracteres"
                  }
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

            </div>

            <div>
              <input
                type="password"
                id="password_confirmation"
                placeholder="Repite la contraseña"
                className="w-full p-2.5 rounded-lg border bg-transparent text-white placeholder-white/70 outline-none focus:ring focus:ring-[#8e734f]"
                {...register('password_confirmation', {
                  required: "La contraseña es obligatoria",
                  validate: (value) => value === password || "Las contraseñas no son iguales"
                })}
              />
              {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

            </div>

            <button
              type="submit"
              className="w-full bg-[#443b25] hover:bg-[#5b4b30] transition-colors text-white font-semibold rounded-lg px-5 py-2.5 cursor-pointer"
            >
              Registrarte
            </button>

            <p className="text-base text-white text-center">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="font-semibold hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}
