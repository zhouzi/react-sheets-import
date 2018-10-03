/* @flow */
import GenericType from './GenericType';

export default class BooleanType extends GenericType {
    deserialize(value: any): ?boolean {
        if (value == null) {
            return this.defaultValue();
        }

        return Boolean(value);
    }
}
