<script>
  export let _input
  let behaviors = [
    { v: 'spreadRate', text: 'Spread Rate'},
    { v: 'flameLength', text: 'Flame Length'},
    { v: 'scorchHeight', text: 'ScorchHeight'},
  ]
</script>

<select class='select-css' bind:value={$_input.behavior}>
	{#each behaviors as b}
		<option value={b.v}>
			{b.text}
		</option>
	{/each}
</select>
