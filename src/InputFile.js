/* @flow */
import * as React from 'react';

import type { Rows, Parser } from './index.js.flow';

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
        const parser = parsers.find(
            ({ contentType }) => file.type === contentType
        );

        if (parser == null) {
            throw new Error(
                `No parser for file with contentType ${file.contentType}`
            );
        }

        const rows = await parser.parse(file);
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
