import { useEffect, useState } from 'react'
import { api } from '../api'
import CarImage from '../components/CarImage'

const rotulos = {
  EM_ANALISE: 'Em análise', APROVADO: 'Aprovado', REJEITADO: 'Rejeitado',
  CONTRATADO: 'Contratado', CANCELADO: 'Cancelado',
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregar() {
    try {
      setPedidos(await api.pedidos())
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }
  useEffect(() => { carregar() }, [])

  async function cancelar(id) {
    setErro('')
    try {
      await api.cancelarPedido(id)
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h2>Meus pedidos</h2>
      {erro && <p className="erro">{erro}</p>}
      {carregando && <p className="vazio">Carregando pedidos...</p>}
      {!carregando && !erro && pedidos.length === 0 && (
        <div className="card vazio">Você ainda não fez nenhum pedido. Escolha um carro na aba Carros.</div>
      )}
      {pedidos.map((p, i) => (
        <div className="card pedido" key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
          <div className="thumb"><CarImage busca={p.automovel.replace(/\s\d{4}$/, '')} /></div>
          <div className="info">
            <strong>{p.automovel}</strong>
            <div>Placa {p.placa} · pedido em {new Date(p.dataPedido + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
          </div>
          <span className={`badge ${p.status}`}>{rotulos[p.status]}</span>
          {p.status === 'EM_ANALISE' && (
            <button className="perigo" onClick={() => cancelar(p.id)}>Cancelar</button>
          )}
        </div>
      ))}
    </>
  )
}