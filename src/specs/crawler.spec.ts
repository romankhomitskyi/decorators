import { test } from '@global/test';
import { onlyOn, skipOn } from '@src/support/utils/utils';

test.describe('Crawler', () => {
	test('Navigation', async ({ app, page, isMobile }) => {
		await page.goto('/');
		await app.dashboardPage.navbar.assertTitle();
		await app.dashboardPage.navbar.selectNavItem('Docs');
		await app.article.assertHeader('Installation');
		await app.article.assertTableOfContentsLinkCount(9);
		await app.dashboardPage.navbar.openNavigation();
		await app.dashboardPage.navbar.clickCloseNavigation();

		await onlyOn(isMobile, async () => {
			await app.article.scrollToBottom();
			await app.article.footer.assertCopyright();
		});

		await skipOn(isMobile, async () => {
			await app.article.navbar.clickColorMode();
		});
		await app.article.navbar.clickSearch();
		await app.article.search.fill('api');
		await app.article.search.close();
		await app.article.search.assertModalNotExist();
	});
});
