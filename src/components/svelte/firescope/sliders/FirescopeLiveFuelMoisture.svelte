<script>
  import LiveFuelMoisture from './LiveFuelMoisture.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="row" style="margin: 5px">
    <OutputBox title1='Spread' title2='Rate' units='ft/min'
      value={$_output.spreadRate.toFixed(2)} />
    <OutputBox title1='Cured' title2='Herb' units='%'
      value={(100*$_output.curedHerbFraction).toFixed(0)} />
  </div>
{/if}

<div class='row'>
<LiveFuelMoisture
  bind:herb={$_input.fuelMoistureLiveHerb}
  bind:stem={$_input.fuelMoistureLiveStem} />
</div>

<style>
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>