import FirescopePanel from './Panel.svelte'
import FirescopeReels from '../output/Reels.svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

// Get model store shared by this app's components
import { _input, _output } from '../store.js'

export default {
  title: 'Svelte/Firescope/Input/Panel',
  decorators: [withKnobs],
  Component: FirescopePanel,
}

export const inputPanel = () => ({
  Component: FirescopePanel,
  props: {_input: _input, _output: _output}
})

export const reelsPanel = () => ({
  Component: FirescopeReels,
  props: {_input: _input, _output: _output}
})
