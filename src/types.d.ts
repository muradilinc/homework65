export interface Page {
  title: string;
  content: string;
}

export interface PageApi {
  page: string;
  contentPage: Page;
}