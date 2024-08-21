import { Base } from '@global/decorators/platform.decorator';
import { expect, Page } from '@playwright/test';
import { BasePage } from '@src/modules/shared/modules/base/base.page';
import { NavbarComponent } from '@src/modules/shared/components/navbar';

@Base()
export class ArticlePage extends BasePage {
	constructor(
		page: Page,
		public navbar = new NavbarComponent(page),
		protected tableOfContentsLink = page.locator('.table-of-contents__link'),
		private header = page.locator('header')
	) {
		super(page);
	}

	public async assertHeader(text: string): Promise<void> {
		await expect(this.header).toHaveText(text);
	}

	public async assertTableOfContentsLinkCount(count: number): Promise<void> {
		await expect(this.tableOfContentsLink).toHaveCount(count);
	}
}
