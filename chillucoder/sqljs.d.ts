// sqljs.d.ts
declare module 'sql.js' {
  export interface Database {
    exec(sql: string, params?: any[]): { columns: string[]; values: any[][] };
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface InitSqlJsStatic {
    (config?: { locateFile?: (file: string) => string }): Promise<{
      Database: new (data?: Uint8Array) => Database;
    }>;
  }

  const initSqlJs: InitSqlJsStatic;
  export default initSqlJs;
}