<script>
	import { fade, slide } from 'svelte/transition';
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'

  import BehaviorSelector from './BehaviorSelector.svelte'
  import FirescopeAirTemperature from '../sliders/FirescopeAirTemperature.svelte'
  import FirescopeDeadFuelMoisture from '../sliders/FirescopeDeadFuelMoisture.svelte'
  import FirescopeElapsedTime from '../sliders/FirescopeElapsedTime.svelte'
  import FirescopeLiveFuelMoisture from '../sliders/FirescopeLiveFuelMoisture.svelte'
  import FirescopeSlopeAspect from '../sliders/FirescopeSlopeAspect.svelte'
  import FirescopeWindSpeedDirection from '../sliders/FirescopeWindSpeedDirection.svelte'
  import FirescopeReels from '../output/Reels.svelte'
  import FireScope from '../scope/Scope.svelte'
  import FireTable from '../tables/FireTable.svelte'
  import FuelSelector from './FuelSelector.svelte'
  import UnitsSelector from './UnitsSelector.svelte'

  export let _input
  export let _output
  let activePage = 'firescope'
  let showInputs = true
  let showReels = false
  function handleInputs() {showInputs = !showInputs}
  function handleReels() {showReels = !showReels}
  function showPage(e,p) {activePage=p}
</script>

<svelte:head>
  <link rel="stylesheet" href="bootstrap.min.css">
</svelte:head>

<Container>
  <Row>
    <Button outline color="primary" size='sm' class="mb-3"
      on:click={e => showPage(e,'firescope')}>
      FireScope
    </Button>
    <Button outline color="primary" size='sm' class="mb-3"
      on:click={e => showPage(e,'tables')}>
      Tables
    </Button>
    <Button outline color="primary" size='sm' class="mb-3"
        on:click={e => showPage(e,'graphs')}>
      Graphs
    </Button>
    <Button outline color="secondary" size='sm' class="mb-3"
        on:click={handleReels}>
      Toggle Reels
    </Button>
    <Button outline color="secondary" size='sm' class="mb-3"
        on:click={handleInputs}>
      Toggle Inputs
    </Button>
  </Row>
  <Row>
    <Col xs='12'>
      {#if activePage === 'firescope'}
        <FireScope width=300 height=300 _output={_output} _input={_input}/>
      {:else if activePage === 'graphs'}
        <p class='dummy-page' transition:fade>This will be the Graphs Page!</p>
      {:else if activePage === 'tables'}
        <FireTable _output={_output} _input={_input}/>
      {/if}
    </Col>
  </Row>
  <Row>
    <Col>
      {#if showReels}
      <div transition:fade>
        <FirescopeReels _output={_output} _input={_input} />
      </div>
      {/if}
    </Col>
  </Row>

  <Row>
{#if showInputs}
<table>
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
</table>
{/if}
</Row>
</Container>

<style>
  .dummy-page {
    height: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
  }
</style>