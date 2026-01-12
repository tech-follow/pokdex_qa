import { useEffect } from 'react'
import './PokemonModal.css'

const typeColors = {
  'Normal': 'var(--type-normal)',
  'Feu': 'var(--type-feu)',
  'Eau': 'var(--type-eau)',
  'Électrik': 'var(--type-electrik)',
  'Plante': 'var(--type-plante)',
  'Glace': 'var(--type-glace)',
  'Combat': 'var(--type-combat)',
  'Poison': 'var(--type-poison)',
  'Sol': 'var(--type-sol)',
  'Vol': 'var(--type-vol)',
  'Psy': 'var(--type-psy)',
  'Insecte': 'var(--type-insecte)',
  'Roche': 'var(--type-roche)',
  'Spectre': 'var(--type-spectre)',
  'Dragon': 'var(--type-dragon)',
  'Ténèbres': 'var(--type-tenebres)',
  'Acier': 'var(--type-acier)',
  'Fée': 'var(--type-fee)',
}

function PokemonModal({ pokemon, onClose }) {
  const primaryType = pokemon.types[0]
  const primaryColor = typeColors[primaryType] || 'var(--accent-blue)'

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      data-testid="pokemon-modal"
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-accent': primaryColor }}
      >
        <button 
          className="modal-close"
          onClick={onClose}
          data-testid="modal-close"
        >
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <div className="modal-image-bg"></div>
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="modal-image"
            />
          </div>
          
          <div className="modal-title">
            <span className="modal-number">#{String(pokemon.number).padStart(3, '0')}</span>
            <h2 className="modal-name">{pokemon.name}</h2>
            <p className="modal-name-en">{pokemon.nameEn}</p>
            
            <div className="modal-types">
              {pokemon.types.map(type => (
                <span 
                  key={type} 
                  className="modal-type-badge"
                  style={{ background: typeColors[type] || 'var(--border-color)' }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-description">{pokemon.description}</p>

          <div className="modal-stats">
            <div className="stat-item">
              <span className="stat-label">Taille</span>
              <span className="stat-value">{pokemon.height} m</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Poids</span>
              <span className="stat-value">{pokemon.weight} kg</span>
            </div>
          </div>

          <div className="modal-section">
            <h3>Talents</h3>
            <div className="modal-tags">
              {pokemon.abilities.map(ability => (
                <span key={ability} className="modal-tag ability-tag">
                  {ability}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Faiblesses</h3>
            <div className="modal-tags">
              {pokemon.weaknesses.map(weakness => (
                <span 
                  key={weakness} 
                  className="modal-tag weakness-tag"
                  style={{ background: typeColors[weakness] || 'var(--border-color)' }}
                >
                  {weakness}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonModal


