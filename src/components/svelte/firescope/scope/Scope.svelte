<script>
// FireScope uses _input and _output props for its data
  export let width
  export let height
  export let _input
  export let _output

  function atX(origin, offset, deg) {
    return origin + offset * Math.sin(deg * Math.PI / 180)
  }
  function atY(origin, offset, deg) {
    return origin - offset * Math.cos(deg * Math.PI / 180)
  }
  function opposite(deg) { return deg >= 180 ? deg-180 : deg+180 }

  let aspect = $_input.slopeDirectionAspect
  let ellipseValue = $_input.behavior
  let fireHeadingFromNorth = $_output.fireHeadingFromNorth.v.b
  let fireBackingFromNorth = opposite(fireHeadingFromNorth)
  let slope = $_input.slopeSteepnessRatio
  let upslope = opposite(aspect)
  let windFromNorth = $_input.windDirectionSourceFromNorth
  let windHeading = opposite(windFromNorth)
  let windSpeed = $_input.windSpeedAtMidflame
  let wind = {visible: 'visible'}
  let uom = $_input.uom
  let headingValue, flankingValue, backingValue

  // viewport
  const viewbox = "0, 0, 130, 130"
  let vp = {x1: 0, y1: 0, w: 130, h: 130 }
  vp.xc = (vp.x1 + vp.w/2)
  vp.yc = (vp.y1 + vp.h/2)
  vp.x2 = vp.x1 + vp.w
  vp.y2 = vp.y1 + vp.h
  const vpCenter = `translate(${vp.xc}, ${vp.yc})`

  // compass has radius 50 plus margins of 10 for letters
  let compass = {
    r: 50, // compass dial radius
    x: 65,  // compass center x
    y: 65,  // compass center y
    fw: 10, // compass font 'W' width
    major: 10, // major tic length
    minor: 5  // minor tic length
  }
  const center = `translate(${compass.x},${compass.y})`
  const compassPos = `translate(5,5)`
  const points = [
    {deg: 0, text: 'N'},
    {deg: 45, text: 'NE'},
    {deg: 90, text: 'E'},
    {deg: 135, text: 'SE'},
    {deg: 180, text: 'S'},
    {deg: 225, text: 'SW'},
    {deg: 270, text: 'W'},
    {deg: 315, text: 'NW'}
  ]
  points.forEach(p => {
    p.x = atX(compass.x, compass.r+7, p.deg)
    p.y = atY(compass.y, compass.r+7, p.deg)
  })

  // Slope bubble center location
  let bubble = {x: 0, y: 0}
  let fire = {x: 0, r: 35}

  $: {
    uom = $_input.uom
    slope = $_input.slopeSteepnessRatio
    aspect = $_input.slopeDirectionAspect
    upslope = opposite(aspect)

    bubble.xup = atX(compass.x, compass.r-5, upslope)
    bubble.yup = atY(compass.y, compass.r-5, upslope)
    bubble.visible = (slope < 0.01) ? 'hidden' : 'visible'

    windFromNorth = $_input.windDirectionSourceFromNorth
    windHeading = opposite(windFromNorth)
    windSpeed = $_input.windSpeedAtMidflame
    wind.xup = atX(compass.x, compass.r-12, windHeading)
    wind.yup = atY(compass.y, compass.r-12, windHeading)
    wind.visible = (windSpeed < 0.1) ? 'hidden' : 'visible'

    fireHeadingFromNorth = $_output.fireHeadingFromNorth.v.b
    fireBackingFromNorth = opposite(fireHeadingFromNorth)
    fire.x = fire.r / $_output.lengthToWidthRatio.v.b
    fire.head = {
      x: atX(compass.x, compass.r-20, fireHeadingFromNorth),
      y: atY(compass.y, compass.r-20, fireHeadingFromNorth)
    }
    fire.back = {
      x: atX(compass.x, compass.r-20, fireBackingFromNorth),
      y: atY(compass.y, compass.r-20, fireBackingFromNorth)
    }
    fire.lwr = $_output.lengthToWidthRatio.v.b
    fire.width = -fire.r / fire.lwr
    fire.flank = {deg: (fireHeadingFromNorth+90)}
    fire.flank.x = atX(compass.x, fire.width, fire.flank.deg),
    fire.flank.y = atY(compass.y, fire.width, fire.flank.deg),
    fire.flank0 = {x: -fire.r, y: width}

    let ellipseValue = $_input.behavior
    if (ellipseValue === 'spreadRate') {
      headingValue = $_output.headingSpreadRate.v[uom].toFixed(0)
      backingValue = $_output.backingSpreadRate.v[uom].toFixed(0)
      flankingValue = $_output.flankingSpreadRate.v[uom].toFixed(0)
    } else if (ellipseValue === 'flameLength') {
      headingValue = $_output.headingFlameLength.v[uom].toFixed(0)
      backingValue = $_output.backingFlameLength.v[uom].toFixed(0)
      flankingValue = $_output.flankingFlameLength.v[uom].toFixed(0)
    } else if (ellipseValue === 'scorchHeight') {
      headingValue = $_output.headingScorchHeight.v[uom].toFixed(0)
      backingValue = $_output.backingScorchHeight.v[uom].toFixed(0)
      flankingValue = $_output.flankingScorchHeight.v[uom].toFixed(0)
    }
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
        <text class='major-text' dominant-baseline="middle" text-anchor="middle"
          x={p.x} y={p.y}>{p.text}</text>
        <line	class='minor-line' y1={compass.r-10} y2={compass.r}	transform='{center} rotate({p.deg+15})'/>
        <line	class='minor-line' y1={compass.r-10} y2={compass.r}	transform='{center} rotate({p.deg+30})'/>
      {/each}
    </symbol>

    <symbol id='fireBox'>
      <line class='minor-line' x1={vp.x1} y1={vp.y1} x2={vp.x1} y2={vp.y2} />
      <text x="0" y="128"  class='info-text'>
        Head Spread Rate {$_output.spreadRate.v[uom].toFixed(2)}
        {$_output.spreadRate.u[uom]}
      </text>
      <text x="0" y="120" class='info-text'>FireScope 1.0.0</text>
      <image x="0" y="0" href="images/SEMfavicon.png" height="12" width="12"/>
    </symbol>

    <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>

    <!-- fire ellipse -->
    <symbol id='fireEllipse'>
      <g transform='{center} rotate({fireHeadingFromNorth+180})'>
        <!-- fire ellipse -->
        <ellipse cx="0" cy="0" rx={fire.x} ry={fire.r} fill="url(#fireGradient)" />
        <!-- major axis -->
        <line class='minor-line' x1={-fire.r-2} y1="0" x2={fire.r+2} y2="0"
          transform='rotate(90)'/>
        <!-- minor axis -->
        <line class='minor-line' x1={-fire.width+2} y1="0" x2={fire.width-2} y2="0" />
      </g>
    </symbol>

    <symbol id='fireEllipseText'>
      <text x={fire.head.x} y={fire.head.y} class='compass-text'
          dominant-baseline="middle" text-anchor="middle">
        {headingValue}
      </text>
      <text x={fire.back.x} y={fire.back.y} class='compass-text'
          dominant-baseline="middle" text-anchor="middle">
        {backingValue}
      </text>
      <text x={fire.flank.x} y={fire.flank.y} class='compass-text'
          dominant-baseline="middle" text-anchor="middle">
        {flankingValue}
      </text>
    </symbol>

    <radialGradient id="slopeBubbleGradient"
        cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
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
      <text x={bubble.xup} y={bubble.yup} class='compass-text'
        dominant-baseline="middle" text-anchor="middle"
        style="visibility:{bubble.visible};">
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
      <text x={wind.xup} y={wind.yup} class='compass-text'
        dominant-baseline="middle" text-anchor="middle"
        style="visibility:{wind.visible};">
          {windSpeed.toFixed(0)}</text>
    </symbol>
  </defs>
</svg>

<div class="firescope-box">
  <svg viewBox={viewbox} width={width} height={height} >
    <use xlink:href="#fireCompass" transform={compassPos}/>
    <use xlink:href="#slopeBubble" transform={compassPos}/>
    <use xlink:href="#slopeBubbleText" transform={compassPos}/>
    <use xlink:href="#windNeedle" transform={compassPos}/>
    <use xlink:href="#windNeedleText" transform={compassPos}/>
    <use xlink:href="#fireEllipse" transform={compassPos}/>
    <use xlink:href="#fireEllipseText" transform={compassPos}/>
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
  .compass-text {
    font: normal 6px sans-serif;
  }
  .info-text {
    font: normal 4px sans-serif;
  }
	.major-line {
		stroke: #111;
		stroke-width: 1;
	}
  .major-text {
    font: bold 8px sans-serif;
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
