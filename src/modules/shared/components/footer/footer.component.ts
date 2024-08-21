import { expect, Page } from '@playwright/test';

export class FooterComponent {
	constructor(
		private page: Page,
		private copyright = page.locator('.footer__copyright')
	) {}

	public async assertCopyright(): Promise<void> {
		await expect(this.copyright).toBeInViewport();
		await expect(this.copyright).toBeVisible();
		await expect(this.copyright).toHaveText('Copyright © 2024 Microsoft');
	}
}
