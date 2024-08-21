import { Page } from '@playwright/test';
import { BasePage } from '@src/modules/shared/modules/base/base.page';
import { NavbarComponent } from '@src/modules/shared/components/navbar';

export class DashboardPage extends BasePage {
	constructor(
		page: Page,
		public navbar = new NavbarComponent(page),
		private getStarted = page.getByText('Get started')
	) {
		super(page);
	}

	public async clickGetStarted(): Promise<void> {
		await this.getStarted.click();
	}
}
