/* @flow */
import test from 'ava';
import BooleanType from '../BooleanType';

test('it should return the boolean value', t => {
    const actual = new BooleanType().deserialize(true);
    const expected = true;

    t.is(actual, expected);
});

test('it should return the default value', t => {
    const actual = new BooleanType().defaultValue(true).deserialize(null);
    const expected = true;

    t.is(actual, expected);
});

test('it should deserialize falsy values', t => {
    const actual = [0, ''].map(falsyValue =>
        new BooleanType().deserialize(falsyValue)
    );
    const expected = [false, false];

    t.deepEqual(actual, expected);
});

test('it should deserialize truthy values', t => {
    const actual = ['hello', 1, [], {}].map(truthyValue =>
        new BooleanType().deserialize(truthyValue)
    );
    const expected = [true, true, true, true];

    t.deepEqual(actual, expected);
});
