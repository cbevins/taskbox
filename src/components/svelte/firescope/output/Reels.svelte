<script>
  import OutputBox from './Box.svelte'
  // export let _input
  export let _output
</script>

<div class="row">
  <OutputBox title1='Spread' title2='Rate' units='ft/min'
    value={$_output.spreadRate.toFixed(2)} />
  <OutputBox title1='Fire' title2='Heading' units='&#x00B0 from N';
    value={$_output.fireHeadingFromNorth.toFixed(0)} />
  <OutputBox title1='Flame' title2='Length' units='ft'
    value={$_output.flameLength.toFixed(2)} />
  <OutputBox title1='Scorch' title2='Height' units='ft'
    value={$_output.scorchHeight.toFixed(2)} />
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .row::after {
    content: "";
    clear: both;
    display: table;
  }
</style>
