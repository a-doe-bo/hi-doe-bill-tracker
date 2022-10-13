import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class UserAccounts {
  constructor() {
    this.pageId = `#${PAGE_IDS.MANAGE_ACCOUNTS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const userAccounts = new UserAccounts();
