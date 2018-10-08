/* @flow */
import * as React from 'react';

import type { Parser, Rows } from '../types.flow';
import parseFile from '../parseFile';
import InputFile from './InputFile';

type DropZoneProps = {
    onChange: (rows: Rows) => void,
    parsers: Parser[],
    children: React.Node
};

class DropZone extends React.Component<DropZoneProps> {
    input = React.createRef();

    browse = () => {
        if (this.input.current) {
            this.input.current.click();
        }
    };

    onKeyDown = (event: SyntheticKeyboardEvent<*>) => {
        const ENTER = 13;

        if (event.keyCode === ENTER) {
            this.browse();
        }
    };

    onDragOver = (event: SyntheticDragEvent<*>) => {
        event.preventDefault();
    };

    onDrop = async (event: SyntheticDragEvent<*>) => {
        event.preventDefault();

        const { onChange, parsers } = this.props;
        const file = event.dataTransfer.files[0];
        const rows = await parseFile(file, parsers);
        onChange(rows);
    };

    render() {
        const { onChange, parsers, children, ...props } = this.props;

        return (
            <div
                {...props}
                role="button"
                tabIndex={0}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onKeyDown={this.onKeyDown}
                onClick={this.browse}
            >
                <InputFile
                    inputRef={this.input}
                    style={{ display: 'none' }}
                    onChange={onChange}
                    parsers={parsers}
                />
                {children}
            </div>
        );
    }
}

export default DropZone;
