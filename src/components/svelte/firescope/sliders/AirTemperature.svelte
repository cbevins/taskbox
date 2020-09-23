<script>
  export let f
  function centigrade(f) { return (5 * (f-32) / 9) }
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>
<div class="vslider-group">
  <p class="firescope-vslider-title">Temp</p>
  <div>
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Air</p>
      <p class="firescope-vslider-value">{f.toFixed(0)+'F\u00B0'}</p>
      <p class="firescope-vslider-value">{centigrade(f).toFixed(0) + 'C\u00B0'}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={f} type="range" min="20" max="120" step="1"/>
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
