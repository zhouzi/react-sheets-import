/* @flow */
import test from 'ava';
import Types from '../Types';
import mapPropsToRows from '../mapPropsToRows';

test('it should map a simple object', t => {
    const props = Types.Object({
        name: Types.String().alias('Name')
    });
    const rows = [['John'], ['Jane']];
    const actual = mapPropsToRows(props, rows);
    const expected = [
        {
            name: 'John'
        },
        {
            name: 'Jane'
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should map a complex object', t => {
    const props = Types.Object({
        name: Types.String().alias('Name'),
        address: Types.Object({
            city: Types.String().alias('City')
        })
    });
    const rows = [['John', 'Paris'], ['Jane', 'Lyon']];
    const actual = mapPropsToRows(props, rows);
    const expected = [
        {
            name: 'John',
            address: {
                city: 'Paris'
            }
        },
        {
            name: 'Jane',
            address: {
                city: 'Lyon'
            }
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should serialize value to string', t => {
    const props = Types.Object({
        name: Types.String().alias('Name')
    });
    const rows = [[123], [true]];
    const actual = mapPropsToRows(props, rows);
    const expected = [
        {
            name: '123'
        },
        {
            name: 'true'
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should omit invalid objects', t => {
    const props = Types.Object({
        age: Types.Number()
            .alias('Age')
            .required(true)
    });
    const rows = [['not a number'], [29]];
    const actual = mapPropsToRows(props, rows);
    const expected = [
        {
            age: 29
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should not omit invalid objects if the prop is not required', t => {
    const props = Types.Object({
        age: Types.Number().alias('Age')
    });
    const rows = [['not a number'], [29]];
    const actual = mapPropsToRows(props, rows);
    const expected = [
        {
            age: null
        },
        {
            age: 29
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should ignore unmapped columns', t => {
    const props = Types.Object({
        name: Types.String().alias('Name'),
        age: Types.Number().alias('Age')
    });
    const newProps = [null, props[0], null, props[1]];
    const rows = [['Paris', 'John', 'Red', 29], ['Lyon', 'Jane', 'Yellow', 32]];
    const actual = mapPropsToRows(newProps, rows);
    const expected = [
        {
            name: 'John',
            age: 29
        },
        {
            name: 'Jane',
            age: 32
        }
    ];

    t.deepEqual(actual, expected);
});
