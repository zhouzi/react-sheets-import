/* @flow */
import test from 'ava';
import Types from '../Types';
import mapColumnsToRows from '../mapColumnsToRows';

test('it should map a simple object', t => {
    const columns = Types.Object({
        name: Types.String().alias('Name')
    });
    const rows = [['John'], ['Jane']];
    const actual = mapColumnsToRows(columns, rows);
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
    const columns = Types.Object({
        name: Types.String().alias('Name'),
        address: Types.Object({
            city: Types.String().alias('City')
        })
    });
    const rows = [['John', 'Paris'], ['Jane', 'Lyon']];
    const actual = mapColumnsToRows(columns, rows);
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
    const columns = Types.Object({
        name: Types.String().alias('Name')
    });
    const rows = [[123], [true]];
    const actual = mapColumnsToRows(columns, rows);
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

test('it should not serialize null to string', t => {
    const columns = Types.Object({
        name: Types.String().alias('Name')
    });
    const rows = [[null]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            name: null
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should serialize value to boolean', t => {
    const columns = Types.Object({
        isOpen: Types.Boolean().alias('Is Open')
    });
    const rows = [['yes'], [false], [0], [true]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            isOpen: true
        },
        {
            isOpen: false
        },
        {
            isOpen: false
        },
        {
            isOpen: true
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should not serialize null to boolean', t => {
    const columns = Types.Object({
        isOpen: Types.Boolean().alias('Is Open')
    });
    const rows = [[null]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            isOpen: null
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should serialize value to email', t => {
    const columns = Types.Object({
        email: Types.Email().alias('Email')
    });
    const rows = [
        ['john@gmail.com'],
        ['notanemail'],
        [false],
        ['jane@live.fr']
    ];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            email: 'john@gmail.com'
        },
        {
            email: null
        },
        {
            email: null
        },
        {
            email: 'jane@live.fr'
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should serialize value to date', t => {
    const columns = Types.Object({
        date: Types.Date().alias('Date')
    });
    const rows = [['2005-08-27'], ['not a date'], [false], [1125100800000]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            date: new Date('2005-08-27')
        },
        {
            date: null
        },
        {
            date: null
        },
        {
            date: new Date('2005-08-27')
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should omit invalid objects', t => {
    const columns = Types.Object({
        age: Types.Number()
            .alias('Age')
            .required(true)
    });
    const rows = [['not a number'], [29]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            age: 29
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should not omit invalid objects if the column is not required', t => {
    const columns = Types.Object({
        age: Types.Number().alias('Age')
    });
    const rows = [['not a number'], [29]];
    const actual = mapColumnsToRows(columns, rows);
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
    const columns = Types.Object({
        name: Types.String().alias('Name'),
        age: Types.Number().alias('Age')
    });
    const newColumns = [null, columns[0], null, columns[1]];
    const rows = [['Paris', 'John', 'Red', 29], ['Lyon', 'Jane', 'Yellow', 32]];
    const actual = mapColumnsToRows(newColumns, rows);
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

test('it should deserialize null values to the default value', t => {
    const columns = Types.Object({
        name: Types.String().defaultValue('John')
    });
    const rows = [[null]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            name: 'John'
        }
    ];

    t.deepEqual(actual, expected);
});

test('it should deserialize null to a falsy default value', t => {
    const columns = Types.Object({
        name: Types.String().defaultValue('')
    });
    const rows = [[null]];
    const actual = mapColumnsToRows(columns, rows);
    const expected = [
        {
            name: ''
        }
    ];

    t.deepEqual(actual, expected);
});
