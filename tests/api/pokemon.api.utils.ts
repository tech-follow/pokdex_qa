import { expect, APIRequestContext } from '@playwright/test';

const API_ENDPOINT = '/api/pokemon';

export async function getPokemons(
  request: APIRequestContext,
  params: any
) {
  const response = await request.get(API_ENDPOINT, { params });
  expect(response.status()).toBe(200);

  const body = await response.json();
  return body.results ?? body;
}

export function expectedNbPokemons(pokemons: any[], expected: number) {
  expect(pokemons.length).toBe(expected);
}

export function expectedPokemonName(pokemons: any[], expectedNames: string[]) {
  const actualNames = pokemons.map(pokemon => pokemon.name);
  expect(actualNames.sort()).toEqual(expectedNames.sort());
}

export function expectPokemonHaveType(pokemons: any[], type: string) {
  pokemons.forEach(pokemon => {
    expect(pokemon.types).toContain(type);
  });
}

export function expectPokemonHaveWeakness(pokemons: any[], weakness: string) {
  pokemons.forEach(pokemon => {
    expect(pokemon.weaknesses).toContain(weakness);
  });
}
