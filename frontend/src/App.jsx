import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Carros from './pages/Carros'
import Pedidos from './pages/Pedidos'
import Perfil from './pages/Perfil'

function Protegida({ children }) {
  const { logado } = useAuth()
  return logado ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { logado, sair } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <header>
        <h1>🚗 Roda <span>Livre</span></h1>
        <nav>
          {logado ? (
            <>
              <NavLink to="/carros">Carros</NavLink>
              <NavLink to="/pedidos">Meus pedidos</NavLink>
              <NavLink to="/perfil">Meus dados</NavLink>
              <button className="sec" onClick={() => { sair(); navigate('/login') }}>Sair</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Entrar</NavLink>
              <NavLink to="/cadastro">Cadastrar</NavLink>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/carros" element={<Protegida><Carros /></Protegida>} />
          <Route path="/pedidos" element={<Protegida><Pedidos /></Protegida>} />
          <Route path="/perfil" element={<Protegida><Perfil /></Protegida>} />
          <Route path="*" element={<Navigate to={logado ? '/carros' : '/login'} replace />} />
        </Routes>
      </main>
      <footer>Roda Livre · Lab 02 DIAW · Imagens: Wikipedia / Wikimedia Commons</footer>
    </>
  )
}