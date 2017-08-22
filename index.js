const Jimp = require('jimp')
const promisify = require('smart-promisify')

class TextToPicture {
  static async convert({
    text,
    source = {
      width: 256,
      height: 256
    },
    size = 64,
    color = 'black',
    customFont,
    ext = 'png',
    quality = 60
  }) {
    if (!text) {
      throw new Error('text is required')
    }

    let image

    if (typeof source === 'string') {
      image = await Jimp.read(source)
    } else {
      image = await new Jimp(source.width, source.height, source.background)
    }

    let font

    if (customFont) {
      font = customFont
    } else {
      const sizes = [8, 16, 32, 64, 128]
      const colors = ['black', 'white']
      if (!sizes.includes(size)) {
        throw new Error('size must be one of ' + sizes.join(',') + ' or use customFont (url to .fnt file)')
      }
      if (!colors.includes(color)) {
        throw new Error('color must be one of ' + colors.join(',') + ' or use customFont (url to .fnt file)')
      }
      let str = 'FONT_SANS_' + size + '_' + color.toUpperCase()
      font = Jimp[str]
    }

    font = await Jimp.loadFont(font)

    const height = (image.bitmap.height / 2) - (font.common.lineHeight / 2)

    image.print(font, 0, height, text, image.bitmap.width, Jimp.ALIGN_FONT_CENTER)

    image.quality(quality)

    return {
      image,
      async getBase64() {
        const getBase64 = promisify(image.getBase64)
        return await getBase64.call(image, 'image/' + ext)
      },
      async getBuffer() {
        const getBuffer = promisify(image.getBuffer)
        return await getBuffer.call(image, 'image/' + ext)
      },
      async write(path) {
        const write = promisify(image.write)
        return await write.call(image, path)
      }
    }
  }

  static get Jimp() {
    return Jimp
  }
}

module.exports = TextToPicture
