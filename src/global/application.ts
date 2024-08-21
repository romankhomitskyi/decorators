import { Page } from '@playwright/test';
import { DashboardPage } from '@src/modules/dashboard/dashboard.page';
import { ArticlePage } from '@src/modules/article';

export class Application {
	public dashboardPage = new DashboardPage(this.page);
	public article = new ArticlePage(this.page);

	constructor(private page: Page) {}
}
