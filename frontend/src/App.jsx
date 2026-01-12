import { useState, useEffect, useCallback } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'
import PokemonModal from './components/PokemonModal'
import SearchBar from './components/SearchBar'
import AdvancedFilters from './components/AdvancedFilters'

const API_URL = 'http://localhost:3001'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  
  // Filtres
  const [search, setSearch] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    weakness: '',
    ability: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: ''
  })
  
  // Données pour les selects
  const [types, setTypes] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [abilities, setAbilities] = useState([])

  // Charger les options de filtres
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/types`).then(r => r.json()),
      fetch(`${API_URL}/api/weaknesses`).then(r => r.json()),
      fetch(`${API_URL}/api/abilities`).then(r => r.json())
    ]).then(([typesData, weaknessesData, abilitiesData]) => {
      setTypes(typesData)
      setWeaknesses(weaknessesData)
      setAbilities(abilitiesData)
    }).catch(err => console.error('Erreur chargement filtres:', err))
  }, [])

  // Rechercher les Pokémon
  const fetchPokemon = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filters.type) params.append('type', filters.type)
      if (filters.weakness) params.append('weakness', filters.weakness)
      if (filters.ability) params.append('ability', filters.ability)
      if (filters.minHeight) params.append('minHeight', filters.minHeight)
      if (filters.maxHeight) params.append('maxHeight', filters.maxHeight)
      if (filters.minWeight) params.append('minWeight', filters.minWeight)
      if (filters.maxWeight) params.append('maxWeight', filters.maxWeight)
      
      const response = await fetch(`${API_URL}/api/pokemon?${params}`)
      if (!response.ok) throw new Error('Erreur réseau')
      
      const data = await response.json()
      setPokemon(data.results)
    } catch (err) {
      setError('Impossible de charger les Pokémon. Vérifiez que le serveur est lancé.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [search, filters])

  useEffect(() => {
    const debounce = setTimeout(fetchPokemon, 300)
    return () => clearTimeout(debounce)
  }, [fetchPokemon])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setSearch('')
    setFilters({
      type: '',
      weakness: '',
      ability: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: ''
    })
  }

  const hasActiveFilters = search || Object.values(filters).some(v => v !== '')

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/pokeball.svg" alt="Pokéball" className="logo-icon" />
            <h1>Pokédex</h1>
            <span className="badge">Test QA</span>
          </div>
          <p className="subtitle">Base de données Pokémon du Professeur Chen</p>
        </div>
      </header>

      <main className="main">
        <section className="search-section">
          <SearchBar 
            value={search}
            onChange={setSearch}
            placeholder="Rechercher par nom ou numéro..."
          />
          
          <button 
            className={`toggle-advanced ${showAdvanced ? 'active' : ''}`}
            onClick={() => setShowAdvanced(!showAdvanced)}
            data-testid="toggle-advanced-search"
          >
            <span className="icon">⚙️</span>
            Recherche avancée
            <span className={`arrow ${showAdvanced ? 'open' : ''}`}>▼</span>
          </button>
          
          {showAdvanced && (
            <AdvancedFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              types={types}
              weaknesses={weaknesses}
              abilities={abilities}
            />
          )}
          
          {hasActiveFilters && (
            <button 
              className="clear-filters"
              onClick={clearFilters}
              data-testid="clear-filters"
            >
              ✕ Effacer les filtres
            </button>
          )}
        </section>

        <section className="results-section">
          <div className="results-header">
            <h2>
              {loading ? 'Chargement...' : `${pokemon.length} Pokémon trouvé${pokemon.length > 1 ? 's' : ''}`}
            </h2>
          </div>

          {error && (
            <div className="error-message" data-testid="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {!loading && !error && pokemon.length === 0 && (
            <div className="no-results" data-testid="no-results">
              <span className="no-results-icon">🔍</span>
              <p>Aucun Pokémon ne correspond à votre recherche</p>
              <button onClick={clearFilters}>Réinitialiser les filtres</button>
            </div>
          )}

          <div className="pokemon-grid" data-testid="pokemon-grid">
            {pokemon.map((p, index) => (
              <PokemonCard 
                key={p.number}
                pokemon={p}
                onClick={() => setSelectedPokemon(p)}
                style={{ animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      <footer className="footer">
        <p>🎮 Pokédex QA Test - © 2024 Follow</p>
        <p className="footer-note">Application de test pour le recrutement QA Engineer</p>
      </footer>
    </div>
  )
}

export default App

