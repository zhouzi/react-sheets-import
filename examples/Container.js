/* @flow */
import * as React from 'react';

type ContainerProps = {
    children: React.Node
};

class Container extends React.Component<ContainerProps> {
    render() {
        const { children } = this.props;
        return (
            <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                {children}
            </div>
        );
    }
}

export default Container;
