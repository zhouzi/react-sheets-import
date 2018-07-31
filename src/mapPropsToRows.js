/* @flow */
import type { Props, Row, Rows } from './index.js.flow';

function mapPropsToRow(props: Props, row: Row): ?Object {
    const acc = {};

    for (let index = 0; index < props.length; index += 1) {
        const prop = props[index];

        if (prop == null) {
            // eslint-disable-next-line no-continue
            continue;
        }

        const value = prop.deserialize(row[index]);

        if (value == null && prop.required()) {
            return null;
        }

        setIn(acc, prop.key(), value);
    }

    return acc;
}

export default function mapPropsToRows(props: Props, rows: Rows) {
    return rows.reduce((acc, row) => {
        const value = mapPropsToRow(props, row);
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
