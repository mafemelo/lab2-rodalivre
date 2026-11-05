import { useEffect, useState } from 'react'
import { api } from '../api'
import CarImage from '../components/CarImage'

const rotulos = {
  EM_ANALISE: 'Em análise', APROVADO: 'Aprovado', REJEITADO: 'Rejeitado',
  CONTRATADO: 'Contratado', CANCELADO: 'Cancelado',
}
const vazio = { matricula: '', ano: new Date().getFullYear(), marca: '', modelo: '', placa: '' }

export default function Agente() {
  const [pedidos, setPedidos] = useState([])
  const [carros, setCarros] = useState([])
  const [novo, setNovo] = useState(vazio)
  const [erro, setErro] = useState('')
  const [msg, setMsg] = useState('')

  async function carregar() {
    try {
      const [p, c] = await Promise.all([api.pedidosAgente(), api.automoveis()])
      setPedidos(p); setCarros(c)
    } catch (e) { setErro(e.message) }
  }
  useEffect(() => { carregar() }, [])

  async function agir(fn) {
    setErro(''); setMsg('')
    try { await fn(); await carregar() } catch (e) { setErro(e.message) }
  }

  const set = (c) => (e) => setNovo({ ...novo, [c]: e.target.value })

  async function adicionar() {
    await agir(async () => {
      await api.novoCarro({ ...novo, ano: Number(novo.ano), placa: novo.placa.toUpperCase() })
      setNovo(vazio)
      setMsg('Carro adicionado.')
    })
  }

  return (
    <>
      <h2>Painel do agente</h2>
      {erro && <p className="erro">{erro}</p>}
      {msg && <p className="ok">{msg}</p>}

      <h3>Pedidos recebidos</h3>
      {pedidos.length === 0 && <div className="card vazio">Nenhum pedido recebido.</div>}
      {pedidos.map((p) => (
        <div className="card pedido" key={p.id}>
          <div className="thumb"><CarImage busca={p.automovel.replace(/\s\d{4}$/, '')} /></div>
          <div className="info">
            <strong>{p.automovel}</strong>
            <div>Cliente: {p.cliente} · Placa {p.placa}</div>
          </div>
          <span className={`badge ${p.status}`}>{rotulos[p.status]}</span>
          {p.status === 'EM_ANALISE' && (
            <>
              <button onClick={() => agir(() => api.avaliar(p.id, 'aprovar'))}>Aprovar</button>
              <button className="perigo" onClick={() => agir(() => api.avaliar(p.id, 'rejeitar'))}>Rejeitar</button>
            </>
          )}
          {p.status === 'APROVADO' && (
            <button onClick={() => agir(() => api.avaliar(p.id, 'contratar'))}>Gerar contrato</button>
          )}
        </div>
      ))}

      <h3 style={{ marginTop: 28 }}>Frota</h3>
      <div className="card">
        <div className="grid2">
          <div><label>Marca</label><input value={novo.marca} onChange={set('marca')} /></div>
          <div><label>Modelo</label><input value={novo.modelo} onChange={set('modelo')} /></div>
          <div><label>Ano</label><input type="number" value={novo.ano} onChange={set('ano')} /></div>
          <div><label>Placa</label><input maxLength={7} value={novo.placa} onChange={set('placa')} placeholder="ABC1D23" /></div>
        </div>
        <label>Matrícula (RENAVAM)</label>
        <input maxLength={11} value={novo.matricula} onChange={(e) => setNovo({ ...novo, matricula: e.target.value.replace(/\D/g, '') })} />
        <button onClick={adicionar}>+ Adicionar carro</button>
      </div>
      {carros.map((c) => (
        <div className="card linha" key={c.id}>
          <span><strong>{c.marca} {c.modelo}</strong> · {c.ano} · {c.placa}</span>
          <button className="perigo" onClick={() => agir(() => api.removerCarro(c.id))}>Remover</button>
        </div>
      ))}
    </>
  )
}