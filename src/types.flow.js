/* @flow */

export interface Type {
    json: {
        key: string,
        alias: string,
        required: boolean,
        defaultValue: any
    };
    deserialize(value: any): any;
    alias(alias: string): Type;
    required(required: boolean): Type;
    defaultValue(value: any): Type;
    set(key: string, value: any): Type;
    get(key: string): any;
}

export type Tree = {
    [key: string]: Type[] | Tree
};

export type Columns = (Type | null)[];
export type Cell = any;
export type Row = Cell[];
export type Rows = Row[];

export type Parser = {
    contentType: string,
    parse: (file: File) => Promise<Rows>
};
