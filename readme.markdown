# formulario

> Effortlessly turn `<form>` elements into payloads encoded as `multipart/form-data`

# Install

```shell
npm install formulario --save
```

# Usage

You can use `formulario` with both a `<form>` element from the DOM or a plain JavaScript object.

```js
var formulario = require('formulario');

formulario(document.querySelector('form'));
formulario({ foo: 'bar' });
```

You'll get back the necessary `headers` and the `multipart/form-data`-encoded request body.

```js
{
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data; boundary=GradualFormBoundary10011100000111011100010001000101'
  },
  body: '--GradualFormBoundary10011100000111011100010001000101\r\ncontent-disposition: form-data; name="foo"\r\n\r\nbar\r\n--GradualFormBoundary10011100000111011100010001000101--'
}
```

# License

MIT
