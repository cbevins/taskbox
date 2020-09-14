<script>
  import SlopeAspect from './SlopeAspect.svelte'
  import OutputBox from '../output/Box.svelte'
  export let _input
  export let _output
  export let withOutput=false
</script>

{#if withOutput}
  <div class="row" style="margin: 5px">
    <OutputBox title1='Spread' title2='Rate' units='ft/min'
      value={$_output.spreadRate.toFixed(2)} />
    <OutputBox title1='Fire' title2='Heading' units={'\u00B0 from No'}
      value={$_output.fireHeadingFromNorth.toFixed(0)} />
    <OutputBox title1='Fire' title2='Heading' units={'\u00B0 from Up'}
      value={$_output.fireHeadingFromUpslope.toFixed(0)} />
  </div>
{/if}

<div class='row'>
<SlopeAspect
  bind:percent={$_input.slopeSteepnessRatio}
  bind:aspect={$_input.slopeDirectionAspect} />
</div>

<style>
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>