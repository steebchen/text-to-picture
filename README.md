# text-to-picture

Easily convert characters to a picture with aligned text.

Pure javascript, no native or external dependencies.

A text input "LS" could look like this:

![ls](https://i.imgur.com/jfsoApy.png)

## Quickstart

It's simple.

`npm i text-to-picture`

With async/await.

```js
const textToPicture = require('text-to-picture')

const result = await textToPicture.convert({
  text: 'LS'
})

const str = await result.getBase64()

console.log(str) // data:image/png;base64,iVBORw0KGgoA...

// useful for http servers
const buf = await result.getBuffer()
// http response object
response.send(buf) // <Buffer 89 50 4e 47 ...>
```

With promises.

```js
const textToPicture = require('text-to-picture')

textToPicture.convert({
  text: 'LS'
}).then(result => {
  return result.getBase64()
}).then(str => {
  console.log(str) // data:image/png;base64,iVBORw0KGgoA...
}).catch(err => handle(err))

```

## API

### TextToPicture.convert(options: Object)

options:

- `text: String` - The text to write. Required.
- `source: String|Object` - String to a local file or Object:
  - `width: Number` - Width of new image. default: 256
  - `height: Number` - Height of new image. default: 256
  - `background: Number` - Background in hex. example: 0xFF0000FF, default: black, transparent for pngs
- `size: String` - Text size. Can be one of `8, 16, 32, 64, 128`. default: `64`
- `color: String` - Color. Can be `'black` or `'white'`. default: `'black'`
- `ext: String` - File type. `'jpeg'`, `'png'` or `'bmp'`. default: `'png'`,
- `quality: String` - Image quality between `0` and `100`. default: `60`
- `customFont: String` - Path to .fnt font.

returns: Object

- `getBase64(): Promise` - Get base64 data uri
- `getBuffer(): Promise` - Get a node buffer (useful for http server)
- `write(path: String): Promise` - Write file to given path (with filename & extension)
- `image: Jimp` - the image Jimp object for special customisation.

### TextToPicture.Jimp

The [Jimp](https://www.npmjs.com/package/jimp) class.
