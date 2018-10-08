/* @flow */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import {
    Heading,
    SubHeading,
    Pane,
    SelectMenu,
    Checkbox,
    Button,
    Label,
    Text,
    Table,
    TableBody,
    TableRow,
    TextTableCell
} from 'evergreen-ui';
import saveJSON from 'save-json-file';

import { Types, DropZone, mapColumnsToRows } from '../src';
import CSVParser from '../src/parsers/csv';
import XLSXParser from '../src/parsers/xlsx';
import type { Rows, Type, Columns } from '../src/types.flow';

import Container from './Container';

const User = Types.Object({
    name: Types.String().alias('Name'),
    email: Types.String().alias('Email Address'),
    company: Types.String().alias('Company'),
    website: Types.String().alias('Website / Blog')
});

type ExamplesProps = {};
type ExamplesState = {
    rows: Rows,
    currentRowIndex: number,
    columns: Columns,
    isHoverUpload: boolean,
    isIgnoreHeaderRow: boolean
};

class Examples extends React.Component<ExamplesProps, ExamplesState> {
    state = {
        rows: [],
        currentRowIndex: 0,
        columns: [],
        isHoverUpload: false,
        isIgnoreHeaderRow: true
    };

    static getPropIndex(columns: Columns, column: Type): ?number {
        const index = columns.findIndex(col => col === column);
        return index > -1 ? index : null;
    }

    onHoverUploadEnter = () => {
        this.setState({
            isHoverUpload: true
        });
    };

    onHoverUploadLeave = () => {
        this.setState({
            isHoverUpload: false
        });
    };

    onSelectRow = (rowIndex: number) => {
        this.setState({
            currentRowIndex: rowIndex
        });
    };

    onChangeRows = (rows: Rows) => {
        this.setState({
            rows,
            currentRowIndex: 0,
            columns: Array.from({ length: rows[0].length }, () => null)
        });
    };

    onSelect = (column: Type, index: number) => {
        this.setState(({ columns }) => ({
            columns: columns.map((col, columnIndex) => {
                if (columnIndex === index) {
                    return column;
                }

                return col === column ? null : col;
            })
        }));
    };

    onDownload = () => {
        const { columns, isIgnoreHeaderRow } = this.state;
        const { rows } = this.state;

        saveJSON(
            mapColumnsToRows(columns, isIgnoreHeaderRow ? rows.slice(1) : rows)
        );
    };

    onToggleIgnoreHeaderRow = () => {
        this.setState(({ isIgnoreHeaderRow }) => ({
            isIgnoreHeaderRow: !isIgnoreHeaderRow
        }));
    };

    render() {
        const {
            rows,
            currentRowIndex,
            columns,
            isHoverUpload,
            isIgnoreHeaderRow
        } = this.state;

        return (
            <Container>
                <Heading size={900} marginBottom={4}>
                    react-sheets-import
                </Heading>
                <SubHeading size={600} marginBottom={40}>
                    Let users load a sheet and map its columns to your model.
                </SubHeading>

                {rows.length > 0 ? (
                    <Pane elevation={0} padding={20} display="flex">
                        <div style={{ width: '75%', overflowX: 'auto' }}>
                            <Table width="max-content">
                                <TableBody height={360}>
                                    {rows.slice(0, 20).map((row, rowIndex) => (
                                        <TableRow
                                            key={rowIndex}
                                            onSelect={() =>
                                                this.onSelectRow(rowIndex)
                                            }
                                            isSelected={
                                                currentRowIndex === rowIndex
                                            }
                                            isSelectable
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <TextTableCell
                                                    key={cellIndex}
                                                    borderRight={
                                                        row.length - 1 ===
                                                        cellIndex
                                                            ? null
                                                            : true
                                                    }
                                                >
                                                    {cell}
                                                </TextTableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {rows.length > 20 ? (
                                        <TableRow key="moreRow">
                                            <TextTableCell key="moreCell">
                                                <b>{rows.length - 20}</b>{' '}
                                                additionnal rows where found...
                                            </TextTableCell>
                                        </TableRow>
                                    ) : (
                                        ''
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div style={{ flex: '1 0 auto', paddingLeft: 40 }}>
                            {User.map(prop => (
                                <div
                                    key={prop.get('alias')}
                                    style={{
                                        marginBottom: 20
                                    }}
                                >
                                    <Label display="block" marginBottom={4}>
                                        {prop.get('alias')}
                                    </Label>
                                    <SelectMenu
                                        title="Select a value..."
                                        options={rows[currentRowIndex].map(
                                            (value, cellIndex) => ({
                                                label: value,
                                                value: cellIndex
                                            })
                                        )}
                                        onSelect={({ value }) =>
                                            this.onSelect(prop, value)
                                        }
                                        selected={Examples.getPropIndex(
                                            columns,
                                            prop
                                        )}
                                    >
                                        <Button>
                                            {Examples.getPropIndex(
                                                columns,
                                                prop
                                            ) == null
                                                ? 'Select a value...'
                                                : // $FlowFixMe getPropIndex is assured not to return null but I'm too lazy to move it for now
                                                  rows[currentRowIndex][
                                                      Examples.getPropIndex(
                                                          columns,
                                                          prop
                                                      )
                                                  ]}
                                        </Button>
                                    </SelectMenu>
                                </div>
                            ))}
                            <Checkbox
                                height="20"
                                checked={isIgnoreHeaderRow}
                                appearance="default"
                                hasCheckIcon
                                label="Ignore header row"
                                onChange={this.onToggleIgnoreHeaderRow}
                            />

                            <Button
                                appearance="green"
                                onClick={this.onDownload}
                            >
                                Download JSON
                            </Button>
                        </div>
                    </Pane>
                ) : (
                    <Pane
                        appearance={isHoverUpload ? 'selected' : 'tint2'}
                        border="muted"
                        height={320}
                        cursor="pointer"
                        onMouseEnter={this.onHoverUploadEnter}
                        onMouseLeave={this.onHoverUploadLeave}
                    >
                        <DropZone
                            style={{
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onChange={this.onChangeRows}
                            parsers={[CSVParser, XLSXParser]}
                        >
                            <Text size={400} marginRight={6}>
                                Drop your Excel/CSV file here or
                            </Text>
                            <Button>Browse</Button>
                        </DropZone>
                    </Pane>
                )}
            </Container>
        );
    }
}

export default Examples;
