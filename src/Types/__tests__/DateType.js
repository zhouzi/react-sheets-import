/* @flow */
import test from 'ava';
import DateType from '../DateType';

const now = new Date();

test('it should return the date value', t => {
    const actual = new DateType().deserialize(now);
    const expected = now;

    t.is(actual, expected);
});

test('it should return the default value', t => {
    const actual = new DateType().defaultValue(now).deserialize(null);
    const expected = now;

    t.is(actual, expected);
});

test('it should parse a timestamp', t => {
    const actual = new DateType().deserialize(now.getTime());
    const expected = now;

    t.deepEqual(actual, expected);
});

test('it should parse a date string', t => {
    const actual = new DateType().deserialize('2000-01-01');
    const expected = new Date('2000-01-01');

    t.deepEqual(actual, expected);
});

test('it should not return an invalid value', t => {
    const actual = new DateType().deserialize('not a date');
    const expected = null;

    t.is(actual, expected);
});
