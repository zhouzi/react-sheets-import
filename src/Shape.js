/* @flow */
import type { Tree, Props } from './index.js.flow';

function Shape(tree: Tree): Props {
    return Object.keys(tree).reduce((acc, key) => {
        const value = tree[key];

        if (Array.isArray(value)) {
            return acc.concat(
                value.map(prop => prop.key(`${key}.${prop.key()}`))
            );
        }

        return acc.concat(tree[key].key(key));
    }, []);
}

export default Shape;
