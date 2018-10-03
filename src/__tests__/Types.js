/* @flow */
import test from 'ava';
import Types from '../Types';

test('it should return an array', t => {
    const actual = Array.isArray(Types.Object({}));
    const expected = true;

    t.is(actual, expected);
});

test('it should add a column', t => {
    const columns = Types.Object({
        name: Types.String().alias('Name')
    });
    const actual = columns[0].get('alias');
    const expected = 'Name';

    t.is(actual, expected);
});

test('it should add a separate column', t => {
    const columns = Types.Object({
        name: Types.String().alias('Address')
    });
    const actual = columns[0].get('alias');
    const expected = 'Address';

    t.is(actual, expected);
});

test('it should flatten column', t => {
    const columns = Types.Object({
        user: Types.Object({
            name: Types.String().alias('Name')
        })
    });
    const actual = columns[0].get('alias');
    const expected = 'Name';

    t.is(actual, expected);
});
