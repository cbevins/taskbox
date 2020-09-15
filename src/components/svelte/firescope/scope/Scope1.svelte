<script>
// FireScope uses _input and _output props for its data
  export let width
  export let height
  export let _input
  // export let _output

  let aspect = $_input.slopeDirectionAspect
  let slope = $_input.slopeSteepnessRatio
  let upslope = (aspect >= 180) ? aspect-180 : aspect+180
  let radians
  let windFromNorth = $_input.windDirectionSourceFromNorth
  let windHeading = (windFromNorth >= 180) ? windFromNorth-180 : windFromNorth+180
  let windSpeed = $_input.windSpeedAtMidflame
  let wind = {visible: 'visible'}

  // viewport
  let vp = {x1: 0, y1: 0, w: 130, h: 130 }
  vp.xc = (vp.x1 + vp.w/2)
  vp.yc = (vp.y1 + vp.h/2)
  vp.x2 = vp.x1 + vp.w
  vp.y2 = vp.y1 + vp.h
  const vpCenter = `translate(${vp.xc}, ${vp.yc})`
  console.log(vp)

  // compass has radius 50 plus margins of 10 for letters
  let compass = {
    r: 50, // compass dial radius
    x: 60,  // compass center x
    y: 60,  // compass center y
    fw: 10, // compass font 'W' width
    major: 10, // major tic length
    minor: 5  // minor tic length
  }
  const center = `translate(${compass.x},${compass.y})`

  // Slope bubble center location
  let bubble = {x: 0, y: 0}

  function atX(deg, origin, offset, fw=10, fa=0) {
    return origin + offset * Math.sin(deg * Math.PI / 180) + fw * fa
  }
  function atY(deg, origin, offset, fw=10, fa=0) {
    return origin - offset * Math.cos(deg * Math.PI / 180) + fw * fa
  }

  function xText(origin, offset, radians, factor) {
    return origin + offset * Math.sin(radians)
      - factor * (1-((1 + Math.sin(radians))/2))
  }
  function yText(origin, offset, radians, factor) {
    return origin - offset * Math.cos(radians)
      + factor * (1-((1 + Math.cos(radians))/2))
  }

  const points = [
    {deg: 0, text: 'N', fx: -.4, fy: -0.1},
    {deg: 45, text: 'NE', fx: 0, fy: 0},
    {deg: 90, text: 'E', fx: 0.1, fy: 0.4},
    {deg: 135, text: 'SE', fx: 0, fy: 0.77},
    {deg: 180, text: 'S', fx: -.4, fy: 1},
    {deg: 225, text: 'SW', fx: -1.6, fy: 0.77},
    {deg: 270, text: 'W', fx: -1, fy: 0.4},
    {deg: 315, text: 'NW', fx: -1.6, fy: 0},
  ]
  points.forEach(p => {
    let rad = p.deg * Math.PI / 180
    p.x = atX(p.deg, compass.x, compass.r, compass.fw, p.fx)
    p.y = atY(p.deg, compass.y, compass.r, compass.fw, p.fy)
  })

  $: {
    slope = $_input.slopeSteepnessRatio
    aspect = $_input.slopeDirectionAspect
    upslope = (aspect >= 180) ? aspect-180 : aspect+180
    radians = upslope * Math.PI / 180

    bubble.x = atX(aspect, compass.x, compass.r)
    bubble.y = atY(aspect, compass.x, compass.r)
    bubble.xup = xText(compass.x, compass.r-7, radians, 4)
    bubble.yup = yText(compass.y, compass.r-7, radians, 4)
    bubble.visible = (slope < 0.01) ? 'hidden' : 'visible'

    windFromNorth = $_input.windDirectionSourceFromNorth
    windHeading = (windFromNorth >= 180) ? windFromNorth-180 : windFromNorth+180
    windSpeed = $_input.windSpeedAtMidflame
    radians = windHeading * Math.PI / 180
    wind.xup = xText(compass.x, compass.r-13, radians, 4)
    wind.yup = yText(compass.y, compass.r-13, radians, 4)
    wind.visible = (windSpeed < 0.1) ? 'hidden' : 'visible'
  }
</script>

