/* @flow */
import type { Tree } from './index.js.flow';

export default function Shape(tree: Tree) {
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
