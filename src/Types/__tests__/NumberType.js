/* @flow */
import test from 'ava';
import NumberType from '../NumberType';

test('it should return a number value', t => {
    const actual = new NumberType().deserialize(0);
    const expected = 0;

    t.is(actual, expected);
});

test('it should return the default value', t => {
    const actual = new NumberType().defaultValue(0).deserialize(null);
    const expected = 0;

    t.is(actual, expected);
});

test('it should convert a string to a number', t => {
    const actual = new NumberType().deserialize('123');
    const expected = 123;

    t.is(actual, expected);
});

test('it should not return an invalid number', t => {
    const actual = new NumberType().deserialize('not a number');
    const expected = null;

    t.is(actual, expected);
});

test('it should return the default value when given an invalid value', t => {
    const actual = new NumberType().defaultValue(0).deserialize('not a number');
    const expected = 0;

    t.is(actual, expected);
});
