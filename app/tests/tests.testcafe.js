import { Selector, t } from 'testcafe';
import {
  signOutPage,
  listBillsPage,
  billDetailsPage,
  listSavedBillsPage,
  // manageDatabasePage,
  manageUserAccounts,
  createAccount,
  requestedAccounts,
} from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoListBillsPage();
  await listBillsPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const viewBill = await Selector(`.${COMPONENT_IDS.VIEW_BILL}`);
  await t.click(viewBill.nth(0));
  await billDetailsPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that saved bills pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSavedBillsPage();
  await listSavedBillsPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListBillsPage();
  await listBillsPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const viewBill = await Selector(`.${COMPONENT_IDS.VIEW_BILL}`);
  await t.click(viewBill().nth(0));
  await billDetailsPage.isDisplayed();
  await navBar.gotoSavedBillsPage();
  await listSavedBillsPage.isDisplayed();

  // Check if all items in "Manage" (admin) drop down menu are displayed.
  // Was unsure which page we were referencing to here yet
  // await navBar.gotoManageDropDown(COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE);
  // await manageDatabasePage.isDisplayed();
  await navBar.gotoManageDropDown(COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_REQUESTED_ACCOUNTS);
  await requestedAccounts.isDisplayed();
  await navBar.gotoManageDropDown(COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_ACCOUNTS);
  await manageUserAccounts.isDisplayed();
  await navBar.gotoManageDropDown(COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_CREATE_ACCOUNT);
  await createAccount.isDisplayed();
});
