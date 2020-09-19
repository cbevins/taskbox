<script>
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'
  export let _input
  export let _output
  let uom = $_input.uom
$: {
  uom = $_input.uom
}
  const Items = [
    {label: 'Fire Area', prop: 'fireArea', dec: 0},
    {label: 'Fire Perimeter', prop: 'firePerimeter', dec: 0},
    {label: 'Fire Heading from North', prop: 'fireHeadingFromNorth', dec: 0},
    {label: 'Heading Spread Rate', prop: 'headingSpreadRate', dec: 2},
    {label: 'Heading Spread Distance', prop: 'headingSpreadDistance', dec: 0},
    {label: 'Heading Flame Length', prop: 'headingFlameLength', dec: 2},
    {label: 'Heading Scorch Height', prop: 'headingScorchHeight', dec: 0},
    {label: 'Flanking Spread Rate', prop: 'flankingSpreadRate', dec: 2},
    {label: 'Flanking Spread Distance', prop: 'flankingSpreadDistance', dec: 0},
    {label: 'Flanking Flame Length', prop: 'flankingFlameLength', dec: 2},
    {label: 'Flanking Scorch Height', prop: 'flankingScorchHeight', dec: 0},
    {label: 'Backing Spread Rate', prop: 'backingSpreadRate', dec: 2},
    {label: 'Backing Spread Distance', prop: 'backingSpreadDistance', dec: 0},
    {label: 'Backing Flame Length', prop: 'backingFlameLength', dec: 2},
    {label: 'Backing Scorch Height', prop: 'backingScorchHeight', dec: 0},
  ]
</script>

<Table>
  {#each Items as item}
    <tr>
      <td>{item.label}</td>
      <td align='right'>{$_output[item.prop].v[uom].toFixed(item.dec)}</td>
      <td align='left'>{$_output[item.prop].u[uom]}</td>
    </tr>
  {/each}
</Table>
