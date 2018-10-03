/* @flow */
import type { Tree } from '../index.js.flow';
import BooleanType from './BooleanType';
import DateType from './DateType';
import EmailType from './EmailType';
import GenericType from './GenericType';
import NumberType from './NumberType';
import StringType from './StringType';

const Types = {
    Object(tree: Tree) {
        return Object.keys(tree).reduce((acc, key) => {
            const value = tree[key];

            if (Array.isArray(value)) {
                return acc.concat(
                    value.map(column =>
                        column.set('key', `${key}.${column.get('key')}`)
                    )
                );
            }

            return acc.concat(tree[key].set('key', key));
        }, []);
    },
    Date() {
        return new DateType();
    },
    Boolean() {
        return new BooleanType();
    },
    Email() {
        return new EmailType();
    },
    Number() {
        return new NumberType();
    },
    String() {
        return new StringType();
    }
};

export { Types as default, GenericType };
