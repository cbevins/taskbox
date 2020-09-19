<script>
  export let hours
  function minutes(hours) { return 60 * hours }
</script>

<div class="control-wrapper">
  <div class="slider-row">
    <p class="time-title">Time</p>
  </div>
  <div class="slider-row">
    <div class="time-slider">
      <p class="time-label">Since</p>
      <p class="time-label">Ignitn</p>
      <p class="time-value">{hours.toFixed(2) + 'h'}</p>
      <div class="vertical-slider-wrapper">
        <input bind:value={hours} type="range" min="0.25" max="24" step="0.25">
      </div>
    </div>
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
  width: 46px;
  height: 220px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,255,0,0.48);
}
.time-label {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: center;
  color: green;
  margin: 0px;
}
.time-title {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: center;
  color: green;
  margin: 0px;
}
.time-value {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  text-align: center;
  color: green;
  margin: 0px;
}
.time-slider {
  font-family: "Lucida Sans", sans-serif;
  font-size: 12px;
  width: 40px;
  height: 220px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;
  float: left;
}
.vertical-slider-wrapper {
  display: inline-block;
  width: 20px;
  height: 150px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.48);
}
.vertical-slider-wrapper input {
  width: 150px;
  height: 20px;
  margin: 0;
  transform-origin: 75px 75px;
  transform: rotate(-90deg);
}
</style>
