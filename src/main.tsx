import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UseCursorOnHoverExamples } from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UseCursorOnHoverExamples />
  </StrictMode>,
)
