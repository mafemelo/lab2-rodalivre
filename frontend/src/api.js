const BASE = 'http://localhost:8080/api'

export const auth = {
  get: () => sessionStorage.getItem('rl_auth'),
  set: (login, senha) => sessionStorage.setItem('rl_auth', btoa(`${login}:${senha}`)),
  clear: () => sessionStorage.removeItem('rl_auth'),
}

async function req(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (auth.get()) headers.Authorization = `Basic ${auth.get()}`
  const res = await fetch(`${BASE}${path}`, { ...options, headers, cache: 'no-store' })
  if (!res.ok) {
    let msg = `Erro ${res.status}`
    try {
      const body = await res.json()
      msg = body.detail || body.message || msg
    } catch { /* sem corpo */ }
    if (res.status === 401) msg = 'Login ou senha inválidos'
    throw new Error(msg)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  login: async (login, senha) => {
    auth.set(login, senha)
    try {
      return await req('/auth/me')
    } catch (e) {
      auth.clear()
      throw e
    }
  },
  cadastrar: (dados) => req('/auth/register', { method: 'POST', body: JSON.stringify(dados) }),
  meusDados: () => req('/clientes/me'),
  atualizarDados: (dados) => req('/clientes/me', { method: 'PUT', body: JSON.stringify(dados) }),
  automoveis: () => req('/automoveis'),
  pedidos: () => req('/pedidos'),
  criarPedido: (automovelId) => req('/pedidos', { method: 'POST', body: JSON.stringify({ automovelId }) }),
  cancelarPedido: (id) => req(`/pedidos/${id}/cancelar`, { method: 'PUT' }),
}