import { Locator, Page } from '@playwright/test';

export class Dataset {
    readonly page: Page;
    readonly goToProjectButton: Locator;
    readonly browseButton: Locator;
    readonly thumbnail: Locator;


    constructor(page: Page) {
        this.page = page;
        this.goToProjectButton = page.getByRole('button', { name: 'Go to project' });
        this.browseButton = page.getByRole('button', { name: 'browse' });
        this.thumbnail = page.locator('.thumbnail');

    }

    async navigateTo() {
        await this.goToProjectButton.click();
        await this.browseButton.click();
    }

    async openItemInAnnotationStudio() {
        await new Promise(r => setTimeout(r, 3000));
        await this.thumbnail.dblclick();
    }

}

