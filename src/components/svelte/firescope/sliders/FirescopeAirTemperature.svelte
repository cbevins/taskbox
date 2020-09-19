<script>
  import AirTemperature from './AirTemperature.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="slider-row" style="margin: 5px">
    <OutputBox title1='Scorch' title2='Height' units='ft'
      value={$_output.scorchHeight.v[$_input.uom].toFixed(2)} />
  </div>
{/if}

<div class="slider-row">
  <AirTemperature bind:f={$_input.airTemperature} />
</div>

<style>
.slider-row::after {
  content: "";
  clear: both;
  display: table;
}
</style>
