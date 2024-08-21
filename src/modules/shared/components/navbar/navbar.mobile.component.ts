import { Mobile } from '@global/decorators/platform.decorator';
import { NavbarComponent } from '@src/modules/shared/components/navbar/navbar.component';

@Mobile()
export class NavbarMobileComponent extends NavbarComponent {
	private navToggle = this.page.locator('[aria-label="Toggle navigation bar"]');
	public override async selectNavItem(item: string): Promise<void> {
		await this.openNavigation();
		await this.page.getByRole('link', { name: item }).click();
	}

	public override async openNavigation(): Promise<void> {
		await this.navToggle.click();
	}

	public override async clickCloseNavigation(): Promise<void> {
		await this.closeNavigation.click();
	}
}
