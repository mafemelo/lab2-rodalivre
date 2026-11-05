import { useEffect, useState } from 'react'

const cache = {}

export default function CarImage({ busca, className = '' }) {
  const [src, setSrc] = useState(cache[busca] ?? null)
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    if (cache[busca]) return
    const titulo = encodeURIComponent(busca.replace(/ /g, '_'))
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${titulo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const url = d.thumbnail?.source
        if (url) { cache[busca] = url; setSrc(url) } else setFalhou(true)
      })
      .catch(() => setFalhou(true))
  }, [busca])

  if (!src) {
    return (
      <div className={`car-ph ${className}`}>
        {falhou ? <span className="car-emoji">🚗</span> : <span className="skeleton" />}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={busca}
      loading="lazy"
      className={`car-img ${className}`}
      onError={() => { setSrc(null); setFalhou(true) }}
    />
  )
}