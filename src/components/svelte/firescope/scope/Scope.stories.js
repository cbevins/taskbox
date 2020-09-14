import Bubble from './Bubble.svelte'
import FireScope from './Scope.svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

// Get model store shared by this app's components
import { _input, _output } from '../store.js'

export default {
  title: 'Svelte/Firescope/Scope',
  decorators: [withKnobs],
  Component: Bubble,
}

export const simpleBubble = () => ({
  Component: Bubble,
  props: {
    width: object('width', 100),
    height: object('height', 100),
    color: object('color', 'blue')
  }
})

export const fireScope = () => ({
  Component: FireScope,
  props: { _input: _input, _output: _output,
    width: object('width', 100),
    height: object('height', 100)
  }
})
