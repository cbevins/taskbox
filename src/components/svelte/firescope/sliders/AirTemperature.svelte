<script>
  export let f
  function centigrade(f) { return (5 * (f-32) / 9) }
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="firescope-vslider-group-1">
  <p class="firescope-vslider-title">Temp</p>
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Air</p>
      <p class="firescope-vslider-value">{f.toFixed(0)+'\u00B0F'}</p>
      <p class="firescope-vslider-value">{centigrade(f).toFixed(0) + '\u00B0C'}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={f} type="range" min="20" max="120" step="1"/>
      </div>
    </div>
</div>
