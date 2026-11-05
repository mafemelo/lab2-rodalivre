import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { entrar } = useAuth()
  const navigate = useNavigate()

  async function enviar(e) {
    e.preventDefault()
    setErro(''); setEnviando(true)
    try {
      await entrar(login, senha)
      navigate('/carros')
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="card auth-card">
      <h2>Bem-vindo de volta 👋</h2>
      <p className="sub">Entre para alugar seu próximo carro.</p>
      <label>Usuário</label>
      <input value={login} onChange={(e) => setLogin(e.target.value)} autoFocus />
      <label>Senha</label>
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && enviar(e)} />
      <button onClick={enviar} disabled={enviando}>{enviando ? 'Entrando...' : 'Entrar'}</button>
      {erro && <p className="erro">{erro}</p>}
      <p className="sub" style={{ marginTop: 16 }}>Novo por aqui? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  )
}