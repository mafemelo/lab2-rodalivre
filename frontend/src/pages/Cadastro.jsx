import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { maskCpf, limpaRg, soDigitos } from '../utils'

const vazio = { login: '', senha: '', rg: '', cpf: '', nome: '', endereco: '', profissao: '' }

export default function Cadastro() {
  const [f, setF] = useState(vazio)
  const [rendas, setRendas] = useState([])
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const set = (campo, tratar = (v) => v) => (e) => setF({ ...f, [campo]: tratar(e.target.value) })
  const addRenda = () => rendas.length < 3 && setRendas([...rendas, { entidadeEmpregadora: '', valor: '' }])
  const delRenda = (i) => setRendas(rendas.filter((_, idx) => idx !== i))
  const setRenda = (i, campo, valor) =>
    setRendas(rendas.map((r, idx) => (idx === i ? { ...r, [campo]: valor } : r)))

  function validar() {
    if (f.login.trim().length < 3) return 'Usuário deve ter ao menos 3 caracteres'
    if (f.senha.length < 6) return 'Senha deve ter ao menos 6 caracteres'
    if (!f.nome.trim()) return 'Informe o nome'
    if (f.rg.length < 5) return 'RG deve ter de 5 a 14 caracteres'
    if (soDigitos(f.cpf).length !== 11) return 'CPF deve ter 11 dígitos'
    if (!f.endereco.trim()) return 'Informe o endereço'
    if (!f.profissao.trim()) return 'Informe a profissão'
    for (const r of rendas) {
      if (!r.entidadeEmpregadora.trim() || r.valor === '' || Number(r.valor) < 0)
        return 'Preencha empregador e valor (maior ou igual a zero) em todos os rendimentos'
    }
    return ''
  }

  async function enviar() {
    const msg = validar()
    if (msg) return setErro(msg)
    setErro(''); setEnviando(true)
    try {
      await api.cadastrar({
        ...f,
        cpf: soDigitos(f.cpf),
        rendimentos: rendas.map((r) => ({ ...r, valor: Number(r.valor) })),
      })
      alert('Cadastro realizado! Faça login.')
      navigate('/login')
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="card">
      <h2>Criar conta de cliente</h2>
      <div className="grid2">
        <div><label>Usuário</label><input maxLength={50} value={f.login} onChange={set('login')} /></div>
        <div><label>Senha (mín. 6)</label><input type="password" maxLength={72} value={f.senha} onChange={set('senha')} /></div>
        <div><label>Nome completo</label><input maxLength={100} value={f.nome} onChange={set('nome')} /></div>
        <div><label>Profissão</label><input maxLength={60} value={f.profissao} onChange={set('profissao')} /></div>
        <div>
          <label>RG</label>
          <input maxLength={14} value={f.rg} onChange={set('rg', limpaRg)} placeholder="MG1234567" />
          <small className="dica">5 a 14 caracteres (letras, números, ponto e hífen)</small>
        </div>
        <div>
          <label>CPF</label>
          <input inputMode="numeric" maxLength={14} value={maskCpf(f.cpf)} onChange={set('cpf', soDigitos)} placeholder="000.000.000-00" />
          <small className="dica">11 dígitos</small>
        </div>
      </div>
      <label>Endereço</label>
      <input maxLength={150} value={f.endereco} onChange={set('endereco')} />

      <h3>Rendimentos <small className="dica">(máx. 3)</small></h3>
      {rendas.map((r, i) => (
        <div className="grid2" key={i}>
          <div>
            <label>Empregador</label>
            <input maxLength={100} value={r.entidadeEmpregadora} onChange={(e) => setRenda(i, 'entidadeEmpregadora', e.target.value)} />
          </div>
          <div>
            <label>Valor (R$)</label>
            <div className="linha" style={{ flexWrap: 'nowrap' }}>
              <input type="number" min="0" value={r.valor} onChange={(e) => setRenda(i, 'valor', e.target.value)} />
              <button className="perigo" onClick={() => delRenda(i)} title="Remover">✕</button>
            </div>
          </div>
        </div>
      ))}
      {rendas.length < 3 && <button className="leve" onClick={addRenda}>+ Adicionar rendimento</button>}
      <br />
      <button onClick={enviar} disabled={enviando}>{enviando ? 'Cadastrando...' : 'Cadastrar'}</button>
      {erro && <p className="erro">{erro}</p>}
    </div>
  )
}