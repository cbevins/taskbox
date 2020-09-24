<script>
  import { FireTableItems } from './FireTableItems.js'
  // FireScope uses _input and _output props for its data
  export let width
  export let height
  export let uom
  export let viewbox
  // export let _input
  export let _output
</script>

<svg viewBox={viewbox} width={width} height={height} >
  {#each FireTableItems as item, idx}
    <text x="0" y={6*(1+idx)} class='info-text'>
      {item.group}&nbsp;{item.label}</text>
    <text x="50" y={6*(1+idx)} class='value-text'>
      {$_output[item.prop].v[uom].toFixed(item.dec)}</text>
    <text x="65" y={6*(1+idx)} class='units-text'>
      {$_output[item.prop].u[uom]}
    </text>
  {/each}
</svg>

<style>
  .info-text {
    font: normal 4px sans-serif;
  }
  .units-text {
    font: normal italic 4px sans-serif;
    text-align: right;
  }
  .value-text {
    font: normal 4px sans-serif;
    text-align: right;
  }
</style>