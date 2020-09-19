<script>
  import ElapsedTime from './ElapsedTime.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="row" style="margin: 5px">
    <OutputBox title1='Fire' title2='Area' units='ac'
      value={$_output.fireArea.v[$_input.uom].toFixed(2)} />
    <OutputBox title1='Fire' title2='Perim' units='ft'
      value={$_output.firePerimeter.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Fire' title2='Length' units='ft'
      value={$_output.fireLength.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Fire' title2='Width' units='ft'
      value={$_output.fireWidth.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Head' title2='Dist' units='ft'
      value={$_output.headingSpreadDistance.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Back' title2='Dist' units='ft'
      value={$_output.backingSpreadDistance.v[$_input.uom].toFixed(0)} />
    <OutputBox title1='Flank' title2='Dist' units='ft'
      value={$_output.flankingSpreadDistance.v[$_input.uom].toFixed(0)} />
</div>
{/if}

<div class="row">
  <ElapsedTime bind:hours={$_input.timeSinceIgnition} />
</div>
<style>
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>
