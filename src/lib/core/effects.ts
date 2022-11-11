import { rgba } from 'polished'
import { Style } from './style'

const EffectList = ['Difference', 'Glow', 'Grow'] as const

export type Effect = typeof EffectList[number]

export const Effects: Record<Effect, Style> = {
  Difference: {
    mixBlendMode: 'difference',
  },
  Glow: ({ color }) => ({
    boxShadow: `2px -3px 41px -1px ${rgba(color, 0.64)}`,
  }),
  Grow: {
    transform: 'scale(1.4)',
  },
} as const
