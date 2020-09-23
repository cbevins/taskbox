<script>
  export let hours
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="firescope-vslider-group-1">
  <p class="firescope-vslider-title">Time</p>
  <div class="firescope-vslider">
    <p class="firescope-vslider-label">Since</p>
    <p class="firescope-vslider-label">Ignited</p>
    <p class="firescope-vslider-value">{hours.toFixed(2) + 'h'}</p>
    <div class="firescope-vslider-wrapper">
      <input bind:value={hours} type="range" min="0.25" max="24" step="0.25">
    </div>
  </div>
</div>
