import { Desktop } from '@global/decorators/platform-v2.decorator';
import { expect, Page } from '@playwright/test';

@Desktop()
export class SearchComponent {
	constructor(
		protected page: Page,
		private search = page.locator('[type="search"]'),
		private modal = page.locator('.DocSearch-Modal')
	) {}

	public async fill(text: string): Promise<void> {
		await this.search.fill(text);
	}

	public async close(): Promise<void> {
		await this.page.keyboard.press('Escape');
	}

	public async assertModalNotExist(): Promise<void> {
		await expect(this.modal).not.toBeAttached();
	}
}
