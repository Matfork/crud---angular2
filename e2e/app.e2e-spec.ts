import { Client3Page } from './app.po';

describe('client3 App', function() {
  let page: Client3Page;

  beforeEach(() => {
    page = new Client3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
