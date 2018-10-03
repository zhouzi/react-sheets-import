/* @flow */
import GenericType from './GenericType';

export default class StringType extends GenericType {
    deserialize(value: any): ?string {
        if (value == null) {
            return this.defaultValue();
        }

        return String(value);
    }
}
