import './PokemonCard.css'

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

function PokemonCard({ pokemon, onClick, style }) {
  const primaryType = pokemon.types[0]
  const primaryColor = typeColors[primaryType] || 'var(--accent-blue)'

  return (
    <div 
      className="pokemon-card" 
      onClick={onClick}
      style={{ 
        '--card-accent': primaryColor,
        ...style 
      }}
      data-testid={`pokemon-card-${pokemon.number}`}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        <span className="pokemon-number">#{String(pokemon.number).padStart(3, '0')}</span>
        
        <div className="pokemon-image-container">
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-image"
            loading="lazy"
          />
        </div>
        
        <h3 className="pokemon-name">{pokemon.name}</h3>
        
        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span 
              key={type} 
              className="type-badge"
              style={{ background: typeColors[type] || 'var(--border-color)' }}
              data-testid={`type-badge-${type}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard


