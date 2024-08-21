import { ArticlePage } from '@src/modules/article/article.page';
import { Mobile } from '@global/decorators/platform.decorator';
import { expect } from '@playwright/test';

@Mobile()
export class ArticleMobilePage extends ArticlePage {
	private onThisPage = this.page.getByText('On this page');
	public override async assertTableOfContentsLinkCount(count: number): Promise<void> {
		await this.onThisPage.click();
		await expect(this.tableOfContentsLink).toHaveCount(count);
	}
}
