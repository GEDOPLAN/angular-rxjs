import { AngularRxjsPage } from './app.po';

describe('angular-rxjs App', () => {
  let page: AngularRxjsPage;

  beforeEach(() => {
    page = new AngularRxjsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
