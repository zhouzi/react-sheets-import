/* @flow */
import test from 'ava';
import PropTypes from '../PropTypes';

test('it should return an array', t => {
    const actual = Array.isArray(PropTypes.Shape({}));
    const expected = true;

    t.is(actual, expected);
});

test('it should add a prop', t => {
    const props = PropTypes.Shape({
        name: PropTypes.String().label('Name')
    });
    const actual = props[0].label();
    const expected = 'Name';

    t.is(actual, expected);
});

test('it should add a separate prop', t => {
    const props = PropTypes.Shape({
        name: PropTypes.String().label('Address')
    });
    const actual = props[0].label();
    const expected = 'Address';

    t.is(actual, expected);
});

test('it should flatten props', t => {
    const props = PropTypes.Shape({
        user: PropTypes.Shape({
            name: PropTypes.String().label('Name')
        })
    });
    const actual = props[0].label();
    const expected = 'Name';

    t.is(actual, expected);
});
