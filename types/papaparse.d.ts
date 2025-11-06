declare module "papaparse" {
  interface ParseResult<T> {
    data: T[];
    errors: Array<{ type: string; code: string; message: string; row: number }>;
    meta: unknown;
  }

  interface ParseConfig<T> {
    header?: boolean;
    skipEmptyLines?: boolean;
    complete?: (results: ParseResult<T>) => void;
    error?: (error: Error) => void;
  }

  export default class Papa {
    static parse<T>(file: File, config: ParseConfig<T>): void;
  }
}
