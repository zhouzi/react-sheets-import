/* @flow */
import type { Columns, Row, Rows } from './types.flow';

/*
 * Map a list of columns to a specific row.
 * Returns null if a required property failed to deserialize.
 */
function mapColumnsToRow(columns: Columns, row: Row): ?Object {
    const acc = {};

    for (let index = 0; index < columns.length; index += 1) {
        const column = columns[index];

        if (column == null) {
            // eslint-disable-next-line no-continue
            continue;
        }

        const value = column.deserialize(row[index]);

        if (value == null && column.get('required')) {
            // If the rows is missing a required column,
            // do not go further and simply discard the row
            return null;
        }

        setIn(acc, column.get('key'), value);
    }

    return acc;
}

/*
 * Map a list of columns to rows.
 * Filter out rows without all the required props.
 */
function mapColumnsToRows(columns: Columns, rows: Rows): Object[] {
    return rows.reduce((acc, row) => {
        const value = mapColumnsToRow(columns, row);
        return value ? acc.concat(value) : acc;
    }, []);
}

/*
 * Sets an Object's property value from a path.
 * e.g setIn(obj, 'foo.bar.baz', 'quz');
 *
 * This is not a bullet proof implementation but good enough for this library.
 */
function setIn(obj: Object, path: string, value: any): Object {
    path.split('.').reduce((acc, key, index, keys) => {
        const isLastKey = index === keys.length - 1;

        if (isLastKey) {
            return Object.assign(acc, {
                [key]: value
            });
        }

        return Object.assign(acc, {
            [key]: acc[key] || {}
        })[key];
    }, obj);
    return obj;
}

export default mapColumnsToRows;
