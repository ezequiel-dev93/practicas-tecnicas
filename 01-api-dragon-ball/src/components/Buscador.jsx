import './App.css'

export function Buscador({search, setSearch}) {
    return (
        <input type="text"
            placeholder="Busca tu personaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="buscador"
        />
    )
}