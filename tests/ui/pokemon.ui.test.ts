import { test, expect } from '@playwright/test';
import { pokemonSearchPage } from './pokemon.ui.selectors.ts';
import {
  openAdvancedSearch,
  selectFilters,
  expectPokemonCount,
  expectEmptyMessage
} from './pokemon.ui.utils.ts';

test.describe('UI – Recherche avancée de Pokémons', () => {

  //Ouvrir l'url "http://localhost:3000" avant chaque test
  test.beforeEach(async ({ page, baseURL }) => {
        console.log(baseURL)

    await page.goto(`${baseURL}/`, { waitUntil: 'load' });
  });

  test('Vérifier la page de recherche avancée', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Vérifier que les filtres Type et Faiblesse sont visibles
    await expect(page.locator(pokemonSearchPage.typeFilter)).toBeVisible();
    await expect(page.locator(pokemonSearchPage.weaknessFilter)).toBeVisible();

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 49);
  });

  test('Recherche avec le filtre Type : "Acier"', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type
    await selectFilters(page, 'Feu');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 4);
  });

  test('Recherche par Faiblesse seule : Roche', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type
    await selectFilters(page, 'Roche');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 3);
  });

  test('Recherche avec le filtre "Type" ET "Faiblesse" : Spectre / Glace', async ({ page }) => {
    //Cliquer sur le bouton Recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type ET la Faiblesse
    await selectFilters(page, 'Spectre', 'Glace');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 1);
  });

  test('Recherche donnant un résultat vide avec Type "Acier" ET "Plante"', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type ET la Faiblesse
    await selectFilters(page, 'Acier', 'Plante');

    //Vérifier le texte affiché "0 Pokémon trouvé"
    await expectEmptyMessage(page, '0 Pokémon trouvé');
  });

  test('Modifier les filtres', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type ET la Faiblesse
    await selectFilters(page, 'Spectre', 'Glace');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 1);

    //Modifier les filtres type ET la Faiblesse
    await selectFilters(page, 'Feu', 'Eau');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 4);
  });

  test('Effacer les filtres', async ({ page }) => {
    //Ouvrir la recherche avancée
    await openAdvancedSearch(page);

    //Sélectionner le type
    await selectFilters(page, 'Eau');

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 8);

    //Cliquer sur "Effacer les filtres"
    await page.locator(pokemonSearchPage.clearFilters).click();

    //Vérifier le nombre de pokémons affichés
    await expectPokemonCount(page, 49);
  });

});
