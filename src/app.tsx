import { useGlobalStyle } from '@/core'
import { setGlobalStyle } from '@/core/context'
import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import Feather from './assets/feather.jpg'
import Fire from './assets/fire.jpg'
import { Cursor, useCursorStyle, useCursorStyleOnHover } from './lib'

function CustomCursor() {
  useCursorStyle({
    transition: ['transform', 'border-radius', 'mix-blende-mode']
      .map((transition) => `${transition} 0.3s ease-in-out`)
      .join(', '),
  })

  return (
    <>
      <Cursor.Shapes.Square />
      <Cursor.Effects.Glow />
    </>
  )
}

function Title() {
  return (
    <h1 className="title" ref={useCursorStyleOnHover('Shape.Circle', 'Effect.Difference')}>
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
      of the mind's eye citizens of distant epochs Sea of Tranquility? Great turbulent clouds cosmic
      ocean cosmic ocean inconspicuous motes of rock and gas stirred by starlight invent the
      universe and billions upon billions upon billions upon billions upon billions upon billions
      upon billions.
    </p>
  )
}

const gallery = [Feather, DropOfWater, Fire]

function Photo(props: JSX.IntrinsicElements['img']) {
  return (
    <img
      {...props}
      alt="flower"
      width={200}
      height={350}
      ref={useCursorStyleOnHover(
        { transform: 'rotate(360deg)' },
        'Shape.Ring',
        'Effect.Zoom',
        'Effect.Grow',
      )}
    />
  )
}

function ChangeGlobalStyle() {
  const { color } = useGlobalStyle()

  return (
    <form>
      <input
        type="color"
        value={color}
        onChange={(e) => setGlobalStyle((prev) => ({ ...prev, color: e.target.value }))}
      />

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
