/* @flow */
import GenericType from './GenericType';

export default class StringType extends GenericType {
    deserialize(value: any): ?string {
        if (value == null) {
            return this.get('defaultValue');
        }

        return String(value);
    }
}
