/* @flow */
import type { Columns, Row, Rows } from './index.js.flow';

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
            return null;
        }

        setIn(acc, column.get('key'), value);
    }

    return acc;
}

function mapColumnsToRows(columns: Columns, rows: Rows) {
    return rows.reduce((acc, row) => {
        const value = mapColumnsToRow(columns, row);
        return value ? acc.concat(value) : acc;
    }, []);
}

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
