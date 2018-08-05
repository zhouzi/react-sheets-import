# react-sheets-import

Let users load a sheet and map its columns to your model.

## Installation

```
yarn add react-sheets-import
```

## Example

```js
import { Types, mapColumnsToRows } from 'react-sheets-import';

const User = Types.Object({
    name: Types.String(),
    email: Types.String()
});
const rows = [
    ['John', 'john@gmail.com'],
    ['Jane', 'jane@gmail.com']
];
const users = mapColumnsToRows(User, rows);
```

Have a look at the [examples](./examples) for a real-world example.

## Documentation

### `Types`

Object exposing types to structure your models:

* `Types.Object()`
* `Types.String()`

Apart from `Object`, all the types share the same methods.

#### `.required(isRequired: boolean)`

Getter/setter to mark a property as required (or not).
A row will not be imported if any of its required value is invalid.

**Example:**

```js
import { Types, mapColumnsToRows } from 'react-sheets-import';

const User = Types.Object({
    name: Types.String().required()
});
const rows = [
    [null],
    ['Jane']
];
const users = mapColumnsToRows(User, rows);

// The first row will be ignored because it lacks a name.
```

#### `.alias(alias: string)`

Getter/setter to add an alias to a property, making it easier to identify it.
Alternatively, you could also use is as a label.

**Example:**

```js
import { Types } from 'react-sheets-import';

const User = Types.Object({
    name: Types.String().alias('Name')
});

// User[0].label() will return 'Name'
```

Note: if an alias is not explicitly set, the property's key will be returned.

### `mapColumnsToRows(columns: Columns, rows: Rows)`

Converts the rows into JSON objects according to the columns provided.

**Example:**

```js
import { Types, mapColumnsToRows } from 'react-sheets-import';

const User = Types.Object({
    name: Types.String().required()
});
const rows = [
    ['John'],
    ['Jane']
];
const users = mapColumnsToRows(User, rows);
```

`users` holds:

```json
[
  {
    "name": "John"
  },
  {
    "name": "Jane"
  }
]
```

### `<DropZone />`

This component is a simple `<div />` with file dropping ability.
It can also be clicked to let the user browse files on their computer.

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import { DropZone } from 'react-sheets-import';
import CSVParser from 'react-sheets-import/dist/parsers/csv';
import XLSXParser from 'react-sheets-import/dist/parsers/xlsx';

class App extends React.Component {
    onChange = (rows) => {
        // rows will contain the sheet's rows
    };

    render() {
        return (
            <DropZone
                onChange={this.onChange}
                parsers={[CSVParser, XLSXParser]}
            >
                Drop your file or browse. 
            </DropZone>
        );
    }
}

ReactDOM.render(<App />, window.document.getElementById('root'));
```

### `<InputFile />`

A basic `<input type="file" />` component.

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import { InputFile } from 'react-sheets-import';
import CSVParser from 'react-sheets-import/dist/parsers/csv';
import XLSXParser from 'react-sheets-import/dist/parsers/xlsx';

class App extends React.Component {
    onChange = (rows) => {
        // rows will contain the sheet's rows
    };

    render() {
        return (
            <InputFile
                onChange={this.onChange}
                parsers={[CSVParser, XLSXParser]}
            />
        );
    }
}

ReactDOM.render(<App />, window.document.getElementById('root'));
```
