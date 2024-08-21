import { Desktop } from '@global/decorators/platform.decorator';
import { NavbarComponent } from '@src/modules/shared/components/navbar/navbar.component';

@Desktop()
export class NavbarDesktopComponent extends NavbarComponent {
	public override async selectNavItem(item: string): Promise<void> {
		await this.page.getByText(item).click();
	}
}
