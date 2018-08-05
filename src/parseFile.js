/* @flow */
import type { Parser, Rows } from './index.js.flow';

function parseFile(file: File, parsers: Parser[]): Promise<Rows> {
    const parser = parsers.find(({ contentType }) => file.type === contentType);

    if (parser == null) {
        throw new Error(`No parser for file with contentType ${file.type}`);
    }

    return parser.parse(file);
}

export default parseFile;
