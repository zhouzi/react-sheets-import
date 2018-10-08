/* @flow */
import test from 'ava';
import StringType from '../StringType';

test('it should deserialize a string value', t => {
    const actual = new StringType().deserialize('john');
    const expected = 'john';

    t.is(actual, expected);
});

test('it should return the default value', t => {
    const actual = new StringType().defaultValue('john').deserialize(null);
    const expected = 'john';

    t.is(actual, expected);
});

test('it should convert to string', t => {
    const actual = new StringType().deserialize(123);
    const expected = '123';

    t.is(actual, expected);
});
