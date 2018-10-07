/* @flow */
import test from 'ava';
import GenericType from '../GenericType';

class TestType extends GenericType {
    deserialize(value: number): number {
        return value + 1;
    }
}

test('it should deserialize the default value', t => {
    const actual = new TestType().defaultValue(0).get('defaultValue');
    const expected = 1;

    t.is(actual, expected);
});
