import { Locator, Page } from '@playwright/test';

export class Login {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Sign Up / Login' });
        this.userName = page.getByPlaceholder('yours@example.com');
        this.password = page.getByPlaceholder('your password');
        this.submitButton = page.locator('button[name="submit"]');
    }

    async goto() {
        await this.page.goto('https://console.dataloop.ai/');
    }

    async login() {
        await this.goto();
        await this.loginButton.click();
        await this.userName.click();
        await this.userName.fill('assafelal06@gmail.com');
        await this.password.click();
        await this.password.fill('Danield!997');
        await this.submitButton.click();
    }

}

