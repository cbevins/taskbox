<script>
  import OutputBox from './Box.svelte'
  export let _input
  export let _output
  let uom = $_input.uom
  $: {
    uom = $_input.uom
  }
</script>

<div class="slider-row">
  <OutputBox title1='Spread' title2='Rate'
    units={$_output.spreadRate.u[uom]}
    value={$_output.spreadRate.v[uom].toFixed(2)} />
  <OutputBox title1='Fire' title2='Heading'
    units='&#x00B0 from N';
    value={$_output.fireHeadingFromNorth.v[uom].toFixed(0)} />
  <OutputBox title1='Flame' title2='Length'
    units={$_output.scorchHeight.u[uom]}
    value={$_output.flameLength.v[uom].toFixed(2)} />
  <OutputBox title1='Scorch' title2='Height'
    units={$_output.scorchHeight.u[uom]}
    value={$_output.scorchHeight.v[uom].toFixed(2)} />
  <OutputBox title1='Fire' title2='Area'
    units={$_output.fireArea.u[$_input.uom]}
    value={$_output.fireArea.v[$_input.uom].toFixed(2)} />
  <OutputBox title1='Fire' title2='Perim'
    units={$_output.firePerimeter.u[$_input.uom]}
    value={$_output.firePerimeter.v[$_input.uom].toFixed(0)} />
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .slider-row::after {
    content: "";
    clear: both;
    display: table;
  }
</style>
