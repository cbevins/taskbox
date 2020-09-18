<script>
  import WindSpeedDirection from './WindSpeedDirection.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="row" style="margin: 5px">
    <OutputBox title1='Spread' title2='Rate' units='ft/min'
      value={$_output.spreadRate.v[$_input.uom].toFixed(2)} />
    <OutputBox title1='Fire' title2='Heading' units={'\u00B0 from No'}
      value={$_output.fireHeadingFromNorth.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Fire' title2='Heading' units={'\u00B0 from Up'}
      value={$_output.fireHeadingFromUpslope.v[$_input.uom].toFixed(0)} />
  </div>
{/if}

<div class='row'>
<WindSpeedDirection
  bind:speed={$_input.windSpeedAtMidflame}
  bind:from={$_input.windDirectionSourceFromNorth} />
</div>

<style>
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>