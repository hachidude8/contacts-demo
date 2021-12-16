import { Page } from './page';


export interface Response<T> {
  _embedded: Record<string, T>;
  _link: EmbeddedLink;
  page: Page;
}

export interface EmbeddedLink {
  [key: string]: {
    href: string
  };

  self: {
    href: string;
  };
}
