export interface ApiException {
  timestamp: number;
  message: string;
  details?: string[] | Record<string, string>[];
}
