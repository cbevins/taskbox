<script>
	import { fade, slide } from 'svelte/transition';
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'

  import InputPanel from '../sliders/InputPanel.svelte'
  import FirescopeReels from '../output/Reels.svelte'
  import FireScope from '../scope/Scope.svelte'
  import FireTable from '../tables/FireTable.svelte'
  import Tab from '../tabs/Tab.svelte'
  import Tabs from '../tabs/Tabs.svelte'
  import TabList from '../tabs/TabList.svelte'
  import TabPanel from '../tabs/TabPanel.svelte'

  export let _input
  export let _output
  let showInputs = true
  let showReels = false
  function handleInputs() {showInputs = !showInputs}
  function handleReels() {showReels = !showReels}
</script>

<svelte:head>
  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<Container>
  <Row>
    <Tabs>
      <TabList>
        <Tab>Firescope</Tab>
        <Tab>Graphs</Tab>
        <Tab>Tables</Tab>
      </TabList>

      <TabPanel>
        <FireScope width=300 height=300 _output={_output} _input={_input}/>
      </TabPanel>

      <TabPanel>
        <p class='dummy-page' transition:fade>This will be the Graphs Page!</p>
      </TabPanel>

      <TabPanel>
        <FireTable _output={_output} _input={_input}/>
      </TabPanel>
    </Tabs>
  </Row>
  <Row>
    <Button outline color="secondary" size='sm' class="mb-3" on:click={handleReels}>
      Toggle Reels
    </Button>
    <Button outline color="secondary" size='sm' class="mb-3" on:click={handleInputs}>
      Toggle Inputs
    </Button>
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

  {#if showInputs}
    <div transition:fade>
      <InputPanel  _input={_input} _output={_output} />
    </div>
  {/if}
</Container>

<style>
  .dummy-page {
    height: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
  }
</style>