<script>
  import DeadFuelMoisture from './DeadFuelMoisture.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="row" style="margin: 5px">
    <OutputBox title1='Spread' title2='Rate' units='ft/min'
      value={$_output.spreadRate.toFixed(2)} />
  </div>
{/if}

<div class='row'>
<DeadFuelMoisture
  bind:tl1h={$_input.fuelMoistureDead1}
  bind:tl10h={$_input.fuelMoistureDead10}
  bind:tl100h={$_input.fuelMoistureDead100} />
</div>

<style>
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>