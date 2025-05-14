import { useEffect ,useState } from 'react'
import { Buscador } from './Buscador';
import './App.css'

const PERSONAJES_URL = "https://dragonball-api.com/api/characters?limit=58";

export function App() {
  const [personajes, setPersonajes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const abortController = new AbortController();

    fetch(PERSONAJES_URL, {signal: abortController.signal} ) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status}`)
        }
        return res.json()
      })
      
      .then(data => setPersonajes(data.items))
      .catch(err => {
        setError(err.massage)
      })
      .finally(() => {
        setLoading(false)
      })
      return () => abortController.abort();
  }, [])

  const personajesFiltrados = personajes.filter(personaje =>
    personaje.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return ( 
    <main>
      <h1>App de Dragon Ball</h1>

      <Buscador search={search} setSearch={setSearch}/>

      {loading && <p>Cargando Personajes...</p>}
      {error && <p className='error'>{error}</p>}

      <section>
        {personajesFiltrados.map(({id, name, ki, maxKi,image, race}) =>
          <article key={id}>
            <picture>
              <img src={image} alt={name} />
            </picture>
           
           <div>
              <h2>{name}</h2>
              <p>Ki: {ki}</p>
              <p>MaxKi: {maxKi}</p>
              <p>Raza: {race}</p>
           </div>
          </article>
        )}
      </section>
    </main>
  )
}
