<script>
  import { Button, Collapse, Container, Row, Col, Table } from 'sveltestrap'
  export let _input
  export let _output
  let uom = $_input.uom
</script>

<Table>
  <tr>
    <td>Heading Spread Rate</td>
    <td>{$_output.headingSpreadRate.v[uom].toFixed(2)}</td>
    <td>{$_output.headingSpreadRate.u[uom]}</td>
  </tr>
  <tr>
    <td>Heading Spread Distance</td>
    <td>{$_output.headingSpreadDistance.v[uom].toFixed(2)}</td>
    <td>{$_output.headingSpreadDistance.u[uom]}</td>
  </tr>
  <tr>
    <td>Heading Flame Length</td>
    <td>{$_output.headingFlameLength.v[uom].toFixed(2)}</td>
    <td>{$_output.headingFlameLength.u[uom]}</td>
  </tr>
  <tr>
    <td>Heading Scorch Height</td>
    <td>{$_output.headingScorchHeight.v[uom].toFixed(2)}</td>
    <td>{$_output.headingScorchHeight.u[uom]}</td>
  </tr>
</Table>