<svg class="defs-only" xmlns="http://www.w3.org/2000/svg"
    width="0" height="0" style="display: block;">
  <defs>
    <symbol id="fireCompass" >
      <circle r={compass.r} class="compass-face"
        transform='translate({compass.x},{compass.y})'/>
      <!-- markers -->
      {#each points as p}
        <line	class='major-line' y1={compass.r-15} y2={compass.r}	transform='{center} rotate({p.deg})'/>
        <text class='major-text' x={p.x} y={p.y}>{p.text}</text>
        <line	class='minor-line' y1={compass.r-10} y2={compass.r}	transform='{center} rotate({p.deg+15})'/>
        <line	class='minor-line' y1={compass.r-10} y2={compass.r}	transform='{center} rotate({p.deg+30})'/>
      {/each}
    </symbol>

    <symbol id='crossHairs'>
      <line class='cross-hairs' x1={vp.x1} y1={vp.yc} x2={vp.x2} y2={vp.yc}/>
      <line class='cross-hairs' x1={vp.xc} y1={vp.y1} x2={vp.xc} y2={vp.y2}/>
      <text class='major-text' transform='{vpCenter} rotate({aspect}) translate(-5,5)'>
        W</text>
    </symbol>

    <symbol id='fireBox'>
      <line class='minor-line' x1={vp.x1} y1={vp.y1} x2={vp.x1} y2={vp.y2} />
      <text x="0" y="128"  class='info-text'>
        wind is {wind.visible}
        </text>
      <text x="0" y="120" class='info-text'>FireScope 1.0.0</text>
    </symbol>

    <radialGradient id="slopeBubbleGradient" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0" />
      <stop offset="100%" stop-color="black" stop-opacity=".5" />
    </radialGradient>

    <symbol id='slopeBubble'>
      <g transform='{center} rotate({aspect})'>
        <ellipse cx="0" cy="45" rx='5' ry='5'
          style="visibility:{bubble.visible};"
          fill="url(#slopeBubbleGradient)" />
        <line class='slope-pointer'	y1='48' y2='54'
          style="visibility:{bubble.visible};" />
      </g>
    </symbol>

    <symbol id='slopeBubbleText'>
      <text x={bubble.xup} y={bubble.yup} class='major-text'
        style="font: normal 4px sans-serif; visibility:{bubble.visible};">
        {slope.toFixed(0)}</text>
    </symbol>

    <linearGradient id="windGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(200,200,240);stop-opacity:1" />
      <stop offset="100%" style="stop-color:blue;stop-opacity:1" />
    </linearGradient>

    <symbol id='windNeedle'>
      <g transform='{center} rotate({windFromNorth})'>
        <polygon class='wind-needle'
          style="visibility:{wind.visible};"
          fill="url(#windGradient)"
          points="0,44 6,38, 4,38, 4,30, -4,30, -4,38, -6,38" />
          <!-- points="0,42 6,-42 0,-36 -6,-42" /> -->
      </g>
    </symbol>

    <symbol id='windNeedleText'>
      <text x={wind.xup} y={wind.yup} class='major-text'
        style="font: normal 4px sans-serif; visibility:{wind.visible};">
          {windSpeed.toFixed(0)}</text>
    </symbol>
  </defs>
</svg>

<div class="firescope-box">
  <svg viewBox="0, 0, 130, 130" width={width} height={height} >
    <use xlink:href="#fireCompass" transform='translate(5,5)'/>
    <use xlink:href="#slopeBubble" transform='translate(5,5)'/>
    <use xlink:href="#slopeBubbleText" transform='translate(5,5)'/>
    <use xlink:href="#windNeedle" transform='translate(5,5)'/>
    <use xlink:href="#windNeedleText" transform='translate(5,5)'/>
    <use xlink:href="#crossHairs" transform='translate(0,0)'/>
    <use xlink:href="#fireBox" transform='translate(0,0)'/>
  </svg>
</div>

<style>
  .firescope-box {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
  }
  .compass-face {
		stroke: #333;
    stroke-opacity: 50%;
		fill: white;
	}
	.cross-hairs {
		stroke: red;
		stroke-width: 0.25;
	}
  .info-text {
    font: normal 4px sans-serif;
  }
	.major-line {
		stroke: #111;
		stroke-width: 1;
	}
  .major-text {
    font: bold 10px sans-serif;
  }
	.minor-line {
		stroke: #999;
		stroke-width: 0.5;
	}
	.slope-pointer {
		stroke: #f00;
		stroke-width: 0.5;
	}
</style>
