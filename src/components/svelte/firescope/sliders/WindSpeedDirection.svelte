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

<div class="firescope-vslider-group-2">
  <p class="firescope-vslider-title">Wind at</p>
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
