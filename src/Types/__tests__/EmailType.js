/* @flow */
import test from 'ava';
import EmailType from '../EmailType';

test('it should return a valid email address', t => {
    const actual = new EmailType().deserialize('john@doe.com');
    const expected = 'john@doe.com';

    t.is(actual, expected);
});

test('it should return the default value', t => {
    const actual = new EmailType()
        .defaultValue('john@doe.com')
        .deserialize(null);
    const expected = 'john@doe.com';

    t.is(actual, expected);
});

test('it should not return an invalid email address', t => {
    const actual = new EmailType().deserialize('not an email');
    const expected = null;

    t.is(actual, expected);
});

test('it should return the default value when value is not an email address', t => {
    const actual = new EmailType()
        .defaultValue('john@doe.com')
        .deserialize('not an email');
    const expected = 'john@doe.com';

    t.is(actual, expected);
});
