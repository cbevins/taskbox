<script>
  import * as Compass from './compass.js'
  export let aspect
  export let percent

  export let degrees = Compass.slopeDegrees(0.01 * percent)
  let direction = Compass.point(aspect)
  function handleCompass() {direction = Compass.point(aspect)}
  function handleSteepness() {percent = 100 * Compass.slopeRatio(degrees)}
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="vslider-group">
  <p class="firescope-vslider-title">Slope</p>
  <div>
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Steep</p>
      <p class="firescope-vslider-value">{degrees.toFixed(0)}&#x00B0;</p>
      <p class="firescope-vslider-value">{percent.toFixed(0)}%</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={degrees} type="range" min="0" max="80" step="1"
        on:input={handleSteepness}>
      </div>
    </div>

    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Asp</p>
      <p class="firescope-vslider-value">{aspect}&#x00B0;</p>
      <p class="firescope-vslider-value">{direction}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={aspect} type="range" min="0" max="359" step="1"
        on:input={handleCompass}>
      </div>
    </div>
  </div>
</div>

<style>
.vslider-group {
  width: 90px;
  height: 220px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,255,0,0.48);
}
</style>
