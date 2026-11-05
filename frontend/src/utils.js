export const soDigitos = (s = '') => s.replace(/\D/g, '')

export function maskCpf(v = '') {
  const d = soDigitos(v).slice(0, 11)
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const limpaRg = (v = '') => v.toUpperCase().replace(/[^0-9A-Z.\-]/g, '').slice(0, 14)

export const moeda = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })