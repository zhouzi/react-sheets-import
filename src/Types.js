/* @flow */
import type { Tree, Props } from './index';

class Types {
    static Object(tree: Tree): Props {
        return Object.keys(tree).reduce((acc, key) => {
            const value = tree[key];

            if (Array.isArray(value)) {
                return acc.concat(
                    value.map(prop => prop.key(`${key}.${prop.key()}`))
                );
            }

            return acc.concat(tree[key].key(key));
        }, []);
    }

    static String() {
        return new Types(value => String(value));
    }

    static Number() {
        return new Types(value => {
            const num = Number(value);
            return isNaN(num) ? null : num;
        });
    }

    constructor(deserialize: (value: any) => any) {
        this.deserialize = deserialize;
        this.json = {
            key: '',
            label: 'Name',
            required: false
        };
    }

    label(...args) {
        return this.getOrSet('label', ...args);
    }

    key(...args) {
        return this.getOrSet('key', ...args);
    }

    required(...args) {
        return this.getOrSet('required', ...args);
    }

    getOrSet(key: string, ...args) {
        if (args.length > 0) {
            const [value] = args;
            this.json[key] = value;

            return this;
        }

        return this.json[key];
    }
}

export default Types;
