import { createContext, useContext, useReducer } from "react"
import { authReducer, type authActions, type authState } from "../reducers/auth-reducer"

interface AuthContextProps {
  state: authState
  dispatch: React.Dispatch<authActions>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const init = (): authState => ({
  isAuth: !!localStorage.getItem("TOKEN_BEARS"),
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, init)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>")
  return context
}
