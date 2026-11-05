import { createContext, useContext, useEffect, useState } from 'react'
import { api, auth } from './api'

const Ctx = createContext(null)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(!!auth.get())
  const [papel, setPapel] = useState(sessionStorage.getItem('rl_papel'))

  useEffect(() => {
    if (auth.get() && !papel) {
      api.me().then((m) => definir(m.papel)).catch(() => sair())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function definir(p) {
    sessionStorage.setItem('rl_papel', p)
    setPapel(p)
  }

  async function entrar(login, senha) {
    const m = await api.login(login, senha)
    definir(m.papel)
    setLogado(true)
    return m.papel
  }
  function sair() {
    auth.clear()
    sessionStorage.removeItem('rl_papel')
    setPapel(null)
    setLogado(false)
  }

  return <Ctx.Provider value={{ logado, papel, entrar, sair }}>{children}</Ctx.Provider>
}