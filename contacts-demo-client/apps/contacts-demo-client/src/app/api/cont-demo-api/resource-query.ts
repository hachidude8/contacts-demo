export type QueryValues = boolean | string | number | boolean[] | string[] | number[];

export interface ResourceQuery {
  [key: string]: QueryValues;
  page: number;
  sort: string | string[];
}
