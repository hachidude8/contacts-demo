export interface SubjectSource {
  readonly id: number;
  readonly username: string;
  readonly exp: number; // Expiration time in seconds sin unix epoch
}

export class Subject implements SubjectSource {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly exp: number,
  ) {
  }

  static unauthenticated(): Subject {
    return new Subject(0, '', Date.now());
  }

  static fromSource(source: SubjectSource) {
    const exp = source.exp * 1000; // Change to milliseconds
    return new Subject(source.id, source.username, exp);
  }

  get isAuthenticated(): boolean {
    return this.id > 0 && Date.now() < this.exp;
  }

}
