/* @flow */
import test from 'ava';
import PropTypes from '../PropTypes';
import mapPropsToRows from '../mapPropsToRows';

test('it should map a simple object', t => {
    const props = PropTypes.Shape({
        name: PropTypes.String().label('Name')
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
    const props = PropTypes.Shape({
        name: PropTypes.String().label('Name'),
        address: PropTypes.Shape({
            city: PropTypes.String().label('City')
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
    const props = PropTypes.Shape({
        name: PropTypes.String().label('Name')
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
    const props = PropTypes.Shape({
        age: PropTypes.Number()
            .label('Age')
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
    const props = PropTypes.Shape({
        age: PropTypes.Number().label('Age')
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
