<script>
  import { thousands } from '../utils.js'
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
    <!-- {#if item.group !== prevGroup}
      <line class='sep-line' x1='0' y1={6*idx+6} x2='80' y2={6*idx+6} />
      {prevGroup = item.group}
    {/if} -->
    <text x="0" y={6*idx+6} class='info-text'>
      {item.group + ' ' +item.label}</text>
    <text x="50" y={6*idx+6} class='value-text'>
      {thousands($_output[item.prop].v[uom], item.dec)}</text>
    <text x="70" y={6*idx+6} class='units-text'>
      {$_output[item.prop].u[uom]}
    </text>
  {/each}
</svg>

<style>
  .info-text {
    font: normal 4px sans-serif;
  }
 	/* .sep-line {
		stroke: #111;
		stroke-width: 0.5;
	} */
  .units-text {
    font: normal italic 4px sans-serif;
    text-align: right;
  }
  .value-text {
    font: normal 4px sans-serif;
    text-align: right;
  }
</style>