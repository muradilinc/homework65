export interface Page {
  title: string;
  content: string;
  pageName: string;
}

export interface PageContent {
  [key: string]: Page;
}

export interface PageApi {
  page: string;
  contentPage: PageContent;
}

export interface PageMutation {
  id: string;
  titlePage: string;
  selectPage: string;
}