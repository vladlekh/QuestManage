export interface IParserOptions {
    delimiter: string;
    encoding?: 'ascii'|'utf8'|'utf16le'|'ucs2'|'base64'|'binary'|'hex';
    includeDelimiter?: boolean;
    path: string;
} 