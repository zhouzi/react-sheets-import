/* @flow */
import Shape from './Shape';

class PropTypes {
    static Shape = Shape;

    static String() {
        return new PropTypes(value => String(value));
    }

    static Number() {
        return new PropTypes(value => {
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

export default PropTypes;
