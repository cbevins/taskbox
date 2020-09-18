import VerticalSlider from './VerticalSlider.svelte'
import AirTemperature from './AirTemperature.svelte'
import DeadFuelMoisture from './DeadFuelMoisture.svelte'
import ElaspedTime from './ElaspedTime.svelte'
import FirescopeAirTemperature from './FirescopeAirTemperature.svelte'
import FirescopeDeadFuelMoisture from './FirescopeDeadFuelMoisture.svelte'
import FirescopeElaspedTime from './FirescopeElaspedTime.svelte'
import FirescopeLiveFuelMoisture from './FirescopeLiveFuelMoisture.svelte'
import FirescopeSlopeAspect from './FirescopeSlopeAspect.svelte'
import FirescopeWindSpeedDirection from './FirescopeWindSpeedDirection.svelte'
import LiveFuelMoisture from './LiveFuelMoisture.svelte'
import SlopeAspect from './SlopeAspect.svelte'
import WindSpeedDirection from './WindSpeedDirection.svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'

// Get model store shared by this app's components
import { _input, _output } from '../store.js'

export default {
  title: 'Svelte/Firescope/Sliders/VerticalSlider',
  decorators: [withKnobs],
  Component: VerticalSlider,
}

export const pureVerticalSlider = () => ({
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

export const deadFuelMoisture = () => ({
  Component: DeadFuelMoisture,
  props: {
    tl1h: object('tl1h', 4),
    tl10h: object('tl10h', 8),
    tl100h: object('tl100h', 12),
  }
})

export const elaspedTime = () => ({
  Component: ElaspedTime,
  props: {
    hours: object('hours', 1),
  }
})

export const liveFuelMoisture = () => ({
  Component: LiveFuelMoisture,
  props: {
    herb: object('herb', 50),
    stem: object('stem', 150),
  }
})

export const slopeAspect = () => ({
  Component: SlopeAspect,
  props: {
    percent: object('percent', 45),
    aspect: object('aspect', 225),
  }
})

export const windSpeedDirection = () => ({
  Component: WindSpeedDirection,
  props: {
    speed: object('percent', 10),
    from: object('from', 270),
  }
})

export const firescopeAirTemperature = () => ({
  Component: FirescopeAirTemperature,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})

export const firescopeDeadFuelMoisture = () => ({
  Component: FirescopeDeadFuelMoisture,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})

export const firescopeElaspedTime = () => ({
  Component: FirescopeElaspedTime,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})

export const firescopeLiveFuelMoisture = () => ({
  Component: FirescopeLiveFuelMoisture,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})

export const firescopeSlopeAspect = () => ({
  Component: FirescopeSlopeAspect,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})

export const firescopeWindSpeedDirection = () => ({
  Component: FirescopeWindSpeedDirection,
  props: {_input: _input, _output: _output,
    withOutput: object('showOutput', true)
  }
})
