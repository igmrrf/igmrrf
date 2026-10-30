import { defineShikiSetup } from '@slidev/types'

// Content slides are white, but code stays dark: a dark block on a white slide
// keeps high contrast on a washed-out projector and reads as "terminal".
// Use the same dark theme for both colour schemas so code never flips light.
export default defineShikiSetup(() => ({
  themes: {
    dark: 'github-dark',
    light: 'github-dark',
  },
}))
