/* @flow */

class GenericType {
    constructor() {
        this.json = {
            key: '',
            alias: 'Name',
            required: false,
            defaultValue: null
        };
    }

    deserialize(value: any) {
        return value == null ? this.defaultValue() : value;
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
        if (value !== undefined) {
            return this.set('defaultValue', value);
        }

        return this.get('defaultValue');
    }

    set(key: string, value: any) {
        this.json[key] = value;
        return this;
    }

    get(key: string) {
        return this.json[key];
    }
}

export default GenericType;
