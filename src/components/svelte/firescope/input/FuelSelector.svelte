<script>
  export let _input
  let fuels = [
    { key: '1', text: '1: Short Grass'},
    { key: '10', text: '10: Timber litter & understory'},
    { key: 'gs4', text: 'GS4: High load, humid climate grass-shrub'},
    { key: 'sh1', text: 'SH1: Low load, dry climate shrub'},
    { key: 'sh2', text: 'SH2: Moderate load, dry climate shrub'},
  ]
</script>

<select bind:value={$_input.fuelModelCatalogKey}>
	{#each fuels as fuel}
		<option value={fuel.key}>
			{fuel.text}
		</option>
	{/each}
</select>
