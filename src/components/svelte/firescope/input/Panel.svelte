<script>
	import { fade, slide } from 'svelte/transition';
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'

  import InputPanel from '../sliders/InputPanel.svelte'
  import FirescopeReels from '../output/Reels.svelte'
  import FireScope from '../scope/Scope.svelte'
  import FireTable from '../tables/FireTable.svelte'

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
  <link rel="stylesheet" href="global.css">
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

  <InputPanel  _input={_input} _output={_output} />
</Container>

<style>
  .dummy-page {
    height: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
  }
</style>