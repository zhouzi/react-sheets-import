/* @flow */
import GenericType from './GenericType';

export default class NumberType extends GenericType {
    deserialize(value: any): ?number {
        if (value == null) {
            return this.defaultValue();
        }

        const num = Number(value);
        // eslint-disable-next-line no-restricted-globals
        return isNaN(num) ? this.defaultValue() : num;
    }
}
