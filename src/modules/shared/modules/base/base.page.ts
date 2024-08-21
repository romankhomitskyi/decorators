import { Page } from '@playwright/test';
import { FooterComponent } from '@src/modules/shared/components/footer/footer.component';
import { SearchComponent } from '@src/modules/shared/components/search';

export class BasePage {
	public footer = new FooterComponent(this.page);
	public search = new SearchComponent(this.page);
	constructor(protected page: Page) {}

	public async scrollToBottom(): Promise<void> {
		await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	}
}
