<script>
  export let _input
  let uoms = [
    { u: 'e', text: 'English'},
    { u: 'm', text: 'Metric'},
    { u: 'f', text: 'US Forestry'},
    { u: 'b', text: 'Native Units'}
  ]
</script>

<select class='select-css'
    style='width:100px;'
    bind:value={$_input.uom}>
	{#each uoms as uom}
		<option value={uom.u}>
			{uom.text}
		</option>
	{/each}
</select>
