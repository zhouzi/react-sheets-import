/* @flow */
import * as React from 'react';

import type { Rows, Parser } from './index.js.flow';
import parseFile from './parseFile';

type InputFileProps = {
    inputRef?: (input: ?HTMLInputElement) => void,
    onChange: (rows: Rows) => void,
    parsers: Parser[]
};

class InputFile extends React.Component<InputFileProps> {
    static defaultProps = {
        inputRef: null
    };

    onChange = async (event: SyntheticInputEvent<HTMLInputElement>) => {
        const { onChange, parsers } = this.props;
        const file = event.target.files[0];
        const rows = await parseFile(file, parsers);
        onChange(rows);
    };

    render() {
        const { inputRef, parsers, ...props } = this.props;

        return (
            <input
                {...props}
                ref={inputRef}
                type="file"
                accept={parsers.map(parser => parser.contentType).join(',')}
                onChange={this.onChange}
            />
        );
    }
}

export default InputFile;
