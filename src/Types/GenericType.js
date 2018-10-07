/* @flow */
import type { Type } from '../types.flow';

class GenericType implements Type {
    json: {
        key: string,
        alias: string,
        required: boolean,
        defaultValue: any
    } = {
        key: '',
        alias: 'Name',
        required: false,
        defaultValue: null
    };

    deserialize(value: any): any {
        throw new Error('This type is missing a deserialize method');
    }

    alias(alias: string): Type {
        return this.set('alias', alias);
    }

    required(required: boolean): Type {
        return this.set('required', required);
    }

    defaultValue(value: any): Type {
        return this.set('defaultValue', this.deserialize(value));
    }

    set(key: string, value: any): Type {
        this.json[key] = value;
        return this;
    }

    get(key: string): any {
        if (key === 'alias') {
            return this.json.alias || this.json.key;
        }

        return this.json[key];
    }
}

export default GenericType;
