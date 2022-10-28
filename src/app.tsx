import { CSSProperties } from 'react'
import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import { CursorProvider, useCursorOnHover } from './lib'

const myCursorStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  border: '3px solid white',
  borderRadius: '50%',
  position: 'absolute',
  boxShadow: '2px -3px 41px -1px rgba(250,250,250,0.64)',
  transition: 'all .1s linear',
}

export function TitleHovered() {
  return (
    <h1
      className="title"
      ref={useCursorOnHover({
        transform: 'scale(1.4)',
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
    <CursorProvider initialStyle={myCursorStyle}>
      <div className="container">
        <img className="backgroundImage" src={DropOfWater} alt="drop-of-water" />
        <TitleHovered />
      </div>
    </CursorProvider>
  )
}
