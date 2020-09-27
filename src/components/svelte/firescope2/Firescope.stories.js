import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

// Get model store shared by this app's components
import { _input, _output } from './models/store.js'

import AirTemperature from './components/sliders/AirTemperature.svelte'
import DeadFuelMoisture from './components/sliders/DeadFuelMoisture.svelte'
import ElapsedTime from './components/sliders/ElapsedTime.svelte'
import Firescope from './components/Firescope.svelte'
import InputPanel from './components/InputPanel.svelte'
import LiveFuelMoisture from './components/sliders/LiveFuelMoisture.svelte'
import SlopeAspect from './components/sliders/SlopeAspect.svelte'
import WindSpeedDirection from './components/sliders/WindSpeedDirection.svelte'

export default {
  title: 'Firescope2/InputPanel',
  decorators: [withKnobs],
  Component: Firescope,
}

export const inputPanel = () => ({
  Component: InputPanel,
  props: {_input: _input, _output: _output}
})

export const sliderAirTemperature = () => ({
  Component: AirTemperature,
  props: {
    f: object('F', 77)
  }
})

export const sliderDeadFuelMoisture = () => ({
  Component: DeadFuelMoisture,
  props: {
    tl1h: object('tl1h', .05),
    tl10h: object('tl10h', .07),
    tl100h: object('tl100h', .09)
  }
})

export const sliderElapsedTime = () => ({
  Component: ElapsedTime,
  props: {
    f: object('minutes', 60)
  }
})

export const sliderLiveFuelMoisture = () => ({
  Component: LiveFuelMoisture,
  props: {
    herb: object('herb', .5),
    stem: object('stem', .5),
  }
})

export const sliderSlopeAspect = () => ({
  Component: SlopeAspect,
  props: {
    steepness: object('steepness', 1),
    aspect: object('aspect', 225),
  }
})

export const sliderWindSpeedDirection = () => ({
  Component: WindSpeedDirection,
  props: {
    speed: object('speed', 880),
    direction: object('direction', 270),
  }
})
