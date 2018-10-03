/* @flow */
import GenericType from './GenericType';

export default class EmailType extends GenericType {
    deserialize(value: any): ?string {
        if (value == null) {
            return this.get('defaultValue');
        }

        return /[^@]+@[^@]+\.[a-z]{2,}/i.test(value)
            ? value
            : this.get('defaultValue');
    }
}
