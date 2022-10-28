import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UseCursorOnHoverExamples } from './app'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UseCursorOnHoverExamples />
  </StrictMode>,
)
