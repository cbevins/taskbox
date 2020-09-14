import VerticalSlider from './VerticalSlider.svelte'
import AirTemperature from '../slider/AirTemperature.svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

export default {
  title: 'Svelte/Pure/VerticalSlider',
  decorators: [withKnobs],
  Component: VerticalSlider,
}

export const simple = () => ({
  Component: VerticalSlider,
  props: {
    label: object('label', 'label'),
    value: object('value', 50),
    min: object('min', 0),
    max: object('max', 100),
    step: object('step', 1),
    line1: object('line1', 'line 1'),
    line2: object('line2', 'line 2'),
  }
})

export const airTemperature = () => ({
  Component: AirTemperature,
  props: {
    f: object('F', 77)
  }
})
