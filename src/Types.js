/* @flow */
import type { Tree, Columns } from './index';

class Types {
    static Object(tree: Tree): Columns {
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
    }

    static String() {
        return new Types(value => value === null ? null : String(value));
    }

    static Number() {
        return new Types(value => {
            const num = Number(value);
            return isNaN(num) ? null : num;
        });
    }

    static Boolean() {
        return new Types(value => value === null ? null : Boolean(value));
    }

    static Email() {
        return new Types(
            value => (/[^@]+@[^@]+\.[a-z]{2,}/i.test(value) ? value : null)
        );
    }

    static Date() {
        return new Types(value => {
            if (!value && typeof value !== 'number') {
                // Skip falsy values that are not numbers
                return null;
            }

            const date = new Date(value);
            return date instanceof Date && !isNaN(date) ? date : null;
        });
    }

    constructor(deserializer: (value: any) => any) {
        this.deserialize = (value:any) => deserializer(value === null ? this.defaultValue() : value);

        this.json = {
            key: '',
            alias: 'Name',
            required: false
        };
    }

    alias(alias: string) {
        if (typeof alias === 'string') {
            return this.set('alias', alias);
        }

        return this.get('alias') || this.get('key');
    }

    required(required: boolean) {
        if (typeof required === 'boolean') {
            return this.set('required', required);
        }

        return this.get('required');
    }

    defaultValue(value: any) {
        if ( value || false) {
            return this.set('defaultValue', value);
        }

        return this.get('defaultValue') || null;
    }

    set(key: string, value: any) {
        this.json[key] = value;
        return this;
    }

    get(key: string) {
        return this.json[key];
    }
}

export default Types;
