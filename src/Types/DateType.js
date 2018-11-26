/* @flow */
import GenericType from './GenericType';

export default class DateType extends GenericType {
    static isDate(date: any): boolean {
        // eslint-disable-next-line no-restricted-globals
        return date instanceof Date && !isNaN(date);
    }

    deserialize(value: any): ?Date {
        if (!value && typeof value !== 'number') {
            // new Date() can convert some weird values to a date object
            // e.g new Date(null) but that's irrelevant and should be ignored
            // The only values that can be converted are strings and numbers
            return this.get('defaultValue');
        }

        const date = DateType.isDate(value) ? value : new Date(value);
        return DateType.isDate(date) ? date : this.get('defaultValue');
    }
}
