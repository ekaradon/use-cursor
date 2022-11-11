import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import { Cursor, useCursorStyleOnHover, useCursorStyle } from './lib'

function CustomCursor() {
  useCursorStyle({
    transition: 'transform 0.3s ease-in-out',
  })

  return (
    <>
      <Cursor.Shapes.Ring />
      <Cursor.Effects.Glow />
    </>
  )
}

function Title() {
  return (
    <h1 className="title" ref={useCursorStyleOnHover('Effect.Grow')}>
      Hover me!
    </h1>
  )
}

function Paragraph() {
  return (
    <p
      className="paragraph"
      ref={useCursorStyleOnHover('Effect.Difference', 'Shape.Circle', 'Effect.Zoom')}
    >
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

export function UseCursorOnHoverExamples() {
  return (
    <Cursor.Provider height="25px" width="25px">
      <CustomCursor />
      <div className="container" style={{ backgroundImage: `url(${DropOfWater})` }}>
        <Title />
        <Paragraph />
      </div>
    </Cursor.Provider>
  )
}
