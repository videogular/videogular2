import { Videogular2WebsitePage } from './app.po';

describe('videogular2-website App', () => {
  let page: Videogular2WebsitePage;

  beforeEach(() => {
    page = new Videogular2WebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
