# react-sheets-import

Let users load a sheet and map its columns to your model.

## Installation

```
yarn add react-sheets-import
```

## Example

```js
import { Types, mapPropsToRows } from 'react-sheets-import';

const User = Types.Object({
    name: Types.String(),
    email: Types.String()
});
const rows = [
    ['John', 'john@gmail.com'],
    ['Jane', 'jane@gmail.com']
];
const users = mapPropsToRows(User, rows);
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
const User = Types.Object({
    name: Types.String().required()
});
const rows = [
    [null],
    ['Jane']
];
const users = mapPropsToRows(User, rows);

// The first row will be ignored because it lacks a name.
```

#### `.alias(alias: string)`

Getter/setter to add an alias to a property, making it easier to identify it.
Alternatively, you could also use is as a label.

**Example:**

```js
const User = Types.Object({
    name: Types.String().alias('Name')
});

// User[0].label() will return 'Name'
```

Note: if an alias is not explicitly set, the property's key will be returned.

### `mapPropsToRows(props: Props, rows: Rows)`

Converts the rows into JSON objects according to the props provided.

**Example:**

```js
const User = Types.Object({
    name: Types.String().required()
});
const rows = [
    ['John'],
    ['Jane']
];
const users = mapPropsToRows(User, rows);
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

### `<InputFile />`

This library also exports a React component to load a sheet and parse its content.

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import { InputFile } from 'react-sheets-import';

class App extends React.Component {
    onChange = (rows) => {
        // rows will contain the sheet's rows
    };
    
    render() {
        return (
            <InputFile onChange={this.onChange} />
        );
    }
}

ReactDOM.render(<App />, window.document.getElementById('root'));
```

This component is just a file input configured to accept only the supported files.
You're free to pass it any other props (e.g `className`).
