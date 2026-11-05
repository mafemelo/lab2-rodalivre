import { useEffect, useState } from 'react'
import { api } from '../api'
import { maskCpf, limpaRg, soDigitos, moeda } from '../utils'

export default function Perfil() {
  const [f, setF] = useState(null)
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.meusDados().then(setF).catch((e) => setErro(e.message))
  }, [])

  if (!f) return <p className={erro ? 'erro' : 'vazio'}>{erro || 'Carregando...'}</p>

  const set = (campo, tratar = (v) => v) => (e) => setF({ ...f, [campo]: tratar(e.target.value) })

  async function salvar() {
    setMsg(''); setErro('')
    if (f.rg.length < 5) return setErro('RG deve ter de 5 a 14 caracteres')
    if (soDigitos(f.cpf).length !== 11) return setErro('CPF deve ter 11 dígitos')
    try {
      const { rg, cpf, nome, endereco, profissao, rendimentos } = f
      setF(await api.atualizarDados({ rg, cpf: soDigitos(cpf), nome, endereco, profissao, rendimentos }))
      setMsg('Dados atualizados com sucesso.')
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <div className="card">
      <h2>Meus dados</h2>
      <span className="chip">Usuário: {f.login}</span>
      <div className="grid2">
        <div><label>Nome</label><input maxLength={100} value={f.nome} onChange={set('nome')} /></div>
        <div><label>Profissão</label><input maxLength={60} value={f.profissao} onChange={set('profissao')} /></div>
        <div><label>RG</label><input maxLength={14} value={f.rg} onChange={set('rg', limpaRg)} /></div>
        <div><label>CPF</label><input inputMode="numeric" maxLength={14} value={maskCpf(f.cpf)} onChange={set('cpf', soDigitos)} /></div>
      </div>
      <label>Endereço</label>
      <input maxLength={150} value={f.endereco} onChange={set('endereco')} />
      <h3>Rendimentos</h3>
      {f.rendimentos.length === 0 && <p className="sub">Nenhum rendimento cadastrado.</p>}
      {f.rendimentos.map((r, i) => (
        <div key={i} className="chip" style={{ marginRight: 8 }}>{r.entidadeEmpregadora}: {moeda(r.valor)}</div>
      ))}
      <br />
      <button onClick={salvar}>Salvar alterações</button>
      {msg && <p className="ok">{msg}</p>}
      {erro && <p className="erro">{erro}</p>}
    </div>
  )
}