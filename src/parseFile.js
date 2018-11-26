/* @flow */
import type { Parser, Rows } from './types.flow';

/*
 * Parse a file with the relevant parsers, if available.
 * Throws an error if there are no parsers for the file.
 */
function parseFile(file: File, parsers: Parser[]): Promise<Rows> {
    const parser = parsers.find(({ contentType }) => contentType.includes(file.type));

    if (parser == null) {
        throw new Error(`No parser for file with contentType ${file.type}`);
    }

    return parser.parse(file);
}

export default parseFile;
