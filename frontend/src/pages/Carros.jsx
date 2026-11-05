import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import CarImage from '../components/CarImage'

export default function Carros() {
  const [carros, setCarros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.automoveis().then(setCarros).catch((e) => setErro(e.message)).finally(() => setCarregando(false))
  }, [])

  async function alugar(id) {
    setErro(''); setEnviando(id)
    try {
      await api.criarPedido(id)
      navigate('/pedidos')
    } catch (e) {
      setErro(e.message)
      setEnviando(null)
    }
  }

  return (
    <>
      <h2>Escolha seu carro</h2>
      {erro && <p className="erro">{erro}</p>}
      {carregando && <p className="vazio">Carregando carros...</p>}
      <div className="grid-carros">
        {carros.map((c, i) => (
          <div className="car-card" key={c.id} style={{ animationDelay: `${i * 80}ms` }}>
            <CarImage busca={`${c.marca} ${c.modelo}`} />
            <div className="corpo">
              <h3>{c.marca} {c.modelo}</h3>
              <span className="chip">{c.ano}</span>
              <div>Placa: <strong>{c.placa}</strong></div>
              <button onClick={() => alugar(c.id)} disabled={enviando === c.id}>
                {enviando === c.id ? 'Enviando...' : 'Pedir aluguel'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}