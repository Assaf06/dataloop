import { Locator, Page } from '@playwright/test';

export class AnnotationStudio {
    readonly page: Page;
    readonly checkbox: Locator;
    readonly delete: Locator;
    readonly yes: Locator;
    readonly canvas: Locator;
    readonly boxAnnotation: Locator;
    readonly save: Locator;
    readonly itemTab: Locator;
    readonly id: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox = page.getByRole('checkbox').first();
        this.delete = page.locator('.annotations-actions > div > div:nth-child(4) > .q-btn');
        this.yes = page.getByRole('button', { name: 'yes' });
        this.canvas = page.locator('#box_container canvas').nth(1);
        this.boxAnnotation = page.locator('div:nth-child(4) > .dl-btn > .q-btn').first();
        this.save = page.locator('.save-btn > .q-btn');
        this.itemTab = page.getByRole('tab', { name: 'ITEM' }).getByText('ITEM');
        this.id = page.locator('.item-info > div > div:nth-child(2)').first();

    }

    async deleteCurrentAnnotations() {
        await new Promise(r => setTimeout(r, 3000));
        await this.checkbox.check();
        await this.delete.click();
        await this.yes.click();
    }

    async canvasBoxDrawByPixels() {
        var width = await this.canvas.getAttribute('width');
        var height = await this.canvas.getAttribute('height');

        let quarterWidth: number = Number(width) * 0.25
        let quarterHeight: number = Number(height) * 0.25
        let heightBegin: number = Number(height) - quarterHeight;
        let heightEnd: number = quarterHeight;
        let widthEnd: number = Number(width) - quarterWidth;

        await this.boxAnnotation.click();

        //draw box
        await this.canvas.click({
            position: {
                x: quarterWidth,
                y: heightBegin
            }
        });
        await this.canvas.click({
            position: {
                x: widthEnd,
                y: heightEnd
            }
        });

        await this.save.click();
    }

    async getItemId() {
        await this.itemTab.click();
        return await this.id.textContent();
    }
}

