<script>
  export let tl1h
  export let tl10h
  export let tl100h
  let items = [
    {label: '1-h', value: tl1h},
    {label: '10-h', value: tl10h},
    {label: '100-h', value: tl100h},
  ]
  $: {
    tl1h = items[0].value
    tl10h = items[1].value
    tl100h = items[2].value
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="firescope-vslider-group-3">
  <p class="firescope-vslider-title">Dead Fuel Moisture</p>
  {#each items as item}
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">{item.label}</p>
      <p class="firescope-vslider-label">&nbsp;</p>
      <p class="firescope-vslider-value">{item.value + '%'}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={item.value} type="range" min="1" max="40" step="1">
      </div>
    </div>
  {/each}
</div>
