import './AdvancedFilters.css'

function AdvancedFilters({ filters, onFilterChange, types, weaknesses, abilities }) {
  return (
    <div className="advanced-filters" data-testid="advanced-filters">
      <div className="filters-grid">
        {/* Filtre par Type */}
        <div className="filter-group">
          <label htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            <option value="">Tous les types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Filtre par Faiblesse */}
        <div className="filter-group">
          <label htmlFor="weakness-filter">Faiblesse</label>
          <select
            id="weakness-filter"
            value={filters.weakness}
            onChange={(e) => onFilterChange('weakness', e.target.value)}
          >
            <option value="">Toutes les faiblesses</option>
            {weaknesses.map(weakness => (
              <option key={weakness} value={weakness}>{weakness}</option>
            ))}
          </select>
        </div>

        {/* Filtre par Talent */}
        <div className="filter-group">
          <label htmlFor="ability-filter">Talent</label>
          <select
            id="ability-filter"
            value={filters.ability}
            onChange={(e) => onFilterChange('ability', e.target.value)}
          >
            <option value="">Tous les talents</option>
            {abilities.map(ability => (
              <option key={ability} value={ability}>{ability}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtres de taille */}
      <div className="filters-row">
        <div className="filter-group range-group">
          <label>Taille (m)</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              step="0.1"
              min="0"
              value={filters.minHeight}
              onChange={(e) => onFilterChange('minHeight', e.target.value)}
            />
            <span className="range-separator">à</span>
            <input
              type="number"
              placeholder="Max"
              step="0.1"
              min="0"
              value={filters.maxHeight}
              onChange={(e) => onFilterChange('maxHeight', e.target.value)}
              data-testid="max-height-filter"
            />
          </div>
        </div>

        <div className="filter-group range-group">
          <label>Poids (kg)</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              step="0.1"
              min="0"
              value={filters.minWeight}
              onChange={(e) => onFilterChange('minWeight', e.target.value)}
            />
            <span className="range-separator">à</span>
            <input
              type="number"
              placeholder="Max"
              step="0.1"
              min="0"
              value={filters.maxWeight}
              onChange={(e) => onFilterChange('maxWeight', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFilters


