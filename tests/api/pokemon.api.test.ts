import { test } from '@playwright/test';

import {
  getPokemons,
  expectedNbPokemons,
  expectedPokemonName,
  expectPokemonHaveType,
  expectPokemonHaveWeakness
} from './pokemon.api.utils';

import { TYPES, WEAKNESSES } from './pokemon.api.data';

test.describe('API – TNR - Recherche avancée de pokémons par Type & Faiblesse', () => {

  test('Recherche de pokémons par Type seul : Combat', async ({ request }) => {
    const expectedNames = ['Lucario'];

    const pokemons = await getPokemons(request, { type: 'Combat' });

    //Vérifier le nombre de pokémons trouvés avec la faiblesse "Combat" (ici = 1)
    expectedNbPokemons(pokemons, expectedNames.length);

    //vérifier le nom exact des pokémons trouvés avec la faiblesse "Combat"
    expectedPokemonName(pokemons, expectedNames);

    //vérifier la présence de la faiblesse "Combat"
    expectPokemonHaveType(pokemons, 'Combat');
  });

  test('Recherche de pokémons par Faiblesse seule : Poison', async ({ request }) => {
    const expectedNames = ['Mélofée', 'Rondoudou', 'Togepi', 'Gardevoir', 'Nymphali'];

    const pokemons = await getPokemons(request, { weakness: 'Poison' });

    //Vérifier le nombre de pokémons trouvés avec la faiblesse "Poison" (ici = 5)
    expectedNbPokemons(pokemons, expectedNames.length);

    //vérifier le nom exact des pokémons trouvés avec la faiblesse "Poison"
    expectedPokemonName(pokemons, expectedNames);

    //vérifier la présence de la faiblesse "Poison"
    expectPokemonHaveWeakness(pokemons, 'Poison');
  });

  test('Recherche de pokémons par Type ET Faiblesse : ', async ({ request }) => {
    const expectedNames = ['Minidraco', 'Draco', 'Dracolosse', 'Rayquaza', 'Lanssorien'];

    const pokemons = await getPokemons(request, {
      type: 'Dragon',
      weakness: 'Glace'
    });

    //Vérifier le nombre de pokémons trouvés avec le type "Dragon" ET la faiblesse "Glace" (ici = 5)
    expectedNbPokemons(pokemons, expectedNames.length);

    //vérifier le nom exact des pokémons trouvés
    expectedPokemonName(pokemons, expectedNames);

    //vérifier la présence du type "Dragon" et de la faiblesse "Glace"
    expectPokemonHaveType(pokemons, 'Dragon');
    expectPokemonHaveWeakness(pokemons, 'Glace');
  });

  test('Recherche avancée de pokémons par Type ET faiblesse identiques (ex : Vol ayant pour faiblesse Vol): ', async ({ request }) => {
    const expectedNames = ['Papilusion'];

    const pokemons = await getPokemons(request, {
      type: 'Vol',
      weakness: 'Vol'
    });

    //Vérifier le nombre de pokémons trouvés (ici = 1)
    expectedNbPokemons(pokemons, expectedNames.length);

    //vérifier le nom exact des pokémons trouvés
    expectedPokemonName(pokemons, expectedNames);

    //vérifier la présence du type "Vol" et de la faiblesse "Vol"
    expectPokemonHaveType(pokemons, 'Vol');
    expectPokemonHaveWeakness(pokemons, 'Vol');
  });

  test('Recherche de pokémons par Type et Faiblesse incompatibles', async ({ request }) => {

    const pokemons = await getPokemons(request, {
      type: 'Spectre',
      weakness: 'Électrik'
    });

    //Vérifier le nombre de pokémons trouvés (ici = 0)
    expectedNbPokemons(pokemons, 0);
  });

  test('Recherche de pokémons par Type et Faiblesse invalides', async ({ request }) => {

    const pokemons = await getPokemons(request, {
      type: 'Soleil',
      weakness: 'Lumière'
    });

    //Vérifier le nombre de pokémons trouvés (ici = 0)
    expectedNbPokemons(pokemons, 0);
  });

  //Vérifier que chaque type renvoie le bon type
  TYPES.forEach(type => {
    test(`Filtrer les Pokémons type un par un : ${type}`, async ({ request }) => {
      const pokemons = await getPokemons(request, { type });
      expectPokemonHaveType(pokemons, type);
    });
  });

  //Vérifier que chaque faiblesse renvoie la bonne faiblesse
  WEAKNESSES.forEach(weakness => {
    test(`Filtrer les Pokémons par faiblesse une par une : ${weakness}`, async ({ request }) => {
      const pokemons = await getPokemons(request, { weakness });
      expectPokemonHaveWeakness(pokemons, weakness);
    });
  });

});
