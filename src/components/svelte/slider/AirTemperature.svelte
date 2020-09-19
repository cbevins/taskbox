<script>
  import VerticalSlider from '../pure/VerticalSlider.svelte'
  export let f
  export let decimals = 0
  function centigrade(f) { return (5 * (f-32) / 9) }
</script>

<div class="control-wrapper">
  <div class="slider-row">
    <p class="air-temp-title">Temp</p>
  </div>
  <div class="slider-row">
    <VerticalSlider label="Air" min="40" max="120" step="1"
      bind:value={f}
      line1={f.toFixed(decimals)+'F\u00B0'}
      line2={centigrade(f).toFixed(decimals) + 'C\u00B0'} />
  </div>
</div>

<style>
* {
  box-sizing: border-box;
}
.slider-row::after {
  content: "";
  clear: both;
  display: table;
}
.control-wrapper {
  width: 50px;
  height: 220px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
}
.air-temp-title {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: center;
  color: green;
  margin: 0px;
}
</style>
