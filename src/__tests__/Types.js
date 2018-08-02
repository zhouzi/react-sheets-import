/* @flow */
import test from 'ava';
import Types from '../Types';

test('it should return an array', t => {
    const actual = Array.isArray(Types.Object({}));
    const expected = true;

    t.is(actual, expected);
});

test('it should add a prop', t => {
    const props = Types.Object({
        name: Types.String().alias('Name')
    });
    const actual = props[0].alias();
    const expected = 'Name';

    t.is(actual, expected);
});

test('it should add a separate prop', t => {
    const props = Types.Object({
        name: Types.String().alias('Address')
    });
    const actual = props[0].alias();
    const expected = 'Address';

    t.is(actual, expected);
});

test('it should flatten props', t => {
    const props = Types.Object({
        user: Types.Object({
            name: Types.String().alias('Name')
        })
    });
    const actual = props[0].alias();
    const expected = 'Name';

    t.is(actual, expected);
});
