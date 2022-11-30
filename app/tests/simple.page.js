import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

/** Create an instance of a SimplePage when all you need to do is verify that the page was displayed. */
class SimplePage {
  constructor(id) {
    this.pageId = `#${id}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const billDetailsPage = new SimplePage(PAGE_IDS.BILL_DETAILS);
export const listBillsPage = new SimplePage(PAGE_IDS.LIST_BILLS);
export const listSavedBillsPage = new SimplePage(PAGE_IDS.SAVED_BILLS);
export const assignedBillsPage = new SimplePage(PAGE_IDS.ASSIGNED_BILLS);
export const requestAccountPage = new SimplePage(PAGE_IDS.REQUESTED_ACCOUNTS_FORM);
export const listTestimonyPage = new SimplePage(PAGE_IDS.AWAITING_REVIEWS);
export const draftTestimonyPage = new SimplePage(PAGE_IDS.DRAFT_TESTIMONY);
export const manageUserAccounts = new SimplePage(PAGE_IDS.MANAGE_ACCOUNTS);
export const manageDatabasePage = new SimplePage(PAGE_IDS.MANAGE_DATABASE);
export const createAccount = new SimplePage(PAGE_IDS.SIGN_UP);
export const requestedAccounts = new SimplePage(PAGE_IDS.REQUESTED_ACCOUNTS);
export const signOutPage = new SimplePage(PAGE_IDS.SIGN_OUT);
