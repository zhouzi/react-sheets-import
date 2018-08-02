/* @flow */
import * as React from 'react';
import Papa from 'papaparse';

import type { Rows } from './index.js.flow';

type InputFileProps = {
    inputRef?: (input: ?HTMLInputElement) => void,
    onChange: (rows: Rows) => void
};

class InputFile extends React.Component<InputFileProps> {
    static defaultProps = {
        inputRef: null
    };

    onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        const rows = [];

        Papa.parse(event.target.files[0], {
            worker: true,
            dynamicTyping: true,
            step: ({ data }) => rows.push(...data),
            complete: () => onChange(rows),
            error: console.error.bind(console)
        });
    };

    render() {
        const { inputRef, ...props } = this.props;

        return (
            <input
                {...props}
                ref={inputRef}
                type="file"
                accept="text/csv"
                onChange={this.onChange}
            />
        );
    }
}

export default InputFile;
