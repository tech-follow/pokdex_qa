import { Locator, Page } from '@playwright/test';

export class PokedexPage {

    page: Page;
    toggleAdvanced: Locator;
    typeFilter: Locator;
    typeOptions: Locator;
    pokemonCard: Locator;
    weaknessFilter: Locator;
    weaknessOptions: Locator;
    noResults: Locator;
    resetFilters: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toggleAdvanced = page.locator("button[data-testid='toggle-advanced-search']");
        this.typeFilter = page.locator("select#type-filter");
        this.typeOptions = page.locator("select#type-filter option");
        this.pokemonCard = page.locator("div.pokemon-card");
        this.weaknessFilter = page.locator("select#weakness-filter");
        this.weaknessOptions = page.locator("select#weakness-filter option");
        this.noResults = page.locator("div[data-testid='no-results']");
        this.resetFilters = page.locator("button[data-testid='clear-filters']");
    }

    public async selectType(type: string) {
        await this.typeFilter.selectOption(type)
    };

    public async selectWeakness(type: string) {
        await this.weaknessFilter.selectOption(type)
    };

    public async clearFilters() {
        await this.resetFilters.click()
    };
}