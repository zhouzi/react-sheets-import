/* @flow */
import GenericType from './GenericType';

export default class BooleanType extends GenericType {
    deserialize(value: any): ?boolean {
        if (value == null) {
            return this.get('defaultValue');
        }

        return Boolean(value);
    }
}
