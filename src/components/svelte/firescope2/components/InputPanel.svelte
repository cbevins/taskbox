<script>
  import * as Variable from '../models/Variables.js'
  import AirTemperature from './sliders/AirTemperature.svelte'
  import DeadFuelMoisture from './sliders/DeadFuelMoisture.svelte'
  import ElapsedTime from './sliders/ElapsedTime.svelte'
  import LiveFuelMoisture from './sliders/LiveFuelMoisture.svelte'
  export let _input
  export let _output
  let f = 50
  let minutes = 60
  let uom = $_input.uom
  let scorch = Variable.displayString($_output.headingScorchHeight, $_input.uom)
  $: {
    uom = $_input.uom
    f = $_input.airTemperature.value.i
    minutes = $_input.timeSinceIgnition.value.i
    scorch = Variable.displayString($_output.headingScorchHeight, $_input.uom)
  }
</script>

<h1>Firescope</h1>
<table>
  <tr>
    <td><DeadFuelMoisture
      bind:tl1h={$_input.fuelMoistureDead1.value.i}
      bind:tl10h={$_input.fuelMoistureDead10.value.i}
      bind:tl100h={$_input.fuelMoistureDead100.value.i} /></td>
    <td><LiveFuelMoisture
      bind:herb={$_input.fuelMoistureLiveHerb.value.i}
      bind:stem={$_input.fuelMoistureLiveStem.value.i} /></td>
    <td><AirTemperature
      bind:f={$_input.airTemperature.value.i} /></td>
    <td><ElapsedTime
      bind:minutes={$_input.timeSinceIgnition.value.i} /></td>
  </tr>
</table>
<p>Scorch Height is {scorch}</p>