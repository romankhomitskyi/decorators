import { Mobile } from '@global/decorators/platform-v2.decorator';
import { SearchComponent } from '@src/modules/shared/components/search/search.component';

@Mobile()
export class SearchMobileComponent extends SearchComponent {
	public cancel = this.page.locator('[aria-label="Cancel"]');
	public override async close(): Promise<void> {
		await this.cancel.click();
	}
}
