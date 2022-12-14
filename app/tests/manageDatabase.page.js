import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class ManageDatabase {
  constructor() {
    this.pageId = `#${PAGE_IDS.MANAGE_DATABASE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const manageDatabase = new ManageDatabase();
