import { forwardRef, useId, useReducer } from 'react'
import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import Feather from './assets/feather.jpg'
import Fire from './assets/fire.jpg'
import ReactLogo from './assets/react.svg'
import {
  Cursor,
  setGlobalStyle,
  useCursorStyle,
  useCursorStyleOnHover,
  useGlobalStyle,
} from './lib'

function CustomCursor() {
  useCursorStyle({
    transition: ['transform', 'border-radius', 'mix-blende-mode']
      .map((transition) => `${transition} 0.3s ease-in-out`)
      .join(', '),
  })

  return (
    <div style={{ display: 'none' }}>
      <Cursor.Shapes.Square />
      <Cursor.Effects.Glow />
    </div>
  )
}

function Title() {
  return (
    <h1
      className="title"
      ref={useCursorStyleOnHover('Shape.Ring', 'Effect.Fill', 'Effect.Difference')}
    >
      Hover me!
    </h1>
  )
}

function Paragraph() {
  return (
    <p className="paragraph" ref={useCursorStyleOnHover('Effect.Glow', 'Shape.Diamond')}>
      Corpus callosum preserve and cherish that pale blue dot laws of physics two ghostly white
      figures in coveralls and helmets are softly dancing a still more glorious dawn awaits
      permanence of the stars. Citizens of distant epochs emerged into consciousness colonies dream
      of the mind's eye citizens of distant epochs Sea of Tranquility?
    </p>
  )
}

const gallery = [Feather, DropOfWater, Fire]

const Image = forwardRef<HTMLImageElement, JSX.IntrinsicElements['img']>((props, ref) => {
  return <img ref={ref} {...props} alt={props.src?.split('.')[0]} width={200} height={350} />
})

function Photo(props: JSX.IntrinsicElements['img']) {
  return (
    <Image
      {...props}
      ref={useCursorStyleOnHover(
        { transform: 'rotate(360deg)' },
        'Shape.Ring',
        'Effect.Zoom',
        'Effect.Grow',
      )}
    />
  )
}

function ChangeIconShape() {
  return (
    <div style={{ display: 'none' }}>
      <Cursor.Effects.Fill />
      <Cursor.Shapes.Mask>
        <img src={ReactLogo} alt={ReactLogo} />
      </Cursor.Shapes.Mask>
    </div>
  )
}

function ChangeGlobalStyle() {
  const checkboxId = useId()
  const [isActive, toggle] = useReducer((v) => !v, false)
  const { color } = useGlobalStyle()

  return (
    <form>
      <fieldset>
        <label>color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, color: e.target.value }))}
        />
        <label htmlFor={checkboxId}>Change shape</label>
        <input id={checkboxId} type="checkbox" checked={isActive} onChange={toggle} />
        {isActive && <ChangeIconShape />}
      </fieldset>
      <fieldset>
        <label>Width</label>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, width: e.target.value + 'px' }))}
        />
        <label>Height</label>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, height: e.target.value + 'px' }))}
        />
      </fieldset>
    </form>
  )
}

export function UseCursorOnHoverExamples() {
  return (
    <Cursor.Provider height="40px" width="40px">
      <CustomCursor />

      <div className="container">
        <Title />

        <Paragraph />

        <div className="gallery">
          {gallery.map((src) => (
            <Photo key={src} src={src} />
          ))}
        </div>
        <ChangeGlobalStyle />
      </div>
    </Cursor.Provider>
  )
}
