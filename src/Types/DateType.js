/* @flow */
import GenericType from './GenericType';

export default class DateType extends GenericType {
    deserialize(value: any): ?Date {
        if (!value && typeof value !== 'number') {
            // Skip falsy values that are not numbers
            return this.defaultValue();
        }

        const date = new Date(value);
        // eslint-disable-next-line no-restricted-globals
        if (date instanceof Date && !isNaN(date)) {
            return date;
        }

        return this.defaultValue();
    }
}
