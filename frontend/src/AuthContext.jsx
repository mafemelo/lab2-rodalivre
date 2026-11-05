import { createContext, useContext, useState } from 'react'
import { api, auth } from './api'

const Ctx = createContext(null)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(!!auth.get())

  async function entrar(login, senha) {
    await api.login(login, senha)
    setLogado(true)
  }
  function sair() {
    auth.clear()
    setLogado(false)
  }

  return <Ctx.Provider value={{ logado, entrar, sair }}>{children}</Ctx.Provider>
}