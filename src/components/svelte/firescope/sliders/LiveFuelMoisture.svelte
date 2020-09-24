<script>
  export let herb
  export let stem
  let items = [
    {label: 'Herb', value: herb},
    {label: 'Stem', value: stem},
  ]
  $: {
    herb = items[0].value
    stem = items[1].value
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="firescope-vslider-group-2">
  <p class="firescope-vslider-title">Live Fuel Moist</p>
  {#each items as item}
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">{item.label}</p>
      <p class="firescope-vslider-label">&nbsp;</p>
      <p class="firescope-vslider-value">{item.value + '%'}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={item.value} type="range" min="30" max="400" step="5">
      </div>
    </div>
  {/each}
</div>
