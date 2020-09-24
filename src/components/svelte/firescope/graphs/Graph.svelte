<script>
  import { fade, slide } from 'svelte/transition'
  export let _input
  export let _output
  let uom = $_input.uom
  // The following is REQUIRED for units auto-updating
  $: {
    uom = $_input.uom
  }
</script>

<div transition:fade>
  <p>The graph has {$_output.range.x.values.b.length} values</p>
  <table>
    <tr><th>{$_output.range.x.key}</th><th>{$_output.range.y.key}</th></tr>
    {#each $_output.range.x.values.b as xv, idx}
      <tr>
        <td>{xv}</td>
        <td>{$_output.range.y.values[uom][idx].toFixed(2)}</td>
      </tr>
    {/each}
  </table>
</div>
