<script>
  import AirTemperature from './AirTemperature.svelte'
  import DeadFuelMoisture from './DeadFuelMoisture.svelte'
  import ElapsedTime from './ElapsedTime.svelte'
  import LiveFuelMoisture from './LiveFuelMoisture.svelte'
  import SlopeAspect from './SlopeAspect.svelte'
  import WindSpeedDirection from './WindSpeedDirection.svelte'
  import BehaviorSelector from '../input/BehaviorSelector.svelte'
  import FuelSelector from '../input/FuelSelector.svelte'
  import UnitsSelector from '../input/UnitsSelector.svelte'

  // Get model store shared by this app's components
  import { _input, _output } from '../store.js'
</script>

<!-- Do NOT use Bootstrap Table -->
<table style='margin-bottom: 5px;'>
  <tr>
    <td colspan='3'><FuelSelector _output={_output} _input={_input}/></td>
    <td><UnitsSelector _input={_input} _output={_output} /></td>
    <td colspan='2'><BehaviorSelector _input={_input} _output={_output} /></td>
  </tr>
</table>
<table>
  <tr>
    <td><DeadFuelMoisture
      bind:tl1h={$_input.fuelMoistureDead1}
      bind:tl10h={$_input.fuelMoistureDead10}
      bind:tl100h={$_input.fuelMoistureDead100} />
    <td><LiveFuelMoisture
      bind:herb={$_input.fuelMoistureLiveHerb}
      bind:stem={$_input.fuelMoistureLiveStem} />
    </td>
    <td><SlopeAspect
      bind:percent={$_input.slopeSteepnessRatio}
      bind:aspect={$_input.slopeDirectionAspect} />
    <td><WindSpeedDirection
      bind:speed={$_input.windSpeedAtMidflame}
      bind:from={$_input.windDirectionSourceFromNorth} />
    <td><AirTemperature
      bind:f={$_input.airTemperature} /></td>
    <td><ElapsedTime
      bind:hours={$_input.timeSinceIgnition} />
  </tr>
</table>
