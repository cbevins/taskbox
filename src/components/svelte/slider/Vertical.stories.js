import VerticalSlider from './Vertical.svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

export default {
  title: 'Svelte/Base/VerticalSlider',
  decorators: [withKnobs],
  Component: VerticalSlider,
}

const sliderData = {
  label: 'Label',
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  line1: 'Line1',
  line2: 'Line2',
}

export const demo = () => ({
  Component: VerticalSlider,
  props: {
    slider: object('slider', { ...sliderData }),
  },
})
