<script>
  import * as Compass from './compass.js'
  export let from
  export let speed
  let direction = Compass.point(from)
  function handleCompass() {direction = Compass.point(from)}
</script>

<svelte:head>
  <link rel="stylesheet" href="firescope.css">
</svelte:head>

<div class="vslider-group">
  <p class="firescope-vslider-title">Wind at</p>
  <div>
    <div class="firescope-vslider">
      <p class="firescope-vslider-label">Midflm</p>
      <p class="firescope-vslider-value">{speed.toFixed(0)}
        <span class='firescope-vslider-units'>mph</span>
      </p>
      <p class="firescope-vslider-value">{(1.60934*speed).toFixed(0)}
        <span class='firescope-vslider-units'>kph</span>
      </p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={speed} type="range" min="0" max="40" step="1" />
      </div>
    </div>

    <div class="firescope-vslider">
      <p class="firescope-vslider-label">From</p>
      <p class="firescope-vslider-value">{from}&#x00B0;</p>
      <p class="firescope-vslider-value">{direction}</p>
      <div class="firescope-vslider-wrapper">
        <input bind:value={from} type="range" min="0" max="359" step="1"
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
