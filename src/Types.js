/* @flow */
import type { Tree, Props } from './index';

class Types {
    static Object(tree: Tree): Props {
        return Object.keys(tree).reduce((acc, key) => {
            const value = tree[key];

            if (Array.isArray(value)) {
                return acc.concat(
                    value.map(prop =>
                        prop.set('key', `${key}.${prop.get('key')}`)
                    )
                );
            }

            return acc.concat(tree[key].set('key', key));
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

    set(key: string, value: any) {
        this.json[key] = value;
        return this;
    }

    get(key: string) {
        return this.json[key];
    }
}

export default Types;
