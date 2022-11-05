# use-cursor-on-hover

- [Introduction](#introduction)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Node/npm](#nodenpm)
  - [Deno](#deno)
- [Basic usage](#basic-usage)
- [API](#api)
  - [CursorProvider](#cursorprovider)
    - [Usage](#usage)
    - [Returns](#returns)
    - [Props](#props)
  - [useCursorOnHover](#usecursoronhover)
    - [Usage](#usage-1)
    - [Returns](#returns-1)
    - [Parameters](#parameters)
  - [useHideSystemCursor](#usehidesystemcursor)
    - [Usage](#usage-2)
    - [Returns](#returns-2)
    - [Parameters](#parameters-1)

## Introduction

This is still a really early concept in alpha. Nothing is yet definitive and you should NOT use this in production for now.
This library has no other dependencies than react itself, it's designed to do only one thing but to be straightforward and good at it.

## Installation

### Requirements

- React 18^

This library is written with Typescript in mind, but you can use it with Javascript.

### Node/npm

To install `use-cursor-on-hover`:

```sh
npm install use-cursor-on-hover@alpha   # npm
yarn add use-cursor-on-hover@alpha      # yarn
pnpm add use-cursor-on-hover@alpha      # pnpm
```

### Deno

Not yet supported.

## Basic usage

Overriding the default cursor by a new one:

```tsx
import { CursorProvider, useCursorOnHover } from 'use-cursor-on-hover'

const myCursorStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  border: '3px solid white',
  borderRadius: '50%',
  position: 'absolute',
  boxShadow: '2px -3px 41px -1px rgba(250,250,250,0.64)',
  transition: 'all .1s linear',
}

function TitleHovered() {
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

function App() {
  return (
    <CursorProvider initialStyle={myCursorStyle}>
      <TitleHovered />
    </CursorProvider>
  )
}
```

## API

### CursorProvider

#### Usage

Should be called at the root level of your application.

#### Returns

`ReactNode` containing every component that should rely on a custom cursor.

#### Props

| Options             | Type          | Description                                                             |
| ------------------- | ------------- | ----------------------------------------------------------------------- |
| children            | ReactNode     | Everything that would benefit from the custom cursor should be there id |
| initialStyle        | CSSProperties | An object defining the initial style of the cursor                      |
| hideDefaultCursor   | boolean       | Define whether or not the default cursor should be hidden               |

### useCursorOnHover

#### Usage

Should be called for every component where you want to define a custom style on the cursor.

```tsx
useCursorOnHover({ color: 'red' }, [...CSSProperties])
```
When two arguments override the same property, the latter takes precedence.

#### Returns

`RefObject<T>` of the component on which you want to trigger the custom style of the cursor.

#### Parameters

| Options    | Type          | Description                                                            |
| ---------- | ------------- | ---------------------------------------------------------------------- |
| ...style   | CSSProperties | The override of the cursor style when hovering this specific component |


### useHideSystemCursor

#### Usage

When you don't want to hide the default cursor on your whole app, you can specify `hideDefaultCursor` as `false` in the Provider and then use this hook for the specific components you want to have the default cursor hidden.

```tsx
useHideSystemCursor(targetRef)
```

#### Returns

`void`, this hook returns nothing.

#### Parameters

| Options   | Type                   | Description                                                            |
| --------- | ---------------------- | ---------------------------------------------------------------------- |
| targetRef | RefObject<HTMLElement> | The override of the cursor style when hovering this specific component |
