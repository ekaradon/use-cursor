import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import { Cursor, useCursorOnHover } from './lib'

export function TitleHovered() {
  return (
    <h1
      className="title"
      ref={useCursorOnHover({
        // transform: 'scale(1.4)',
        mixBlendMode: 'difference',
        background: 'white',
      })}
    >
      Hover me!
    </h1>
  )
}

export function UseCursorOnHoverExamples() {
  return (
    <Cursor.Provider initialStyle={Cursor.Shapes.Diamond} hideDefaultCursor={false}>
      <div className="container">
        <img className="backgroundImage" src={DropOfWater} alt="drop-of-water" />
        <TitleHovered />
      </div>
    </Cursor.Provider>
  )
}
