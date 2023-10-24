declare function exit(status: any): void;
declare function quit(status: any): void;
declare function print(...arg: any[]): void;
declare function read(file: string): string;
declare function readFully(file: string): string;
declare function readbuffer(file: string): ArrayBuffer;
declare function readLine(prompt?: string): string;
declare function readline(prompt?: string): string;

declare const Graal: {
  versionJS: string;
  versionGraalVM: string;
  isGraalRuntime: boolean;
};

declare const Java: {
  type<T>(className: string): T;
  extend(javaType: any): any; // TODO types
  from<T>(javaData: any): T;
  to<T>(jsData: any, toType?: T): T;
  isJavaObject<T>(obj: T): boolean;
  isType<T>(obj: T): boolean;
  typeName<T>(obj: T): boolean | undefined;
};

declare const Polyglot: {
  export(key: string, value: any): void;
  import<T>(key: string): T | null;
  eval<T>(languageId: string, sourceCode: string): T;
  evalFile<T>(languageId: string, sourceFileName: string): T;
};

declare function printErr(...arg: any[]): void;
declare function loadWithNewGlobal(source: string, arguments: any[]): void;
