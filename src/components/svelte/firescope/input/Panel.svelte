<script>
  import { Container, Row, Col, Table } from 'sveltestrap'

  import BehaviorSelector from './BehaviorSelector.svelte'
  import FirescopeAirTemperature from '../sliders/FirescopeAirTemperature.svelte'
  import FirescopeDeadFuelMoisture from '../sliders/FirescopeDeadFuelMoisture.svelte'
  import FirescopeElapsedTime from '../sliders/FirescopeElapsedTime.svelte'
  import FirescopeLiveFuelMoisture from '../sliders/FirescopeLiveFuelMoisture.svelte'
  import FirescopeSlopeAspect from '../sliders/FirescopeSlopeAspect.svelte'
  import FirescopeWindSpeedDirection from '../sliders/FirescopeWindSpeedDirection.svelte'
  import FirescopeReels from '../output/Reels.svelte'
  import FireScope from '../scope/Scope.svelte'
  import FuelSelector from './FuelSelector.svelte'
  import UnitsSelector from './UnitsSelector.svelte'

  export let _input
  export let _output
</script>


<Container>
  <Row>
    <Col xs='12'>
      <FireScope width=300 height=300 _output={_output} _input={_input}/>
    </Col>
  </Row>
  <Row>
    <Col>
      <FirescopeReels _output={_output} _input={_input}/>
    </Col>
  </Row>
  <Row>
<Table>
  <tr>
    <td colspan='3'><FuelSelector _output={_output} _input={_input}/></td>
    <td><UnitsSelector _input={_input} _output={_output} /></td>
    <td colspan='2'><BehaviorSelector _input={_input} _output={_output} /></td>
  </tr>
  <tr>
    <td><FirescopeDeadFuelMoisture _input={_input} _output={_output} /></td>
    <td><FirescopeLiveFuelMoisture _input={_input} _output={_output} /></td>
    <td><FirescopeSlopeAspect _input={_input} _output={_output} /></td>
    <td><FirescopeWindSpeedDirection _input={_input} _output={_output} /></td>
    <td><FirescopeAirTemperature _input={_input} _output={_output} /></td>
    <td><FirescopeElapsedTime _input={_input} _output={_output} /></td>
  </tr>
</Table>
</Row>
</Container>
