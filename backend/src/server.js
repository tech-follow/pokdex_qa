import express from 'express';
import cors from 'cors';
import { pokemon } from './data/pokemon.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Récupérer tous les Pokémon avec filtres optionnels
app.get('/api/pokemon', (req, res) => {
  const { 
    search, 
    type, 
    weakness,
    ability, 
    minHeight, 
    maxHeight,
    minWeight,
    maxWeight
  } = req.query;
  
  let results = [...pokemon];
  
  // Recherche par nom ou numéro
  if (search) {
    const searchLower = search.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.number.toString().includes(search)
    );
  }
  
  // Filtre par type
  if (type) {
    const types = type.split(',').map(t => t.toLowerCase());
    results = results.filter(p => 
      types.some(t => p.types.map(pt => pt.toLowerCase()).includes(t))
    );
  }
  
  // Filtre par faiblesse
  if (weakness) {
    const weaknesses = weakness.split(',').map(w => w.toLowerCase());
    results = results.filter(p => 
      weaknesses.some(w => p.weaknesses.map(pw => pw.toLowerCase()).includes(w))
    );
  }
  
  // Filtre par talent
  if (ability) {
    const abilityLower = ability.toLowerCase();
    results = results.filter(p => 
      p.abilities.some(a => a.toLowerCase().includes(abilityLower))
    );
  }
  
  // Filtre par taille (en mètres)
  if (minHeight) {
    results = results.filter(p => p.height >= parseFloat(minHeight));
  }
  if (maxHeight) {
    results = results.filter(p => p.height <= parseFloat(maxHeight));
  }
  
  // Filtre par poids (en kg)
  if (minWeight) {
    results = results.filter(p => p.weight >= parseFloat(minWeight));
  }
  if (maxWeight) {
    results = results.filter(p => p.weight <= parseFloat(maxWeight));
  }
  
  res.json({
    count: results.length,
    results
  });
});

// Récupérer un Pokémon par son numéro
app.get('/api/pokemon/:id', (req, res) => {
  const { id } = req.params;
  const poke = pokemon.find(p => p.number === parseInt(id));
  
  if (!poke) {
    return res.status(404).json({ error: 'Pokémon non trouvé' });
  }
  
  res.json(poke);
});

// Récupérer la liste des types disponibles
app.get('/api/types', (req, res) => {
  const types = [...new Set(pokemon.flatMap(p => p.types))].sort();
  res.json(types);
});

// Récupérer la liste des talents disponibles
app.get('/api/abilities', (req, res) => {
  const abilities = [...new Set(pokemon.flatMap(p => p.abilities))].sort();
  res.json(abilities);
});

// Récupérer la liste des faiblesses disponibles
app.get('/api/weaknesses', (req, res) => {
  const weaknesses = [...new Set(pokemon.flatMap(p => p.weaknesses))].sort();
  res.json(weaknesses);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Pokédex API running on http://localhost:${PORT}`);
});

