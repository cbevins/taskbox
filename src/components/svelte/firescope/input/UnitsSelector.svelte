<script>
  export let _input
  let uoms = [
    { u: 'e', text: 'English'},
    { u: 'm', text: 'Metric'},
    { u: 'f', text: 'US Forestry'},
    { u: 'b', text: 'Model base units'}
  ]
</script>

<select bind:value={$_input.uom}>
	{#each uoms as uom}
		<option value={uom.u}>
			{uom.text}
		</option>
	{/each}
</select>
