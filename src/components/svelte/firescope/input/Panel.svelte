<script>
  import FirescopeAirTemperature from '../sliders/FirescopeAirTemperature.svelte'
  import FirescopeDeadFuelMoisture from '../sliders/FirescopeDeadFuelMoisture.svelte'
  import FirescopeLiveFuelMoisture from '../sliders/FirescopeLiveFuelMoisture.svelte'
  import FirescopeSlopeAspect from '../sliders/FirescopeSlopeAspect.svelte'
  import FirescopeWindSpeedDirection from '../sliders/FirescopeWindSpeedDirection.svelte'
  import FirescopeReels from '../output/Reels.svelte'
  import FireScope from '../scope/Scope.svelte'
  import FireScope1 from '../scope/Scope1.svelte'
  import UnitsSelector from './UnitsSelector.svelte'

  export let _input
  export let _output
</script>

<!-- <FirescopeReels _output={_output} /> -->
<FireScope1 width=300 height=300 _output={_output} _input={_input} />
<table>
  <tr>
    <td><FirescopeDeadFuelMoisture _input={_input} _output={_output} /></td>
    <td><FirescopeLiveFuelMoisture _input={_input} _output={_output} /></td>
    <td><FirescopeSlopeAspect _input={_input} _output={_output} /></td>
    <td><FirescopeWindSpeedDirection _input={_input} _output={_output} /></td>
    <td><FirescopeAirTemperature _input={_input} _output={_output} /></td>
    <td valign='top'><UnitsSelector _input={_input} _output={_output} /></td>
  </tr>
</table>
