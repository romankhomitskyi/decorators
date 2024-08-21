import { Base } from '@global/decorators/platform.decorator';
import { expect, Page } from '@playwright/test';

@Base()
export class NavbarComponent {
	constructor(
		protected page: Page,
		protected closeNavigation = page.locator('[aria-label="Close navigation bar"]'),
		private title = page.locator('.navbar__title'),
		private colorMode = page.locator('.colorModeToggle_DEke button'),
		private search = page.locator('[aria-label="Search"]')
	) {}

	public async assertTitle(): Promise<void> {
		await expect(this.title.first()).toHaveText('Playwright');
	}

	public async clickSearch(): Promise<void> {
		await this.search.click();
	}

	public async clickColorMode(): Promise<void> {
		await this.colorMode.click();
	}
	public async clickCloseNavigation(): Promise<void> {}

	public async openNavigation(): Promise<void> {}

	public async selectNavItem(_item: string): Promise<void> {}
}
