// tests/ui/pokemon.helpers.ts
import { Page, expect } from '@playwright/test';
import { pokemonSearchPage } from './pokemon.ui.selectors.ts';

//Ouvrir la recherche avancée
export async function openAdvancedSearch(page: Page) {
  await page.waitForSelector(pokemonSearchPage.advancedSearchButton);
  await page.locator(pokemonSearchPage.advancedSearchButton).click();
}

//Sélectionner le type et/ou la faiblesse
export async function selectFilters(page: Page, type?: string, weakness?: string) {
  if (type) await page.selectOption(pokemonSearchPage.typeFilter, type);
  if (weakness) await page.selectOption(pokemonSearchPage.weaknessFilter, weakness);
}

//Vérifier le nombre de pokémons affichés
export async function expectPokemonCount(page: Page, expectedCount: number) {
  await expect(page.locator(pokemonSearchPage.pokemonCard))
    .toHaveCount(expectedCount, { timeout: 5000 });
}

//Vérifier le message "0 Pokémon trouvé"
export async function expectEmptyMessage(page: Page, message: string) {
  await expect(page.locator(pokemonSearchPage.emptyMessage))
    .toHaveText(message, { timeout: 5000 });
}
