export interface Page {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

export interface PageRequest {
  page: number,
  size?: number;
}
