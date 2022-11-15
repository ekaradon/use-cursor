import { getState } from '../store'
import { Style } from '../style'

export const Mask: Style = function Mask({ target }) {
  const image = target?.current
  const { cursor } = getState()

  if (!target || !cursor) {
    return {}
  }

  if (!(image instanceof HTMLImageElement)) {
    throw Error('Mask can only be used on an image.')
  }

  const { src: svg } = image

  if (!svg.endsWith('.svg')) {
    throw Error('A mask can only defined with an SVG.')
  }

  return {
    maskImage: `url(${svg})`,
    WebkitMaskImage: `url(${svg})`,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: 'cover',
    WebkitMaskSize: 'cover',
  }
}
