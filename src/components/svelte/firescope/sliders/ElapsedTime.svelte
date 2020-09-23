<script>
  export let hours
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>
<div class="vslider-group">
  <p class="firescope-vslider-title">Time</p>
  <div>
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Since</p>
      <p class="firescope-vslider-label">Ignited</p>
      <p class="firescope-vslider-value">{hours.toFixed(2) + 'h'}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={hours} type="range" min="0.25" max="24" step="0.25">
      </div>
    </div>
  </div>
</div>

<style>
.vslider-group {
  width: 45px;
  height: 220px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,255,0,0.48);
}
</style>
