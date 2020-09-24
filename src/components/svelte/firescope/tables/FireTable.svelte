<script>
  import { FireTableItems } from '../scope/FireTableItems.js'
  import { thousands } from '../utils.js'
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'
  export let _input
  export let _output
  let uom = $_input.uom
  // The following is REQUIRED for units auto-updating
  $: {
    uom = $_input.uom
  }
</script>

<div style="overflow-x:auto;">
  <table>
    {#each FireTableItems as item}
      <tr>
        <td class='text-label'>{item.group}&nbsp;{item.label}</td>
        <td class='text-value'>{thousands($_output[item.prop].v[uom], item.dec)}</td>
        <td class='text-units'>{$_output[item.prop].u[uom]}</td>
      </tr>
    {/each}
  </table>
</div>

<style>
table {
  width: 100%;
  border: 1px solid green;
  border-collapse: collapse;
  padding: 0;
}
/* caption {
  caption-side: bottom;
  text-align: center;
} */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f5f5f5;
}
/* th {
  background-color: #4CAF50;
  color: white;
  padding: 5px;
  border-bottom: 1px solid #ddd;
} */
td {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}
.text-label {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: left;
}
.text-units {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  font-style: italic;
  font-weight: normal;
  text-align: left;
}
.text-value {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: right;
}
</style>