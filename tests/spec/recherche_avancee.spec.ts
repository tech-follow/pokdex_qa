import { test, expect } from '@playwright/test';
import { PokedexPage } from '../pom/PokedexPage';

const API_URL = "http://localhost:3001";
const UI_URL = "http://localhost:3000";

/*
 * Tests de non-régression sur la recherche avancée (Type & Faiblesse).
 * Les assertions UI sont basées sur les résultats de l’API afin de détecter toute incohérence entre le backend et le frontend.
 * Pour des questions de robustesse et de maintenance, le choix a été fait d'appliquer des assertions sur le count sur la plupart des tests étant donné la probabilité très faible d'un mauvais contenu sans impact sur le count.
 * Concernant le test le plus critique "Filtrage par type + faiblesse - Happy path", les assertions ont été renforcées en comparant le contenu exact UI/API.
 */


test.describe("TNR - Recherche avancée - Type et faiblesse", () => {
    
    let pokedex: PokedexPage; 

    test.beforeEach(async ({page}) => {

        await page.goto(`${UI_URL}`);
        pokedex = new PokedexPage(page); 
        await pokedex.toggleAdvanced.click();
    });

    test("Liste déroulante complète - Type", async ({ page, request }) => {

        //Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/types`)
        const response = await rawResponse.json();

        //Assertion
        await expect(pokedex.typeOptions).toHaveCount(response.length + 1)  

    });

    test("Filtrage par type simple", async ({ page, request }) => {

        //Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/pokemon?type=Acier`);
        const response = await rawResponse.json();

        //Action
        await pokedex.selectType("Acier");

        //Assertion
        await expect(pokedex.pokemonCard).toHaveCount(response.count);
    });

    test("Liste déroulante complète - Faiblesse", async ({ page, request }) => {

        //Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/weaknesses`);
        const response = await rawResponse.json();

        //Assertion
        await expect(pokedex.weaknessOptions).toHaveCount(response.length + 1);

    });

    test("Filtrage par faiblesse simple", async ({ page, request }) => {

        //Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/pokemon?weakness=Acier`);
        const response = await rawResponse.json();
        
        //Action
        await pokedex.selectWeakness("Acier");

        //Assertion
        await expect(pokedex.pokemonCard).toHaveCount(response.count);
    });

    test("Filtrage par type + faiblesse - Happy path", async ({ page, request }) => {

        //Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/pokemon?type=Vol&weakness=Roche`);
        const response = await rawResponse.json();
        
        //Action
        await pokedex.selectType("Vol");
        await pokedex.selectWeakness("Roche");

        //Assertion principale
        await expect(pokedex.pokemonCard).toHaveCount(response.count);

        //Assertion complémentaire de contenu
        const contentApi = await response.results.map((i: any) => i.number)

        const rawContentUi = await pokedex.pokemonCard.allTextContents();
        const contentUi = rawContentUi.map( i => Number(i.match(/\d+/)?.[0]));

        await expect(contentUi).toEqual(contentApi)
    });

    test("Filtrage par type + faiblesse - Negative path", async ({ page, request }) => {

        // Récupération des données API
        const rawResponse = await request.get(`${API_URL}/api/pokemon?type=Eau&weakness=Feu`);
        const response = await rawResponse.json();
        
        //Action
        await pokedex.selectType("Eau");
        await pokedex.selectWeakness("Feu");

        //Assertion
        await expect(pokedex.pokemonCard).toHaveCount(response.count);
        await expect(pokedex.noResults).toBeVisible();
    });

    test("Reset des filtres", async ({ page, request }) => {

        // Récupération des données API avec le double filtre type : Feu et faiblesse : Eau
        const rawResponseFilters = await request.get(`${API_URL}/api/pokemon?type=Feu&weakness=Eau`);
        const responseFilters = await rawResponseFilters.json();

        //Récupération des données API sans aucun filtre
        const rawResponseNoFilters = await request.get(`${API_URL}/api/pokemon`);
        const responseNoFilters = await rawResponseNoFilters.json();
        
        //Assertion intermédiaire - Sanity Check
        await pokedex.selectType("Feu");
        await pokedex.selectWeakness("Eau");
        await expect(pokedex.pokemonCard).toHaveCount(responseFilters.count);

        //Assertion finale
        await pokedex.clearFilters();
        await expect(pokedex.pokemonCard).toHaveCount(responseNoFilters.count);
        
    });

    
});